import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import Link from 'next/link'
import { DarkModeSwitch } from './DarkModeSwitch'

const Navbar = () => {
  return (
    <Container maxW={'container.lg'} >
      <Flex py="4">
        <Box py="2">
        <Heading size="md"><Link href={'/'}>Bit Chaty</Link></Heading>
        </Box>
        <Spacer />
        <ButtonGroup>
          <Link href={'/widgets'}>
            <Button rounded='full' colorScheme="teal" variant="ghost">
              Widgets
            </Button>
          </Link>
          <Button rounded='full' colorScheme="teal" variant="ghost">Sign Up</Button>
          <Button rounded='full' colorScheme="teal" variant="ghost">Log in</Button>
          <DarkModeSwitch />
        </ButtonGroup>
      </Flex>
    </Container>
  )
}

export default Navbar
