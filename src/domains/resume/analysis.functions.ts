import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { analyzeResume } from "./analyze";
import { getAnalysisById, saveAnalysis } from "./store";

const input = z.object({
  resumeText: z.string().trim().min(80, "O currículo parece vazio.").max(40000),
  jobText: z.string().trim().min(80, "Cole a descrição completa da vaga.").max(20000),
});

export const createAnalysis = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const result = analyzeResume(data.resumeText, data.jobText);
    const jobTitle = data.jobText.split("\n").map((l) => l.trim()).find(Boolean)?.slice(0, 80) ?? "Vaga";
    return saveAnalysis({ ...result, jobTitle });
  });

export const fetchAnalysis = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ id: z.string().min(1).max(20) }).parse(d))
  .handler(async ({ data }) => getAnalysisById(data.id));
