import { useStadium } from '../context/StadiumState';
import { buildWeightedGraph } from '../data/stadiumGraph';
import { findBestRoute, generateSuggestions, predictWaitTime } from '../utils/crowdAlgorithm';

export function useCrowdOracle() {
  const { state } = useStadium();
  const { zones, history } = state;

  const getBestRoute = (fromId, toId) => {
    if (!zones.length) return null;
    const graph = buildWeightedGraph(zones);
    return findBestRoute(graph, fromId, toId);
  };

  const getTopRecommendations = () => {
    return generateSuggestions(zones);
  };

  const getWaitForecast = (zoneId) => {
    const zoneHistory = history[zoneId] || [];
    const waitHistory = zoneHistory.map(z => z.wait_time_minutes);
    return {
      plus5: predictWaitTime(waitHistory, 5) || 0,
      plus10: predictWaitTime(waitHistory, 10) || 0,
      plus15: predictWaitTime(waitHistory, 15) || 0
    };
  };

  const getPressureScore = (zoneId) => {
    const zone = zones.find(z => z.id === zoneId);
    return zone?.pressureScore || 0;
  };

  return { getBestRoute, getTopRecommendations, getWaitForecast, getPressureScore };
}
