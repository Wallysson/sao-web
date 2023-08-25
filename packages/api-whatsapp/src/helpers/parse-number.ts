function parseBrazilianNumber(cleanDdd: string, cleanNumber: string): string {
  if (cleanNumber.length === 9 && cleanNumber.startsWith('9')) {
    cleanNumber = cleanNumber.slice(1);
  }

  const fullNumber = cleanDdd + cleanNumber;
  if (fullNumber.length === 10) {
    return '55' + fullNumber + '@c.us';
  }

  if (!fullNumber.endsWith('@c.us')) {
    throw new Error("Número de telefone inválido: deve terminar com '@c.us'");
  }

  if (fullNumber.length !== 17) {
    throw new Error('Número de telefone inválido: comprimento incorreto');
  }

  return fullNumber;
}

type WhatsAppNumber = string;

export function parseNumber(
  countryCode: string,
  ddd: string,
  number: string
): WhatsAppNumber {
  const cleanNumber = number.replace(/\D/g, '');
  const cleanDdd = ddd.replace(/\D/g, '');
  const cleanCountryCode = countryCode.replace(/\D/g, '');

  if (cleanCountryCode === '55') {
    return parseBrazilianNumber(cleanDdd, cleanNumber);
  } else {
    return cleanCountryCode + cleanDdd + cleanNumber + '@c.us';
  }
}
