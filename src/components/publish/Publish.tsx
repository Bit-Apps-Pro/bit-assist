/* eslint-disable react/no-children-prop */
import { Box, Code, Stack, Text } from '@chakra-ui/react'
import Title from '@components/global/Title'
import Domains from './Domains'

const Publish = () => {
  return (
    <Stack gap={[5, 10]}>
      <Box>
        <Title badge="1">Add Bit Assist to your website</Title>
        <Text mb="2">
          Bit Assist can easily be installed using the below code snippet. Paste it just above the <Code children="</body>" /> tag.
        </Text>
        <Code maxW="full" children="<script async defer src='https://cdn.bitapps.pro/bit-assist.js'></script>"></Code>
      </Box>

      <Box>
        <Title badge="2">Add Domains</Title>
        <Domains />
      </Box>
    </Stack>
  )
}

export default Publish
