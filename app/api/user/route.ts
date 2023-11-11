import prismadb from "@/lib/prismadb"

export async function DELETE (req: Request) {
    try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      throw new Error("Category id missing");
    }

    const user = await prismadb.user.findUnique({
        where: {email}
    })
    if(!user) throw new Error("User 404")

    //Find all users accounts and delete them
    const userAccounts = await prismadb.account.findMany({
        where:{
            userId: user.id
        }
    })

    for(const account of userAccounts) {
        await prismadb.account.delete({
            where: {
                id: account.id
            }
        })
    }

    await prismadb.user.delete({
        where: {email}
    })
    
    return new Response("Successfully deleted", { status: 200})

    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500})
    }
}