import { Container } from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.lg">
        <DarkModeSwitch />
        <main>{children}</main>
      </Container>
    </>
  )
}

export default Layout
