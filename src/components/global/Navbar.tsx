import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { DarkModeSwitch } from './DarkModeSwitch'

const Navbar = () => {
  return (
    <Container maxW={'container.lg'} >
      <Stack py="4" direction={['column', 'row']} alignItems={['center', 'initial']} justifyContent={['initial', 'space-between']}>
        <Box py="2">
        <Heading size="md"><Link href={'/'}>Bit Assist</Link></Heading>
        </Box>
        <ButtonGroup>
          <Link href={'/widgets'}>
            <Button rounded="full" colorScheme="purple" variant="ghost">
              Widgets
            </Button>
          </Link>
          <Button rounded="full" colorScheme="purple" variant="ghost">Sign Up</Button>
          <Button rounded="full" colorScheme="purple" variant="ghost">Log in</Button>
          <DarkModeSwitch />
        </ButtonGroup>
      </Stack>
    </Container>
  )
}

export default Navbar
