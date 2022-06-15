import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/outfit/200.css'
import '@fontsource/outfit/300.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import theme from '../theme'
import { AppProps } from 'next/app'
import Layout from '@components/global/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import '@pages/timezone.css'

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}
