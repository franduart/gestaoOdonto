"use client"

import { DialogHeader } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { UseDialogServiceForm, DialogServiceFormData } from "./dialog-form-services"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {convertRealToCents} from '@/utils/convertCurrency'
import {createNewServices} from '../_actions/create-services'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"
import { useState } from "react"
import {useRouter} from 'next/navigation'
import {updateService} from '../_actions/update-services'

interface DialogServicesModal {
    closeModal: () => void;
    serviceId?: string ;
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string
    };
    onServiceCreated?: (service: any) => void; 
}
export function DialogService({closeModal, initialValues, serviceId, onServiceCreated}: DialogServicesModal){


    const form = UseDialogServiceForm({initialValues: initialValues})

    const [load, setLoad] = useState(false)

    const router = useRouter()
   async function onSubmit(values: DialogServiceFormData){

     setLoad(true)

   const priceInCents = convertRealToCents(values.price)
       
   const hours = parseInt(values.hours) || 0;
   const minutes = parseInt(values.minutes) || 0;

   const duration = (hours *60 ) + minutes;

   if(serviceId){
    await editServiceId({
        servicesId: serviceId,
        name: values.name,
        priceInCents: priceInCents,
        duration: duration
    })

    return;
   }

   const response = await createNewServices({

    name: values.name,
    price: priceInCents,
    duration: duration
   })

    setLoad(false)

   if(response.error){
    toast(response.error)
    return;
   }

   toast.success('Serviço cadastrado com sucesso!')

   if (response.data) {
  onServiceCreated?.(response.data)
   }
   form.reset();

   handleCloseModal()
  

   

    }

    async function editServiceId({servicesId, name, 
        priceInCents, duration}:
         {servicesId: string, name: string, priceInCents:number, duration: number}){

      const response = await updateService({
        servicesId: servicesId,
        name: name,
        price: priceInCents,
        duration: duration
      })

      setLoad(false)

      if(response.error){
        toast(response.error)
        return
      }

      toast.success(response.data)
      handleCloseModal()
    }

    function handleCloseModal(){
        closeModal()
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>){
    let {value} = event.target;

    value = value.replace(/\D/g, '');

    if(value){
        value = (parseInt(value, 10) / 100).toFixed(2)
        value = value.replace('.', ',');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        event.target.value = value
        form.setValue("price", value)
    }
    }


    return(
        <>
        <DialogHeader>
            <DialogTitle>
                Novo Serviço
            </DialogTitle>
            <DialogDescription>
                Adicone um novo serviço
            </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2">
           <div className="flex flex-col">
            <FormField
            control={form.control}
            name="name"
            render={({field})=> (
                <FormItem className="my-2">
                    <FormLabel className="font-semibold">Nome do serviço</FormLabel>
                    <FormControl>
                     <Input 
                     {...field}
                     placeholder="digite o nome do serviço"
                     />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="price"
            render={({field})=> (
                <FormItem className="my-2">
                    <FormLabel className="font-semibold">Valor do serviço</FormLabel>
                    <FormControl>
                     <Input 
                     {...field}
                     placeholder="valor do serviço "
                     onChange={changeCurrency}
                     />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
           </div>

              <p className="font-semibold">Tempo de duração do serviço</p>
           <div className="grid grid-cols-2 gap-3">
            <FormField
            control={form.control}
            name="hours"
            render={({field})=> (
                <FormItem className="my-2">
                    <FormLabel className="font-semibold">Horas:</FormLabel>
                    <FormControl>
                     <Input 
                     {...field}
                     placeholder="1"
                     min={"0"}
                     type="number"
                     />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="minutes"
            render={({field})=> (
                <FormItem className="my-2">
                    <FormLabel className="font-semibold">Minutos:</FormLabel>
                    <FormControl>
                     <Input 
                     {...field}
                     placeholder="0"
                     min={"0"}
                     type="number"
                     />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
           </div>

           <Button 
           className="font-semibold w-full bg-[#08B7E4]"
           type="submit"
           disabled={load}
           >
            {load ? "Carregando..." : `${serviceId ? "Atualizar serviço" : 'Cadastrar serviço' }`}
           </Button>

          </form>
        </Form>
        </>
    )
}