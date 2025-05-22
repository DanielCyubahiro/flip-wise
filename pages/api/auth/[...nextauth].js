import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'production'
      ? CredentialsProvider({
          name: 'credentials',
          credentials: {
            username: { label: 'Username', type: 'text', placeholder: 'username' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials) {
            if (credentials.username === 'admin' && credentials.password === 'adminPassword') {
              return {
                name: 'Admin',
                email: 'admin@flipwise.com',
                id: 'a1b2c3d4',
              }
            } else {
              return null
            }
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
  ],
}

export default NextAuth(authOptions)
