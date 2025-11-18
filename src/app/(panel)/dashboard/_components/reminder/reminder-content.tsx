"use client"

import { Button } from "@/components/ui/button"
import { ReminderFormData, useReminderForm } from "./reminder-form"
import {Form, FormItem,FormField,FormLabel,FormControl,FormMessage} from '@/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import {createReminder} from '../../_actions/create-reminder'
import { toast } from "sonner"

interface ReminderContentProps{
  closeDialog: () => void;
}
export function ReminderContent({closeDialog}: ReminderContentProps){

  const form = useReminderForm()

  async function onSubmit(formData: ReminderFormData){
   
    const response = await createReminder({
      description: formData.description
    })
  
    if(response.error){
     console.log(response)
      toast.error(response.error)
      return;
    }
    toast.success(response.data)
    closeDialog();


  }

  return(
    <div className="grid gap-4 py-4 ">
      <Form {...form}>
       <form className="flex flex-col gap-4"
       onSubmit={form.handleSubmit(onSubmit)}
       >
        
        <FormField
        control={form.control}
        name="description"
        render={({field})=> (
          <FormItem>
            <FormLabel>Descreva o lembrete:</FormLabel>
            <FormControl>
              <Textarea
              className="max-h-52 resize-none  "
              {...field}
              placeholder="Descreva o lembrete..."
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <Button 
        className="bg-black"
        disabled={!form.watch("description")}
        type="submit">Cadastrar lembrete</Button>
       </form>
      </Form>
    </div>
  )
}