import { config } from "@/lib/auth";
import NextAuth from "next-auth";
import prismadb from "@/lib/prismadb";

const handler = NextAuth({
  providers: config.providers,
  pages: config.pages,
  debug: config.debug,
  session: config.session,
  jwt: config.jwt,
  secret: config.secret,
});

export { handler as GET, handler as POST };
