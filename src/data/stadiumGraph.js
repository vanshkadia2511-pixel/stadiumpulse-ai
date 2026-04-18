export const stadiumGraph = {
  zone_north_gate: { zone_concession_a: 50, zone_restroom_1: 80 },
  zone_south_gate: { zone_concession_c: 50, zone_vip_lounge: 100 },
  zone_east_gate: { zone_concession_b: 60, zone_main_entry: 120 },
  zone_west_gate: { zone_concession_d: 60, zone_restroom_2: 70 },
  zone_concession_a: { zone_north_gate: 50, zone_main_entry: 90, zone_restroom_1: 40 },
  zone_concession_b: { zone_east_gate: 60, zone_main_entry: 80, zone_vip_lounge: 110 },
  zone_concession_c: { zone_south_gate: 50, zone_restroom_2: 40 },
  zone_concession_d: { zone_west_gate: 60, zone_main_entry: 100 },
  zone_restroom_1: { zone_north_gate: 80, zone_concession_a: 40 },
  zone_restroom_2: { zone_west_gate: 70, zone_concession_c: 40 },
  zone_main_entry: { zone_east_gate: 120, zone_concession_a: 90, zone_concession_b: 80, zone_concession_d: 100 },
  zone_vip_lounge: { zone_south_gate: 100, zone_concession_b: 110 }
};

export function buildWeightedGraph(zones) {
  const weightedGraph = {};
  
  const scoreMap = {};
  zones.forEach(z => {
    scoreMap[z.id] = z.pressureScore || 1;
  });

  for (const node in stadiumGraph) {
    weightedGraph[node] = {};
    for (const neighbor in stadiumGraph[node]) {
      const baseDistance = stadiumGraph[node][neighbor];
      const neighborScore = scoreMap[neighbor] || 1;
      
      const penalty = 1 + (neighborScore / 100);
      weightedGraph[node][neighbor] = baseDistance * penalty;
    }
  }

  return weightedGraph;
}
