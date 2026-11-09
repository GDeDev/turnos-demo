/** Propina sugerida como porcentaje del total, redondeada a múltiplos de $ 50. */
export function suggestedTip(total: number, percent = 10): number {
  return Math.round((total * percent) / 100 / 50) * 50;
}

export function totalWithTip(total: number, tip: number): number {
  return total + Math.max(0, tip);
}
