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

const Navbar = () => {
  return (
    <Container maxW={'container.lg'}>
      <Flex mt={4}>
        <Box p="2">
          <Heading size="md">Bit Chaty</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="teal" variant="ghost">
            <Link href={'/'}>Buttons</Link>
          </Button>
          <Button colorScheme="teal">Sign Up</Button>
          <Button colorScheme="teal">Log in</Button>
        </ButtonGroup>
      </Flex>
    </Container>
  )
}

export default Navbar
