"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Pencil, Plus, X } from "lucide-react"
import { DialogService } from "./dialog-services"
import { Services } from "@/generated/prisma"
import { formatCurrrency } from "@/utils/formatCurrency"
import { deleService } from "../_actions/delete-services"
import { toast } from "sonner"
import { ResultPermissionProp } from "@/utils/permissions/canPermission"
import Link from "next/link"

export interface ServicesListProps {
  services: Services[]
  permission: ResultPermissionProp
}

export function ServicesList({ services, permission }: ServicesListProps) {
  const [isDialogOpen, setIsdialogOpen] = useState(false)
  const [editService, setEditService] = useState<null | Services>(null)
  const [localServices, setLocalServices] = useState<Services[]>(services)

  function handleAddService(newService: Services) {
  setLocalServices((prev) => [...prev, newService])
}

  const maxServices = permission.hasPermission ? Infinity : 10
  const hasReachedLimit = localServices.length >= maxServices

  async function handleDeleteService(serviceId: string) {
    const response = await deleService({ serviceId })

    if (response.error) {
      toast(response.error)
      return
    }

    
    setLocalServices(prev => prev.filter(s => s.id !== serviceId))
    toast.success(response.data)
  }

  function handleEditService(service: Services) {
    setEditService(service)
    setIsdialogOpen(true)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsdialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row  items-center justify-between space-y-0">
          <CardTitle>Serviços</CardTitle>

            {hasReachedLimit ? (
                <>
               <div className="w-full p-1 rounded-md bg-red-500 text-white flex flex-col  md:flex-row items-center justify-between">
                 <p className="font-bold text-[1.2rem]">Limite de serviços atingido </p>
              <Link href={"/dashboard/plans"} className="bg-black text-white p-1 rounded-md text-sm">
                
               Assinar plano
              </Link>
               </div>
                </>
            ) : (
              <DialogTrigger asChild>
                <Button className="bg-[#08B7E4]">
                  <Plus className="w-4 h-4" /> Cadastrar serviço
                </Button>
              </DialogTrigger>
            )}
             

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
                setIsdialogOpen(false)
                setEditService(null)
              }}
            >
              <DialogService
                closeModal={() => {
                  setIsdialogOpen(false)
                  setEditService(null)
                }}
                serviceId={editService ? editService.id : undefined}
                initialValues={
                  editService
                    ? {
                        name: editService.name,
                        price: (editService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(editService.duration / 60).toString(),
                        minutes: (editService.duration % 60).toString(),
                      }
                    : undefined
                }
                onServiceCreated={handleAddService}
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5">
              {localServices.map((service) => (
                <article
                  className="flex items-center justify-between"
                  key={service.id}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-gray-500">-</span>
                    <span className="font-light">
                      {formatCurrrency(service.price / 100)}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}
