import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import { movieRating } from "@/d.types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;

    const account = await prismadb.account.findUnique({
      where: { id: userId },
    });

    if (!account || account.movieRating.length === 0) {
      return new Response(null);
    }

    const accountMovieIds = (account.movieRating as unknown as  movieRating[]).map((rating) => rating.movieId)

    const movies = await prismadb.movie.findMany({
      take: 20,
      where: {
        id: {
          in: accountMovieIds, 
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
    const { accountId, movieId, value } = await req.json();
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

    //value = dislike, like, superlike, unset


    //IF movieId does not exist create new record with id and value
    //If movieId exists in the movieRating -> update the value ||
    //delete the whole object if value = "unset"

    const existingMovieRatings: movieRating[] =
      (account.movieRating as unknown[] as movieRating[]) || [];

    const index = existingMovieRatings.findIndex(
      (rating) => rating.movieId === movieId
    );

    if (index !== -1) {
      if (existingMovieRatings[index].movieRating === value) {
        // If value is the same, remove the whole object from the array
        existingMovieRatings.splice(index, 1);
      } else {
        // Otherwise, update the value
        existingMovieRatings[index].movieRating = value;
      }
    } else {
      // If movieId doesn't exist, create a new record
      const movieRating: movieRating = {
        movieId,
        movieRating: value,
      };
      existingMovieRatings.push(movieRating);
    }

    const updatedAccount = await prismadb.account.update({
      where: {
        id: accountId,
      },
      data: {
        movieRating: {
          set: existingMovieRatings as unknown[] as Prisma.InputJsonValue[],
        },
      },
    });

    return Response.json(updatedAccount, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
