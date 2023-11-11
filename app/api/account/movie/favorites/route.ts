import prismadb from "@/lib/prismadb"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;

    const account = await prismadb.account.findUnique({
      where: { id: userId },
    });

    if (account?.likedMoviesId.length === 0) {
      return new Response(null);
    }
    const movies = await prismadb.movie.findMany({
      take: 20,
      where: {
        id: {
          in: account?.likedMoviesId,
        },
      },
    });

    if (!movies) {
      return new Response("Movies not found");
    }

    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { accountId, movieId } = await req.json();
    if (!accountId || !movieId) {
      throw new Error("Invalid data provided");
    }

    const account = await prismadb.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    if (account.likedMoviesId.includes(movieId)) {
      //remove item
      const updatedAccount = await prismadb.account.update({
        where: {
          id: accountId,
        },
        data: {
          likedMoviesId: {
            set: account.likedMoviesId.filter((id) => id !== movieId),
          },
        },
      });
      return Response.json(updatedAccount, { status: 200 });
    } else {
      //like item
      const updatedAccount = await prismadb.account.update({
        where: {
          id: accountId,
        },
        data: {
          likedMoviesId: {
            push: movieId,
          },
        },
      });
      return Response.json(updatedAccount, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
