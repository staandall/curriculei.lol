// In-memory store (MVP). Data lives only while the server instance is alive.
import type { Analysis } from "./analyze";

export type StoredAnalysis = Analysis & {
  id: string;
  createdAt: string;
  jobTitle: string;
};

const analyses = new Map<string, StoredAnalysis>();
const MAX = 500;

export function saveAnalysis(a: Omit<StoredAnalysis, "id" | "createdAt">): StoredAnalysis {
  const id = crypto.randomUUID().slice(0, 8);
  const row: StoredAnalysis = { ...a, id, createdAt: new Date().toISOString() };
  analyses.set(id, row);
  if (analyses.size > MAX) analyses.delete(analyses.keys().next().value!);
  return row;
}

export function getAnalysisById(id: string): StoredAnalysis | null {
  return analyses.get(id) ?? null;
}
