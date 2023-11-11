import prismadb from "@/lib/prismadb"


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = searchParams.get("take");

    if (!take) {
      throw new Error("Take is missing missing");
    }
    const series = await prismadb.movie.findMany({
      take: Number(take),
      where: {
        new: true,
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
