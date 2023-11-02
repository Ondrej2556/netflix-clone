import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("userEmail") || undefined;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const userAccounts = await prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });

    if (userAccounts.length === 0) {
      return new Response("User has no accounts");
    }

    return Response.json(userAccounts, {status: 200});
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, nickname, imageUrl } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const userAccounts = await prisma.account.findMany({
      where: { userId: user.id },
    });

    if(userAccounts.length === 5) {
      throw new Error("You have already created 5")
    }
    await prisma.account.create({
      data: {
        userId: user.id,
        nickname,
        imageUrl,
      },
    });
    return new Response("Account created", { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("userEmail") || undefined;
    const accountId = searchParams.get("accountId") || undefined;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    
    const accountToBeDeleted = await prisma.account.findUnique({
      where: {
        id: accountId
      }
    })
    if(!accountToBeDeleted) {
      throw new Error("Account not found!")
    }

    await prisma.account.delete({
      where: {
        id: accountId
      }
    })
    return new Response("Account succesfully deleted", {status: 200})

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userEmail, nickname, imageUrl, accountId } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const updateAccount = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        nickname,
        imageUrl
      },
    })
    if(!updateAccount) {
      throw new Error("Something went wrong")
    }
    
    return new Response("Account succesfully updated", {status: 200})

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}