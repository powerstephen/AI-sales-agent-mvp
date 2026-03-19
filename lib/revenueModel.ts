import { deals } from "@/lib/deals";

export type RevenueICP = {
  topIndustries: Record<string, number>;
  topPersonas: Record<string, number>;
  employeeBands: Record<string, number>;
  avgDealSize: number;
  winRate: number;
};

function getEmployeeBand(size: number): string {
  if (size < 50) return "1-49";
  if (size <= 200) return "50-200";
  if (size <= 500) return "201-500";
  return "500+";
}

export function buildRevenueICP(): RevenueICP {
  const wonDeals = deals.filter((d) => d.stage === "Closed Won");

  const industries: Record<string, number> = {};
  const personas: Record<string, number> = {};
  const bands: Record<string, number> = {};

  let totalValue = 0;

  for (const d of wonDeals) {
    industries[d.industry] = (industries[d.industry] || 0) + d.amount_eur;
    personas[d.persona] = (personas[d.persona] || 0) + d.amount_eur;

    const band = getEmployeeBand(d.company_size);
    bands[band] = (bands[band] || 0) + d.amount_eur;

    totalValue += d.amount_eur;
  }

  const totalDeals = deals.length;
  const winRate = wonDeals.length / totalDeals;

  return {
    topIndustries: industries,
    topPersonas: personas,
    employeeBands: bands,
    avgDealSize: totalValue / (wonDeals.length || 1),
    winRate,
  };
}

function getScoreFromDistribution(
  value: string,
  distribution: Record<string, number>
) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (!total) return 0;

  return (distribution[value] || 0) / total;
}

export function scoreSignalWithRevenueICP(signal: any) {
  const icp = buildRevenueICP();

  const industryScore = getScoreFromDistribution(
    signal.industry,
    icp.topIndustries
  );

  const personaScore = getScoreFromDistribution(
    signal.persona,
    icp.topPersonas
  );

  const band = getEmployeeBand(signal.employees);
  const sizeScore = getScoreFromDistribution(band, icp.employeeBands);

  // weighted scoring
  const score =
    industryScore * 0.4 +
    personaScore * 0.3 +
    sizeScore * 0.3;

  return Math.round(score * 100);
}
