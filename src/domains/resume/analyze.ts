// Pure, deterministic resume analysis. Three lenses + final average.
// Never invents facts: every finding points to something present or absent in the text.

export type LensId = "ats" | "recruiter" | "strategy";

export type Finding = { ok: boolean; text: string };

export type Lens = {
  id: LensId;
  name: string;
  focus: string;
  score: number;
  findings: Finding[];
};

export type Analysis = {
  score: number;
  lenses: Lens[];
  matchedTerms: string[];
  missingTerms: string[];
  wordCount: number;
};

const STOPWORDS = new Set(
  (
    "a o e é de da do das dos em no na nos nas um uma uns umas para por com sem sobre entre como que se ao aos à às ou mais menos muito sua seu suas seus nosso nossa nossos nossas você vocês ser estar ter será sera são sao foi isso esta este essa esse até ate também tambem já ja não nao sim pelo pela pelos pelas onde quando qual quais cada todo toda todos todas outros outras the and of to in for with on at by an be is are as or from your our you we will this that have has experiência experiencia vaga vagas empresa empresas trabalho time equipe área area anos ano conhecimento conhecimentos desejável desejavel diferencial requisitos requisito obrigatório obrigatorio buscamos procuramos atuar atuação atuacao responsabilidades atividades oportunidade candidato candidata profissional pessoa pessoas forte boa bom capacidade nível nivel"
  ).split(/\s+/),
);

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokens(s: string): string[] {
  return normalize(s)
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length >= 2);
}

const STOP_NORM = new Set([...STOPWORDS].map(normalize));

/** Most relevant terms of a job posting (max 15), ordered by frequency then first appearance. */
export function extractJobTerms(job: string, max = 15): string[] {
  const counts = new Map<string, number>();
  for (const t of tokens(job)) {
    if (STOP_NORM.has(t)) continue;
    if (/^\d+$/.test(t)) continue;
    if (t.length < 3 && !/[+#]/.test(t) && !/^[a-z]{2}$/.test(t)) continue;
    if (t.length < 3 && !["bi", "ui", "ux", "qa", "c#", "go", "r"].includes(t)) continue;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([t]) => t);
}

function hasTerm(resumeNorm: string, term: string): boolean {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${esc}([^a-z0-9]|$)`).test(resumeNorm);
}

const SECTIONS: { label: string; re: RegExp }[] = [
  { label: "Experiência", re: /experiencia|experience|historico profissional/ },
  { label: "Formação", re: /formacao|educacao|education|graduacao/ },
  { label: "Habilidades", re: /habilidades|competencias|skills|tecnologias/ },
];

const ACTION_VERBS =
  /\b(liderei|criei|desenvolvi|implementei|reduzi|aumentei|automatizei|entreguei|lancei|gerenciei|coordenei|melhorei|otimizei|construi|conduzi|negociei|led|built|created|reduced|increased|launched|managed|improved)\b/g;

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function analyzeResume(resume: string, job: string): Analysis {
  const r = normalize(resume);
  const words = resume.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const terms = extractJobTerms(job);
  const matchedTerms = terms.filter((t) => hasTerm(r, t));
  const missingTerms = terms.filter((t) => !hasTerm(r, t));
  const termRatio = terms.length ? matchedTerms.length / terms.length : 0;

  // ATS: 70% job terms, 30% standard sections
  const sectionsFound = SECTIONS.filter((s) => s.re.test(r));
  const atsScore = clamp(termRatio * 70 + (sectionsFound.length / SECTIONS.length) * 30);
  const ats: Lens = {
    id: "ats",
    name: "Filtro ATS",
    focus: "O sistema que lê antes de qualquer pessoa.",
    score: atsScore,
    findings: [
      {
        ok: termRatio >= 0.6,
        text: `${matchedTerms.length} de ${terms.length} termos da vaga aparecem no currículo.`,
      },
      ...SECTIONS.map((s) => ({
        ok: s.re.test(r),
        text: s.re.test(r)
          ? `Seção "${s.label}" encontrada.`
          : `Não encontrei uma seção "${s.label}" com título reconhecível.`,
      })),
    ],
  };

  // Recruiter: metrics, action verbs, length
  const metrics = (resume.match(/\d+([.,]\d+)?\s?(%|k|mil|x|R\$)|R\$\s?\d+/gi) ?? []).length;
  const verbs = (r.match(ACTION_VERBS) ?? []).length;
  const lengthOk = wordCount >= 250 && wordCount <= 900;
  const recScore = clamp(Math.min(metrics, 4) * 10 + Math.min(verbs, 6) * 5 + (lengthOk ? 30 : 10));
  const recruiter: Lens = {
    id: "recruiter",
    name: "Recrutador",
    focus: "A primeira leitura, de poucos segundos.",
    score: recScore,
    findings: [
      {
        ok: metrics >= 2,
        text:
          metrics >= 2
            ? `${metrics} resultados com números (%, R$, volumes).`
            : "Quase nenhum resultado com número. Mostre o que mudou por causa do seu trabalho.",
      },
      {
        ok: verbs >= 3,
        text:
          verbs >= 3
            ? `${verbs} frases começam com verbos de ação.`
            : "Poucas frases com verbos de ação (liderei, reduzi, criei).",
      },
      {
        ok: lengthOk,
        text: lengthOk
          ? `${wordCount} palavras: tamanho confortável para uma leitura rápida.`
          : wordCount < 250
            ? `${wordCount} palavras: curto demais para mostrar suas entregas.`
            : `${wordCount} palavras: longo demais para uma leitura rápida.`,
      },
    ],
  };

  // Strategy: top-5 job terms, contact info, seniority alignment
  const top = terms.slice(0, 5);
  const topHit = top.filter((t) => hasTerm(r, t)).length;
  const hasEmail = /[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(resume);
  const hasLinkedin = /linkedin\.com|github\.com/.test(r);
  const seniority = ["junior", "pleno", "senior", "estagio", "lead", "gerente", "coordenador"];
  const jobLevel = seniority.find((s) => hasTerm(normalize(job), s));
  const levelOk = !jobLevel || hasTerm(r, jobLevel);
  const stratScore = clamp(
    (top.length ? (topHit / top.length) * 60 : 0) + (hasEmail ? 15 : 0) + (hasLinkedin ? 10 : 0) + (levelOk ? 15 : 0),
  );
  const strategy: Lens = {
    id: "strategy",
    name: "Estratégia",
    focus: "Se o currículo conta a história que a vaga pede.",
    score: stratScore,
    findings: [
      {
        ok: topHit >= 4,
        text: `${topHit} dos ${top.length} termos mais repetidos da vaga estão no currículo.`,
      },
      { ok: hasEmail, text: hasEmail ? "E-mail de contato presente." : "Não encontrei um e-mail de contato." },
      {
        ok: hasLinkedin,
        text: hasLinkedin ? "Link de LinkedIn ou GitHub presente." : "Sem link de LinkedIn ou GitHub.",
      },
      ...(jobLevel
        ? [
            {
              ok: levelOk,
              text: levelOk
                ? `O nível pedido ("${jobLevel}") aparece no currículo.`
                : `A vaga pede "${jobLevel}", mas o currículo não deixa esse nível claro.`,
            },
          ]
        : []),
    ],
  };

  const lenses = [ats, recruiter, strategy];
  const score = clamp(lenses.reduce((s, l) => s + l.score, 0) / lenses.length);
  return { score, lenses, matchedTerms, missingTerms, wordCount };
}
