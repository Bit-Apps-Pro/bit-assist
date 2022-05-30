import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import { env } from 'process'

export default NextAuth({

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const url = `${env.SUBSCRIPTION_URL}signin`
        const method = 'post'
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        const res = await fetch(url, {
          method: method,
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()
        console.log('---from nrxt auth', { user })
        if (user.success) {
          const userDetails = {...user.user, token: user.token}
          // Any object returned will be saved in `user` property of the JWT
          return userDetails
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error(user.error)

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user._id
        token.user = user
      }
      return token
    },
  },
})