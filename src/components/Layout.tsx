import { Box, Container } from '@chakra-ui/react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <Container maxW="container.lg" py={12}>
        <main>{children}</main>
      </Container>
    </Box>
  )
}

export default Layout
