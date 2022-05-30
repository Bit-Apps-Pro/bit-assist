import { Box, Button, FormControl, FormLabel, Input, Skeleton, Text } from '@chakra-ui/react'
import { userState } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

interface FormErrorType {
  name?: string,
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
      session,
      env: {
        SUBSCRIPTION_URL: process.env.SUBSCRIPTION_URL
      }
    }
  }
}

export default function SignUp({ csrfToken, env }) {
  const { status, data: session } = useSession()
  const [, setUser] = useAtom(userState)
  const [signUpCredential, setSignUpCredential] = useState({ name: '', email: '', password: '' })
  const [formError, setFormError] = useState<FormErrorType>({})
  const router = useRouter()

  if (status === 'authenticated') {
    router.push('/widgets')
    return <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton borderRadius="50px" height="40px" />
    </Box>
  }

  const handleSignUp = async () => {
    const checkIsInputEmpty = isInputEmty()
    if (checkIsInputEmpty) return false

    const checkEmailValidate = isEmailValid(signUpCredential.email)
    if (!checkEmailValidate) return false

    let verificationCode = Math.floor(Math.random() * Math.floor(999999))
    const tmpUserId = new Date().getTime().toString() + verificationCode

    const userDetails = { tmpUserId, ...signUpCredential }
    const url = `${env.SUBSCRIPTION_URL}signup`
    const method = 'post'

    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())

    console.log({ res })
    if (res.error) setFormError({ email: res.error })

    if (res.success) {
      setUser(userDetails)
      const encryptUserData = btoa(JSON.stringify(userDetails))
      sessionStorage.setItem('userDetails', encryptUserData)
      router.push('./verification')
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    signUpCredential[name] = value
    setSignUpCredential({ ...signUpCredential })
  }

  const isEmailValid = (email: string) => {
    const emailRegx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'gi')
    const checkIsValid = email.match(emailRegx)
    if (!checkIsValid) setFormError(prevFormError => {
      delete prevFormError['email']
      return { email: 'Please, Enter a valid email', ...prevFormError }
    })
    return checkIsValid
  }

  const isInputEmty = () => {
    let isInputEmty = false
    setFormError({})
    if (signUpCredential.name.length === 0) {
      isInputEmty = true
      setFormError(prevError => {
        delete prevError['name']
        return { name: 'Name must require', ...prevError }
      })
    }

    if (signUpCredential.email.length === 0) {
      isInputEmty = true
      setFormError(prevError => {
        delete prevError['email']
        return { email: 'Email must require', ...prevError }
      })
    }

    if (signUpCredential.password.length === 0) {
      isInputEmty = true
      setFormError(prevError => {
        delete prevError['password']
        return { password: 'Password must require', ...prevError }
      })
    }
    return isInputEmty
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          isInvalid={'name' in formError}
          errorBorderColor="crimson"
          onChange={handleInput}
          value={signUpCredential.name}
          placeholder="Enter your name"
        />
        {formError.name && <Text mt="1" fontSize="xs" color="crimson">{formError.name}</Text>}
      </FormControl>
      <br />
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          isInvalid={'email' in formError}
          errorBorderColor="crimson"
          onChange={handleInput}
          value={signUpCredential.email}
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
          isInvalid={'password' in formError}
          errorBorderColor="crimson"
          onChange={handleInput}
          value={signUpCredential.password}
          placeholder="Enter your password"
        />
        {formError.password && <Text mt="1" fontSize="xs" color="crimson">{formError.password}</Text>}
      </FormControl>
      <br />
      <Button onClick={handleSignUp} type="button" size="md" width="100%">
        Sign Up
      </Button>
    </Box>
  )
}