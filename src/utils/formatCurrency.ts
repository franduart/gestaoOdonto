const currency_format = new Intl.NumberFormat("pt-BR", {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 0
})

export function formatCurrrency(number: number){
    return currency_format.format(number)
}