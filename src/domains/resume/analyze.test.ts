import { describe, expect, it } from "vitest";
import { analyzeResume, extractJobTerms } from "./analyze";

const job = `Analista de Dados Pleno
Buscamos analista com SQL, Python, Power BI e ETL. SQL avançado. Python para automação. Inglês intermediário.`;

describe("analyzeResume", () => {
  it("returns three lenses and the final score is their average", () => {
    const a = analyzeResume("Experiência\nSQL e Python. Formação. Habilidades: ETL", job);
    expect(a.lenses.map((l) => l.id)).toEqual(["ats", "recruiter", "strategy"]);
    const avg = Math.round(a.lenses.reduce((s, l) => s + l.score, 0) / 3);
    expect(a.score).toBe(avg);
  });

  it("lists job terms missing from the resume", () => {
    const a = analyzeResume("Experiência com SQL e Python.", job);
    expect(a.matchedTerms).toContain("sql");
    expect(a.missingTerms).toContain("etl");
  });

  it("ranks the most repeated job terms first", () => {
    expect(extractJobTerms(job).slice(0, 2)).toEqual(["sql", "python"]);
  });
});
