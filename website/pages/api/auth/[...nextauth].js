import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  callbacks: {
    async error(message) {
      console.log(message);
    },
    async signIn(req, userAcc) {
      
    },
  },
  pages: {
    signIn: "/",
  },
  debug: true,
});
