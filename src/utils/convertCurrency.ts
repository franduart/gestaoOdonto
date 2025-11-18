/**
 * 
 * @param {string} amount 
 * @returns {number}
 */
export function convertRealToCents(amount: string){
   const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
   const priceIncents = Math.round(numericPrice * 100)
   console.log(priceIncents)
   return priceIncents;
}