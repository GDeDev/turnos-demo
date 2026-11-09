export interface GiftCard {
  code: string;
  balance: number;
}

/** Descuenta de la tarjeta hasta donde alcance y devuelve lo que quedó por pagar. */
export function redeemGiftCard(card: GiftCard, amount: number): { card: GiftCard; remaining: number } {
  const used = Math.min(card.balance, Math.max(0, amount));
  return { card: { ...card, balance: card.balance - used }, remaining: amount - used };
}

export function isGiftCardCode(code: string): boolean {
  return /^GC-[A-Z0-9]{8}$/.test(code);
}
