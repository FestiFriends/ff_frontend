// export const performanceApi = {
//   getPerformances: async (
//     params: GetPerformancesParams = {}
//   ): Promise<Performance[]> => {
//     const query = new URLSearchParams(
//       params as Record<string, string>
//     ).toString();

//     const res = await fetch(`/api/v1/performances?${query}`);

//     const json: PerformanceListResponse = await res.json();

//     return json.data ?? [];
//   },
// };
