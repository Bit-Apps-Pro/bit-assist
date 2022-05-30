import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/outfit/200.css'
import '@fontsource/outfit/300.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import theme from '../theme'
import { AppProps } from 'next/app'
import Layout from '@components/Global/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

function Auth({ children }) {
  // const 
  const router = useRouter()
  const { status, data: session } = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (!isUser && status !== 'loading') router.push('/signin')
  }, [isUser, status])

  if (isUser) return children

  return <div>Loading...</div>
}
