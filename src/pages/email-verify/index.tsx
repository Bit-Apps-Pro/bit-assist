import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

export default function EmailVerify() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mx="auto" mt="20">
      {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
      <FormControl isRequired>
        <FormLabel htmlFor="name">Verification code</FormLabel>
        <Input
          id="verification"
          name="emailVerification"
          errorBorderColor="crimson"
          placeholder="Enter verification code"
        />
        <br />
        <Button onClick={handleSignUp} type="button" size="md" width="100%">
          Sign Up
        </Button>
      </FormControl>
    </Box>
  )
}