import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import { SUBSCRIPTION_CLIENT_URL } from 'app.config'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DarkModeSwitch } from './DarkModeSwitch'


// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       env: {
//         SUBSCRIPTION_CLIENT_URL: process.env.SUBSCRIPTION_CLIENT_URL
//       }
//     }
//   }
// }

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <Container maxW={'container.lg'} >
      <Flex py="4">
        <Box py="2">
          <Heading size="md"><Link href={'/'}>Bit Chaty</Link></Heading>
        </Box>
        <Spacer />
        <ButtonGroup>
          <Link href={'/widgets'}>
            <Button rounded="full" colorScheme="teal" variant="ghost">
              Widgets
            </Button>
          </Link>
          <Link href={'/signup'}>
            <Button rounded="full" colorScheme="teal" variant="ghost">
              Sign Up
            </Button>
          </Link>
          <Link href={'/signin'}>
            <Button rounded="full" colorScheme="teal" variant="ghost">
              Sign In
            </Button>
          </Link>
          {session?.user && <Menu>
            <MenuButton rounded="full" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
              {session?.user.name}
            </MenuButton>
            <MenuList>
              <MenuItem icon={<Avatar size="xs" name={session?.user.name} />} onClick={() => router.push('/profile')}>Profile</MenuItem>
              <MenuDivider />
              <Link href={SUBSCRIPTION_CLIENT_URL}>
                <a target="_blank" href={SUBSCRIPTION_CLIENT_URL} rel="noopener noreferrer">
                  <MenuItem>Go to Subscription</MenuItem>
                </a>
              </Link>
              {/* <MenuItem onClick={()=> router.push('/profile')}>Go to Subscription</MenuItem> */}
              <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>}
          <DarkModeSwitch />
        </ButtonGroup>
      </Flex>
    </Container>
  )
}

export default Navbar
