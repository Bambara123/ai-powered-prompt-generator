import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import { User } from "@models/users";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = User.findOne({ email: session.user.email });

    session.user.id = sessionUser._id.toString();

    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDatabase();

      // check whether the user already exists in the database
      const userExists = await User.findOne("email", profile.email);

      // if not create a entry
      if (!userExists) {
        User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  },
});