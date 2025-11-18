"use client"

import { Button } from "@/components/ui/button";
import { TimeSlots } from "./schedule-content";
import {cn} from '@/lib/utils'
import { islotSequenceAvailable, isSlotsThePast, isToday } from "./schedule-utils";
interface ScheduleTimeListLost{
 selectedDate: Date;
 selectedTime: string;
 requiredSlots: number;
 blockedTimes:string[];
 availableTimesSlots: TimeSlots[];
 clinicTimes: string[];
 onSelectTime: (time: string)=> void
}
export function ScheduleTimeList({
  selectedDate,
  availableTimesSlots,
  selectedTime,
  blockedTimes,
  clinicTimes,
  requiredSlots,
  onSelectTime
}: ScheduleTimeListLost){
  const dateIsToday = isToday(selectedDate)
  

  return(
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {availableTimesSlots.map((slots)=>{

        const sequenceOk = islotSequenceAvailable(
          slots.time,
          requiredSlots,
          clinicTimes,
          blockedTimes
        )

        const slotEnable= slots.available && sequenceOk

        const slotPath = dateIsToday && isSlotsThePast(slots.time )

        return(
          <Button
          onClick={()=> onSelectTime(slots.time)}
          type="button"
          variant={"outline"}
          key={slots.time}
          className={cn("h-10 select-none",
            selectedTime === slots.time && "border-[#0096C7] text-primary",
            !slotEnable && 'opacity-50 cursor-not-allowed '
          )}
          disabled={slotPath}

          >
          {slots.time}
          </Button>
        )
      })}
    </div>
  )
}