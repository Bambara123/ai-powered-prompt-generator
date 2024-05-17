import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import connectToDatabase from "@utils/database";
import User from "@models/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      let sessionUser = null;
      try {
        sessionUser = await User.findOne({ email: session.user.email });
      } catch (err) {
        console.log("this is the error", err);
      }

      session.user.id = sessionUser._id.toString();

      console.log(session);

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
  },
});

export { handler as GET, handler as POST };
