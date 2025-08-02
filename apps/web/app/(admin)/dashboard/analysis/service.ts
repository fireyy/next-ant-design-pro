import { request } from "@/services";
import type { AnalysisData } from "./data";

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request("/api/fake_analysis_chart_data");
}
