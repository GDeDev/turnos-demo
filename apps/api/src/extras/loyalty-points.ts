/** Un punto cada $ 1.000 gastados; cada 10 puntos se canjean por un corte simple. */
export const POINTS_PER_PESOS = 1000;
export const POINTS_PER_REWARD = 10;

export function pointsFor(total: number): number {
  return Math.floor(total / POINTS_PER_PESOS);
}

export function rewardsAvailable(points: number): number {
  return Math.floor(points / POINTS_PER_REWARD);
}

export function pointsToNextReward(points: number): number {
  return POINTS_PER_REWARD - (points % POINTS_PER_REWARD);
}
