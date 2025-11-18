import { getAllServices } from "../_data-access/getAll-services"
import { ServicesList } from "./services-list"
import { canPermission } from "@/utils/permissions/canPermission" 

interface ServicesContentProps {
   userId: string
}

export async function ServicesContent({userId}: ServicesContentProps){
    const services = await getAllServices({userId: userId})
    const permission = await canPermission({type: "service"})
    console.log("permisao",permission)

    return(
        <ServicesList services={services?.data || []} permission={permission} />
    )
}