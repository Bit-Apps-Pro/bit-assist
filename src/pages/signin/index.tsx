import { getCsrfToken, getProviders, getSession, signIn, useSession } from 'next-auth/react'
import { Box, Button, FormControl, FormLabel, Input, Skeleton, Stack, Text } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { deleteCookie, setCookie } from '@utils/cookies'

interface FormErrorType {
  email?: string,
  password?: string,
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        parmanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default function SignIn({ csrfToken }) {
  const { status, data: session } = useSession()
  const [loginCredential, setLoginCredential] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState<FormErrorType>({})
  const [authErrorMsg, setAuthErrorMsg] = useState(false)
  const router = useRouter()
  console.log({ status, session })

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.token) {
      setCookie('bit', btoa(session.user?.token), 30)
      setCookie('bit-usr', btoa(btoa(unescape(encodeURIComponent(JSON.stringify(session.user))))), 30) 
    }
    if (status === 'unauthenticated') {
      deleteCookie('bit')
      deleteCookie('bit-usr')
    }
  }, [session])

  if (status === 'authenticated') {
    Router.push('/profile')
    return <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton borderRadius="50px" height="40px" />
    </Box>
  }

  const handleSignIn = async () => {
    setAuthErrorMsg(false)
    const checkEmailValidate = isEmailValid(loginCredential.email)
    if (!checkEmailValidate) return false

    const signInWithCredential = await signIn('credentials', { redirect: false, ...loginCredential })
    console.log({ signInWithCredential, session })

    if (signInWithCredential.error) setAuthErrorMsg(true)
    // if (data.auth.token) {
    //   setCookie('bit', btoa(data.auth.token), 30)        
    //   localStorage.setItem(
    //     'bit-usr',
    //     btoa(btoa(unescape(encodeURIComponent(JSON.stringify(data.auth.user)))))
    //   )
    //   history.push('/')
    // }
    // if (!signInWithCredential.error) router.push('/profile')
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    loginCredential[name] = value
    setLoginCredential({ ...loginCredential })
  }

  const isEmailValid = (email: string) => {
    delete formError['email']
    setFormError({ ...formError })

    const emailRegx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'gi')
    const checkIsValid = email.match(emailRegx)
    if (!checkIsValid) setFormError({ email: 'Please, Enter a valid email' })
    return checkIsValid
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {authErrorMsg && <Text mb="1" fontSize="sm" color="crimson" textAlign="center">Invalid email or password</Text>}
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          isInvalid={'email' in formError}
          errorBorderColor="crimson"
          onChange={handleInput}
          value={loginCredential.email}
          placeholder="Enter your email"
        />
        {formError.email && <Text mt="1" fontSize="xs" color="crimson">{formError.email}</Text>}
      </FormControl>
      <br />
      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          name="password"
          onChange={handleInput}
          value={loginCredential.password}
          placeholder="Enter your password"
        />
      </FormControl>
      <br />
      <Button onClick={handleSignIn} type="button" size="md" width="100%">
        Sign In
      </Button>
    </Box>
  )
}


