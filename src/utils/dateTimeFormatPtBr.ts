export function dateTimeFormatPtBr(value: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}
