import NextAuth from "next-auth"
import authOptions from "@/app/auth/authOptios";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }