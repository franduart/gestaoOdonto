import { Footer } from "../(public)/_components/footer" 
import Img from '../../../public/Logotipo_para_odontologia_elegante_em_bege_e_cinza-removebg-preview.png'
import CallToAction from "./components/callToAction/CallToAction"
import { Hero } from "./components/hero/Hero"
import { Session } from "./components/hero/session/Session"
import Planos from "./components/planos/Planos"
import { FaInstagram, FaFacebook  } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";

export default async function OdontoPage(){
  

  return(
    <>
    <header className="w-full flex items-center justify-around  shadow-2xl">
      <img src={Img.src } alt="logo gestãoOdonto" 
      className="w-[150px]"/>
      <nav className="flex items-center justify-between gap-4 text-zinc-700 text-[1rem]">
        <a href="https://www.instagram.com/gestao_odonto_sistema/" target="_blank" className="text-[#38B6FF] text-2xl"><FaInstagram/></a>
        <a href="https://www.facebook.com/profile.php?id=61581831237938" target="_blank"  className="text-[#38B6FF] text-2xl"><FaFacebook /></a>
        <a href="https://gestao-odonto-cyan.vercel.app/" className="text-[#38B6FF] text-2xl" target="_blank" ><GrPersonalComputer /></a>
      </nav>
    </header>

    <main className="">
      <Hero/>
      <Session/>
      <Planos/>
      <CallToAction/>
    </main>

   <Footer/>
    </>
  )
}
