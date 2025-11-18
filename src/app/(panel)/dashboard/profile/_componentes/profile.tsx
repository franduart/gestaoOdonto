"use client";
import {ProfileFormData, useProfileForm} from './profile-form'
import {Card, CardContent,CardHeader, CardTitle } 
from '@/components/ui/card';
import { useState } from 'react';
import {formatarCNPJ, formatPhone} from '@/utils/formatPhone'
import 
{
    Form, FormControl, 
    FormDescription, FormField,
     FormItem, FormLabel, FormMessage
} 
from '@/components/ui/form';
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {Label} from '@/components/ui/label'
import Image from 'next/image';
import ImgTest from '../../../../../../public/foto1.png'
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
 import { Prisma } from "@/generated/prisma";
import { updateProfile } from '../_actions/update-profile';
import { toast } from 'sonner';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import { AvatarProfile } from './profile-avatar';

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  }
}>;

interface ProfileContentProps{
    user: UserWithSubscription;
}
export function ProfileContent({user}: ProfileContentProps){
    const [selectHours, setSelectHours ] = useState<string[]>(user.times ?? [])
    const [dialogOpen, setDialogOpen] = useState(false)
    const {update} = useSession();
    const router = useRouter()
    const form = useProfileForm({
        name: user.name,
        address: user.addres,
        phone: user.phone,
        cro: user.cro,
        status: user.status,
        timeZone: user.timeZone,
        cnpj: user.cnpj
    })


    function generateTimeSlots(){
        const hours: string[] = [];
        for (let i = 8; i <= 24; i++){
           for(let j =0; j < 2; j++){
            const hour = i.toString().padStart(2, "0")
            const minuts = (j * 30).toString().padStart(2, "0")
            hours.push(`${hour}:${minuts}`)
           }
        }
        return hours;
    }

    const hours = generateTimeSlots();
    
    function toggleHour(hour: string){
      setSelectHours((prev)=> prev.includes(hour) ? 
      prev.filter(h =>h !== hour ) : [...prev, hour].sort() )
    }

    const timeZone = Intl.supportedValuesOf("timeZone").filter((zone)=> 
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista") 
    )

   async function Onsubmit(values: ProfileFormData){
     const profileData = {
        ...values,
        times: selectHours
     }
     const response = await updateProfile({
        name: values.name,
        status: values.status === 'active' ? true : false,
        timeZone: values.timeZone,
        address: values.address,
        cro: values.cro,
        phone: values.phone ,
        times: selectHours || [],
        cnpj: values.cnpj
    })
    if(response.error){
        toast(response.error, {closeButton: true})
        return;
    }
    toast(response.data)

   }

   async function handleLogout() {
    await signOut();
    await update();
    router.replace("/")

   }
    
    return(
        <div className='mx-auto flex flex-col justify-between gap-4'>
            <Form {...form}>
             <form onSubmit={form.handleSubmit(Onsubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Meu Perfil</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                <div className='flex justify-center'>
                <AvatarProfile
                avatarUrl={user.image}
                userId={user.id}
                />
                </div>

                <div className='-space-y-4 flex flex-col gap-6 justify-between'>
                  
                  <FormField
                  control={form.control}
                  name='name'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>Nome Completo</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Digite o nome da clínica'/>
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                  )}
                  />

                    <FormField
                  control={form.control}
                  name='address'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>Endereço Completo</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Digite o endereço da clínica'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />

                 

                  <FormField
                  control={form.control}
                  name='cro'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>CRO da clínica</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Digite o CRO da clínica'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='phone'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>Telefone</FormLabel>
                        <FormControl>
                            <Input {...field} 
                            placeholder='ex.(12)99152-5683'
                            onChange={(e)=> {
                              const formatedValue = formatPhone(e.target.value)
                              field.onChange(formatedValue)
                            }}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />

                   <FormField
                  control={form.control}
                  name="cnpj"
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>CNPJ</FormLabel>
                        <FormControl>
                            <Input {...field} 
                            placeholder='CNPJ da clínica'
                            onChange={(e)=> {
                               const formatCnpj = formatarCNPJ(e.target.value)
                               field.onChange(formatCnpj)
                            }}
                            
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='status'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>Nome Completo
                            
                        </FormLabel>
                        <FormControl>

                        <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value ? "active" : "inactive"}
                        >
                            <SelectTrigger>
                             <SelectValue placeholder="Selecione o status da clínica"/>
                            </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='active'>Ativo</SelectItem>
                            <SelectItem value='inactive'>Fechado </SelectItem>
                        </SelectContent>
                        </Select>

                        </FormControl>
                    </FormItem>
                  )}
                  />

                  <div className='space-y-2'>
                    <Label className='font-semibold'>
                        Configurar horários da clínica
                    </Label>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild >
                 <Button className='w-full justify-between bg-[#0096C7]'>
                    Clique aqui para selecionar horários
                    <ArrowRight/>
                 </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Horários da cliníca</DialogTitle>
                    <DialogDescription>
                        Selecione abaixo os horários de funcionamento da clínica
                    </DialogDescription>
                    </DialogHeader>

                    <section className='py-4'>
                     <p className='mb-2 text-sm text-muted-foreground '>Clique nos horários para marcar e desmarcar</p>

                     <div className='grid grid-cols-5 gap-2'>
                    {hours.map((hour)=>( 
                    <Button 
                        key={hour} 
                        variant='outline'
                        className={cn(
                        'h-10',
                        selectHours.includes(hour) && 'border-[#0096C7] text-primary border-2'
                        )}
                        onClick={()=> toggleHour(hour)} 
                    >
                        {hour}
                    </Button>
                    ))}
                     </div>
                    </section>

                    <Button 
                    onClick={()=> setDialogOpen(false)}
                    className='w-full bg-[#0096C7] :hover-bg-[#137291]'>
                        Salvar horários
                    </Button>
                </DialogContent>
                </Dialog>
                  </div>

                <FormField
                  control={form.control}
                  name='timeZone'
                  render={({field})=> (
                    <FormItem>
                        <FormLabel className='font-semibold'>Selecione o fuso horário
                            
                        </FormLabel>
                        <FormControl>

                        <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value ? "active" : "inactive"}
                        >
                            <SelectTrigger>
                             <SelectValue placeholder="Selecione seu fuso horário"/>
                            </SelectTrigger>
                        <SelectContent>
                            {timeZone.map((zone)=>(
                                <SelectItem key={zone} value={zone}>
                                    {zone}
                                </SelectItem>
                            ))}
                           
                           
                        </SelectContent>
                        </Select>

                        </FormControl>
                    </FormItem>
                  )}
                  />

                  <Button
                  type='submit'
                  className='w-full bg-cyan-500 hover:-bg-[#0d7293]] cursor-pointer shadow '
                  >Salvar Alterações
                  </Button>
                
                </div>
                    </CardContent>
                </Card>
             </form>
            </Form>

            <section className='m-4'>
                <Button
                variant='destructive'
                onClick={handleLogout}
                >Sair da conta</Button>
            </section>
        </div>
    )
}