import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb"


export async function POST(req: Request, res: Response) {
    try {
       const {email, name, password} = await req.json()
        console.log(email, name, password)

        const existingUser = await prismadb.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser) {
            return new Response("User already exists", {status: 422})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
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