import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      throw new Error("Category id missing");
    }
    const series = await prisma.movie.findMany({
      take: 20,
      where: {
        categoryId: Number(categoryId),
      },
    });
    if (!series) {
      throw new Error("No movies");
    }
    return Response.json(series, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, formData } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.id !== process.env.ADMIN_ID) {
      throw new Error("User is not an admin");
    }

    const movie = await prisma.movie.create({
      data: {
        categoryId: formData.categoryId,
        movieName: formData.movieName,
        thumbNailUrl: formData.thumbNailUrl,
        properties: formData.properties,
        match: formData.match,
        minAge: formData.minAge,
        seriesCount: formData.seriesCount,
        quality: formData.quality,
        new: true,
        releaseYear: formData.releaseYear,
        actors: formData.actors,
        duration: formData.duration,
        description: formData.description,
        genres: formData.genres,

      },
    });
    if (!movie) {
      throw new Error("Something went worng");
    }
    return new Response("Movie created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
