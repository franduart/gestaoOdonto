export function formatPhone(value: string) {
  const cleanValue = value.replace(/\D/g, ''); 

  if (cleanValue.length > 11) {
    return value.slice(0, 15);
  }

  const formattedValue = cleanValue
    .replace(/^(\d{2})(\d)/, '($1) $2') 
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');

  return formattedValue;
}

export function formatarCNPJ(cnpj: string) {
 
  cnpj = cnpj.replace(/\D/g, '');

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
}