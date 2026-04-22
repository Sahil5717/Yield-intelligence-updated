export function fmtMoneyK(valInK: number): string {
  if (Math.abs(valInK) >= 1000) {
    return '+$' + (valInK / 1000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  }
  return '+$' + Math.round(valInK) + 'K';
}

export function fmtImpactSigned(valInK: number): string {
  const sign = valInK >= 0 ? '+' : '-';
  const abs = Math.abs(valInK);
  if (abs >= 1000) return sign + '$' + (abs / 1000).toFixed(2) + 'M';
  return sign + '$' + Math.round(abs) + 'K';
}
