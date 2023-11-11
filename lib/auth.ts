import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb"

export const config = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Email and password required");
            }
            const user = await prismadb.user.findUnique({
              where: {
                email: credentials.email,
              },
            });
    
            if (!user) {
              throw new Error("User does not exists");
            }
    
            const isCorrectPassword = await compare(
              credentials.password,
              user.password
            );
    
            if (!isCorrectPassword) {
              throw new Error("Password is incorrect");
            }
    
            return user;
          },
        }),
      ], 
      pages: {
        signIn: "/auth",
        error:"/auth"
      },
      debug: process.env.NODE_ENV === "development",
      session: {
        strategy: "jwt",  
      },
      jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
      secret: process.env.NEXTAUTH_SECRET,
      
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}