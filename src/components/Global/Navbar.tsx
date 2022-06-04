import { ChevronDownIcon } from '@chakra-ui/icons'
import {
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
import { userState } from '@globalStates/atoms'
import { deleteCookie } from '@utils/helper'
import { CURRENT_DOMAIN, SUBSCRIPTION_CLIENT_URL } from 'app.config'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DarkModeSwitch } from './DarkModeSwitch'

const Navbar = () => {
  const [user, setUser] = useAtom(userState)
  const router = useRouter()
  const signInUrl = encodeURI(`${SUBSCRIPTION_CLIENT_URL}/login?product=chaty&redirect=${CURRENT_DOMAIN + router.asPath}`)

  const signOut = () => () => {
    deleteCookie('bit-usr')
    deleteCookie('bit')
    setUser({})
    router.push('/')
  }

  return (
    <Container maxW={'container.lg'} >
      <Flex py="4">
        <Box py="2">
          <Heading size="md"><Link href={'/'}>Bit Chaty</Link></Heading>
        </Box>
        <Spacer />
        <ButtonGroup>
          {
            Boolean(Object.keys(user).length) && (
              <Link href={'/widgets'}>
                <Button rounded="full" colorScheme="teal" variant="ghost">
                  Widgets
                </Button>
              </Link>
            )
          }

          {
            !Boolean(Object.keys(user).length) && (
              <Link href={signInUrl}>
                <Button rounded="full" colorScheme="teal" variant="ghost">
                  Sign In
                </Button>
              </Link>
            )
          }
          {
            Boolean(Object.keys(user).length) && (
              <Menu>
                <MenuButton rounded="full" colorScheme="teal" variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
                  {user?.name}
                </MenuButton>
                <MenuList boxShadow="md">
                  <Link href={`${SUBSCRIPTION_CLIENT_URL}/Profile`}>
                    <a target="_blank" href={`${SUBSCRIPTION_CLIENT_URL}/Profile`} rel="noopener noreferrer">
                      <MenuItem>Profile</MenuItem>
                    </a>
                  </Link>
                  <MenuDivider />
                  <Link href={SUBSCRIPTION_CLIENT_URL}>
                    <a target="_blank" href={SUBSCRIPTION_CLIENT_URL} rel="noopener noreferrer">
                      <MenuItem>Go to Subscription</MenuItem>
                    </a>
                  </Link>
                  {/* <MenuItem onClick={()=> router.push('/profile')}>Go to Subscription</MenuItem> */}
                  <MenuItem onClick={signOut()}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            )
          }
          <DarkModeSwitch />
        </ButtonGroup>
      </Flex>
    </Container>
  )
}

export default Navbar
