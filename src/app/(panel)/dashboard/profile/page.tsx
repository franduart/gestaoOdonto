import  getSession  from "@/lib/getSession"
import { redirect } from "next/navigation"
import { getUserData } from "./_data_access/get-info-user"
import { ProfileContent } from "./_componentes/profile"
export default async function Profile(){

      const session = await getSession()
      if(!session){
        redirect('/')
      }

      const user = await getUserData({userId: session.user?.id})

      if(!user){
        redirect('/')
      }
    return(
       <ProfileContent user={user}/>
    )
}