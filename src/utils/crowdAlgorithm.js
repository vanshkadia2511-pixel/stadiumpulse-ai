export function computePressureScore(zone) {
  const trendMultipliers = {
    rising: 1.4,
    stable: 1.0,
    falling: 0.7
  };
  
  const trendMultiplier = trendMultipliers[zone.trend] || 1.0;
  const normalizedWait = Math.min(100, (zone.wait_time_minutes / 60) * 100);
  
  let score = (zone.current_occupancy_percentage * 0.6) + (normalizedWait * 0.4);
  score = score * trendMultiplier;
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function classifyZone(score) {
  if (score < 40) return 'low';
  if (score < 70) return 'moderate';
  if (score < 85) return 'high';
  return 'critical';
}

export function findBestRoute(graph, start, end) {
  const distances = {};
  const previous = {};
  const nodes = [];

  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.push({ id: vertex, dist: 0 });
    } else {
      distances[vertex] = Infinity;
      nodes.push({ id: vertex, dist: Infinity });
    }
    previous[vertex] = null;
  }

  while (nodes.length) {
    nodes.sort((a, b) => a.dist - b.dist);
    let smallest = nodes.shift().id;

    if (smallest === end) {
      const path = [];
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      path.push(start);
      return path.reverse();
    }

    if (distances[smallest] === Infinity) break;

    for (let neighbor in graph[smallest]) {
      let alt = distances[smallest] + graph[smallest][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = smallest;
        const idx = nodes.findIndex(n => n.id === neighbor);
        if (idx !== -1) nodes[idx].dist = alt;
      }
    }
  }
  return null;
}

export function predictWaitTime(history, minutesAhead) {
  if (!history || history.length < 2) return null;
  
  const n = history.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += history[i];
    sumXY += i * history[i];
    sumXX += i * i;
  }
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const futureX = (n - 1) + minutesAhead; 
  return Math.max(0, Math.round(slope * futureX + intercept));
}

export function generateSuggestions(zones) {
  const suggestions = [];
  
  zones.forEach(zone => {
    if (zone.pressureScore > 85 && zone.trend === 'rising') {
      suggestions.push({
        id: `avoid_${zone.id}`,
        type: 'warning',
        message: `Avoid ${zone.name} — crowd levels are critical and rising.`
      });
    }
    
    if (zone.trend === 'falling' && zone.pressureScore < 50) {
      suggestions.push({
        id: `visit_${zone.id}`,
        type: 'success',
        message: `${zone.name} is clearing up. Good time to go!`
      });
    }
  });
  
  return suggestions.slice(0, 3);
}
