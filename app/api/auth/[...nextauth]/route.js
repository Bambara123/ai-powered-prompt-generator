import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import connectToDatabase from "@utils/database"; // i used default export
import User from "@models/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // check whether the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

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
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  async session({ session }) {
    // store the user id from MongoDB to session
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();

    console.log("session p", session);

    return session;
  },
});

export { handler as GET, handler as POST };
