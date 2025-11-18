export function isToday(date: Date){
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() && 
    date.getMonth() === now.getMonth() && 
    date.getDate() === now.getDate()
  )
}

export function isSlotsThePast(slotTime: string){
  const [slotHour, slotMinute] = slotTime.split(":").map(Number)

  const now = new Date()
  const currencyHour = now.getHours();
  const currencyMinute = now.getMinutes();

  if(slotHour < currencyHour){
    return true;
  }else if(slotHour === currencyHour && slotMinute <= currencyMinute){
    return true
}
  return false;
}


export function islotSequenceAvailable(
  startSlot: string,
  requiredSlot: number,
  allSlots: string[], 
  blockedSlots: string[]
){
 const startIndex = allSlots.indexOf(startSlot)
 if(startIndex === -1 || startIndex + Number(requiredSlot) > allSlots.length){
   return false
 }

 for(let i = startIndex; i < startIndex + Number(requiredSlot); i++ ){
  const slotTime = allSlots[i]

  if(blockedSlots.includes(slotTime)){
    return false;
  }
 }
 return true;
}