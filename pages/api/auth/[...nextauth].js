import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [CredentialsProvider({
          name: "credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (
                credentials.username === "admin" &&
                credentials.password === "adminPassword"
            ) {
              return {
                name: "Admin",
                email: "admin@flipwise.com",
                id: "a1b2c3d4"
              };
            } else {
              return null;
            }
          },
        })
  ],
};

export default NextAuth(authOptions)