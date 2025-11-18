import Link from "next/link";

export function Footer(){
    return(
        <footer className="flex flex-col items-center justify-center text-center py-6 text-gray-500 text:sm md:text-base shadow">
        <p>todos os direitos reservados {new Date().getFullYear()} 
        </p>
        <Link 
        className="text-[#0096C7] hover:text-black"
        href={'https://www.instagram.com/gestao_odonto_sistema/'}>
           Gestão Odonto sistemas
           </Link>
    </footer>
    )
}