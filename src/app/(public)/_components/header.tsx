'use client'
import { useState } from "react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import {handleRegister} from '../_actions/login'

export function Header(){
    const {data: session, status} = useSession()
    const [open, setIsOpen] = useState(false)
    
   async function handleLogin(){
      await handleRegister("google")
    }

    const navItems = [
        { href:"#profissionais", label: 'Profissionais'},
        { href:"/contatos", label: 'Contatos'},
    ]
     const NavLinks = ()=>(
        <>
        {navItems.map((item)=>(
          <Button 
          onClick={()=> setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none"
          >
            <Link href={item.href} className="text-base"> {item.label}</Link>
          </Button>
        ))}

        {status === 'loading' ? (
        <></>
        ): session ? (
            <Link 
            className="bg-black rounded text-white p-1 flex items-center justify-center gap-2 "
            href={'/dashboard'}>
                Portal da clínica
            </Link>
        ) :  (
            
            <Button onClick={handleLogin} className="bg-[#0096C7]">
                <LogIn/>Login
                </Button>
        )}
        </>
     )
    return(
        <header 
        className="fixed top-0 right-0 left-0 z-[999] bg-white ">
        <div className="md:max-w-4/5 mx-auto flex justify-between items-center text-zinc-900 py-4 px-6">
            <Link 
            className="text-3xl font-bold"
            href="/">
            Gestão<span className=" text-3xl font-bold  text-[#0096C7]">Odonto</span>
            </Link>
            <nav className="hidden md:flex items-center">
                <NavLinks/>
            </nav>

            <Sheet open={open} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="flex md:hidden cursor-pointer">
                    <Button 
                    className="text-black hover:bg-transparent"
                    variant='ghost'
                    size='icon'>
                        <Menu className="w-6 h-6"/>
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="p-4 w-[240px] sm:[300px] z-[9999]" >
                 <SheetTitle>Menu</SheetTitle>
                 <SheetHeader></SheetHeader>
                 <SheetDescription >
                    Veja nossos links
                 </SheetDescription>
                 <nav 
                 className="flex flex-col space-y-4 mt-6 items-start">
                   <NavLinks/>
                 </nav>
                </SheetContent>
            </Sheet>
        </div>
        </header>
    )
}