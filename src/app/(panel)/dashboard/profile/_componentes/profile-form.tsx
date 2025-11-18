"use client"

import {zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

interface UseProfileProps{
    name: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    timeZone: string | null;
    cro: string | null;
    cnpj: string | null
}
const profileSchema = z.object({
    name: z.string().min(1, {message: "O nome é obrigatório"}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.string().min(1, {message: "O timezone é obrigatório"}),
    cro: z.string().optional(),
    cnpj: z.string().optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({ name, address,cro,phone,status,timeZone, cnpj}: UseProfileProps){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues:{
            name: name || '',
            address: address|| '',
            phone: phone || '',
            status: status ? 'active' : 'inactive',
            timeZone: timeZone || '',
            cro: cro || '',
            cnpj: cnpj || ''
        }
    })
}