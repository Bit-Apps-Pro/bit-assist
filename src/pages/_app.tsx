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
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { userState } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import { getUserData } from '@utils/helper'

interface MyAppProps extends AppProps {
  cookies: string
}

const queryClient = new QueryClient()

MyApp.getInitialProps = async (appContext) => {
  const request = appContext?.ctx?.req
  return {
    cookies: request?.cookies?.['bit-usr']
  }
}

export default function MyApp({ cookies, Component, pageProps }: MyAppProps) {
  const [, setUser] = useAtom(userState)

  useEffect(() => {
    if (cookies) {
      const getUserDataByCookies = getUserData(cookies)
      setUser(getUserDataByCookies)
    }
  }, [cookies])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          {Component?.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const [user] = useAtom(userState)
  
  useEffect(() => {
    if (!Boolean(Object.keys(user).length)) router.push('/')
  }, [user])

  if (Boolean(Object.keys(user).length)) return children

  return <div>Loading...</div>
}
