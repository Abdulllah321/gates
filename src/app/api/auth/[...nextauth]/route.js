import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        // Add logging for debugging
        if (!user) {
          throw new Error("User not found"); // Log error
        }

        if (credentials.password !== user.password) {
          throw new Error("Invalid password"); // Log error
        }

        return { email: user.email, isAdmin: user.isAdmin };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session Callback - Session:", session);
      console.log("Session Callback - Token:", token);
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT Callback - User:", user);
      if (user) token.isAdmin = user.isAdmin;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/admin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
