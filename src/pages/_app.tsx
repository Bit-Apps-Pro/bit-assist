import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/outfit/200.css'
import '@fontsource/outfit/300.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import theme from '../theme'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
