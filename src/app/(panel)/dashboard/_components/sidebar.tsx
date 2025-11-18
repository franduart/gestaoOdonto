'use client'


import { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import { Activity, Banknote, CalendarCheck2, ChevronLeft, ChevronRight, ChevronsLeft, Folder, List, Settings } from "lucide-react";
import Link from "next/link";

export function SidebarDashboard({children }:{children: React.ReactNode}){
 const pathName = usePathname();
 const [isCollapsed, setCollapsed] = useState(false)

 
 return(
    <div className="flexmin-h-screen w-full ">
       
       <aside className={clsx("flex flex-1 flex-col border-r bg-background transition-all  duration-300  p-4 h-full ",{
        "w-20": isCollapsed,
        "w-64": !isCollapsed,
        "hidden md:flex md:fixed": true
       }

 )}>
       <div className="mb-6 mt-4">
        {!isCollapsed && (
            <h1 className="text-2xl font-medium">Gestão<strong className="text-[#0096C7]">Odonto</strong></h1>
        )}
        
       </div>
       <Button className="bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2"
        onClick={()=> setCollapsed(!isCollapsed)}
        >
           {!isCollapsed ?  <ChevronsLeft className="w-12 h-12" /> : <ChevronRight/>}
        </Button>

        {isCollapsed && (
           <nav className="flex flex-col gap-1 overflow-hidden mt-2">
             <SideBarLink
           href="/dashboard"
           label="agendamentos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<CalendarCheck2 className="w-6 h-6"/>}
           />
            <SideBarLink
           href="/dashboard/services"
           label="Serviços"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Folder className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/profile"
           label="Meu Perfil"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Settings className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/plans"
           label="Meu planos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Banknote className="w-6 h-6"/>}
           />
            <SideBarLink
           href="/dashboard/reports"
           label="Relatórios"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Activity className="w-6 h-6"/>}
           />
           </nav>
        )}

        <Collapsible open={!isCollapsed}>
        <CollapsibleContent>
        <nav className="flex flex-col gap-1 overflow-hidden">
            <span className="text-sm text-gray-400  font-medium mt-1 uppercase">
                Painel
            </span>

            <SideBarLink
           href="/dashboard"
           label="agendamentos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<CalendarCheck2 className="w-6 h-6"/>}
           />
            <SideBarLink
           href="/dashboard/services"
           label="Serviços"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Folder className="w-6 h-6"/>}
           />

           <span className="text-sm text-gray-400  font-medium mt-1 uppercase">
                Minha Conta
            </span>

            <SideBarLink
           href="/dashboard/profile"
           label="Meu Perfil"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Settings className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/plans"
           label="Meu planos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Banknote className="w-6 h-6"/>}
           />
            <SideBarLink
           href="/dashboard/reports"
           label="Relatórios"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Activity className="w-6 h-6"/>}
           />
        </nav>
        </CollapsibleContent>
        </Collapsible>
       </aside>

      <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
        "md:ml-20": isCollapsed,
        "md:ml-64": !isCollapsed
      })}>

     <header className="md:hidden flex items-center 
     justify-between border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white
     ">
       <Sheet>
        <div className="flex items-center gap-4">
            <SheetTrigger asChild>
                <Button 
                variant='outline' 
                size='icon' 
                className="md:hidden"
                onClick={()=> setCollapsed(false)}
                >
                
                    <List className="w-5 h-5 decoration-0"/>
                </Button>
            </SheetTrigger>
            <h1 className="text-base md:text-lg font-semibold">Menu Gestão<strong className="text-[#0096C7] font-bold">Odonto</strong></h1>
        </div>

        <SheetContent side="right" className="p-4 sm-max-w-xs text-black">
        <SheetTitle>Gestão<strong className="text-[#0096C7] font-bold">Odonto</strong></SheetTitle>
        <SheetDescription>
            Menu administrativo
        </SheetDescription>

        <nav className="grid gap-2 text-base pt-5 ">
           <SideBarLink
           href="/dashboard"
           label="agendamentos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<CalendarCheck2 className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/services"
           label="Serviços"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Folder className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/profile"
           label="Meu Perfil"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Settings className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/plans"
           label="Meu planos"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Banknote className="w-6 h-6"/>}
           />
           <SideBarLink
           href="/dashboard/reports"
           label="Relatórios"
           pathName={pathName}
           isCollapsed={isCollapsed}
           icon={<Activity className="w-6 h-6"/>}
           />
        </nav>
       </SheetContent>
       </Sheet>

    

     </header>

     <main className="flex-1 py-4 px-2 md:p-6">
        {children}
     </main>
      </div>
    </div>
 )
}

interface sidebarLinkProps{
    href: string;
    icon: React.ReactNode;
    label: string;
    pathName: string;
    isCollapsed: boolean
}

function SideBarLink({ href, icon, label, pathName, isCollapsed}: sidebarLinkProps){
    return(
        <Link href={href}
        >
            <div className={clsx("flex items-center gap-2 transition-colors px-3 py-2 rounded-md ",{
                "bg-blue-500 text-white": pathName === href,
                " text-gray-700": pathName !== href
            })}>
                <span className="w-6 h-6">{icon}</span>
                {!isCollapsed && <span>{label}</span>}
                
            </div>
        </Link>
    )
}