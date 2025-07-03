import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      authorization: {
        params: {
          scope: "r_liteprofile r_emailaddress",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      try {
        await connectDb();

        if (account.provider === "github") {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });
            await newUser.save(); // ✅ Actually save the new user!
            console.log("New user saved:", newUser);
          }
        }

        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDb();

        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (err) {
        console.error("Error in session callback:", err);
        return session; // Return session anyway to prevent hard crash
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from 'next-auth'
// import FacebookProvider from 'next-auth/providers/facebook'

// import EmailProvider from 'next-auth/providers/email'
// import GitHubProvider from 'next-auth/providers/github'

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     }),
// FacebookProvider({
//   clientId: process.env.FACEBOOK_ID,
//   clientSecret: process.env.FACEBOOK_SECRET
// }),
//
// EmailProvider({
//   server: process.env.MAIL_SERVER,
//   from: 'NextAuth.js <no-reply@example.com>',
// }),
//   ],
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
