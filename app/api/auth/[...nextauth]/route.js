import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // custom login page (optional)
    newUser: "/dashboard", // redirect new users after first sign in
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDb();

        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email
              .split("@")[0]
              .replace(/\s+/g, "-")
              .toLowerCase(),
            profilepic: user.image || "", // Provider provides image
            coverpic: "",
          });
        }
      }
      return true;
    },

    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.username = dbUser.username;
        session.user.profilepic = dbUser.profilepic;
        session.user.coverpic = dbUser.coverpic;
      }
      return session;
    },

    async redirect() {
      return "/dashboard"; // always go to dashboard after login
    },
  },
});

export { authoptions as GET, authoptions as POST };
