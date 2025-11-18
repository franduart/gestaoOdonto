import { DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session {
        user: User & DefaultSession['user']
    }
}
 interface User{
    id: string;
    name: string;
    email: string;
    email: string;
    emailVerified?: null | string | boolean;
    cnpj: string;
    cro: string;
    addres?: string;
    phone?: string;
    status: boolean;
    times: string[];
    createdAt: string;
    updatedAt: string;
    image: string;

}