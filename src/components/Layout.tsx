import { Box, Container } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import Navbar from '@components/Navbar'
import { ReactQueryDevtools } from 'react-query/devtools'

const Layout = ({ children }) => {
  return (
    <Box>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextNProgress color="#ff0084" />
      <Navbar />
      <Container maxW="container.lg" py={12}>
        <main>{children}</main>
      </Container>
    </Box>
  )
}

export default Layout
