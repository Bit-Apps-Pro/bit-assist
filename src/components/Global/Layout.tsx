import { Box, Container } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <Box>
      <NextNProgress color="#ff0084" />
      <Navbar />
      <Container maxW="container.lg" py={12}>
        <main>{children}</main>
      </Container>
    </Box>
  )
}

export default Layout
