import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export async function POST(req: Request, res: Response) {
    try {
       const {email, name, password} = await req.json()
        console.log(email, name, password)

        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser) {
            return new Response("User already exists", {status: 422})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data:{
                email,
                name,
                password: hashedPassword
            }
        })
        return new Response(user.email, {status: 201})
    } catch (error) {
        console.log(error)
    }
}