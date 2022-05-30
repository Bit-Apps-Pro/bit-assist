import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import { getCsrfToken, getProviders, getSession, signIn, useSession } from 'next-auth/react'
import { Box, Button, FormControl, FormLabel, Input, Skeleton, Stack, Text } from '@chakra-ui/react'
import Router, { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { userState } from '@globalStates/atoms'
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
        destination: '/widgets',
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

export default function Verification({ csrfToken, env }) {
  const { status, data: session } = useSession()
  const [user, setUser] = useAtom(userState)
  const [verificationCredential, setVerificationCredential] = useState('')
  const [errorMessage, setErroMessage] = useState('')
  const router = useRouter()
  console.log('from verify', {session})
  useEffect(() => {
    const getUser = sessionStorage.getItem('userDetails')
    const decryptUserData = atob(getUser)
    const parseUserJsonData = JSON.parse(decryptUserData)
    setUser(parseUserJsonData)

    if (status === 'authenticated' && session?.user?.token) {
      setCookie('bit', btoa(session.user?.token), 30)
      setCookie('bit-usr', btoa(btoa(unescape(encodeURIComponent(JSON.stringify(session.user))))), 30) 
    }
  }, [])

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
    router.push('/widgets')
    return <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton height="20px" width="50%" mb="5px" />
      <Skeleton height="40px" mb="15px" />
      <Skeleton borderRadius="50px" height="40px" />
    </Box>
  }

  const handleVerify = async () => {
    setErroMessage('')
    if (!Boolean(verificationCredential.length)) {
      setErroMessage('Verify code must require')
      return false
    }

    const url = `${env.SUBSCRIPTION_URL}verify-email-verification-code`
    const method = 'post'
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify({ code: verificationCredential, ...user }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())

    if (res.error) setErroMessage(res.error)
    if (res.success) {
      const signInWithCredential = await signIn('credentials', { redirect: false, ...user })

      if (signInWithCredential.error) setErroMessage(signInWithCredential.error)
      sessionStorage.removeItem('userDetails')
      if (!signInWithCredential.error) router.push('/profile')
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCredential(e.target.value)
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {Boolean(errorMessage.length) && <Text mb="4" fontSize="sm" color="crimson" textAlign="center">{errorMessage}</Text>}
      <FormControl isRequired>
        <FormLabel htmlFor="verificationCode">Verification Code</FormLabel>
        <Input
          id="verificationCode"
          name="verificationCode"
          isInvalid={Boolean(errorMessage.length)}
          errorBorderColor="crimson"
          onChange={handleInput}
          value={verificationCredential}
          placeholder="Enter your password"
        />
      </FormControl>
      <br />
      <Button onClick={handleVerify} type="button" size="md" width="100%">
        Verify
      </Button>
    </Box>
  )
}


