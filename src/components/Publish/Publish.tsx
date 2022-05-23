/* eslint-disable react/no-children-prop */
import { Box, Code, Text, VStack } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import Domains from './Domains'

const Publish = (props) => {
  return (
    <VStack gap="10" alignItems="flex-start">
      <Box>
        <Title badge="1">Add Bit Chaty to your website</Title>
        <Text mb="2">
          Bit Chaty can easily be installed using the below code snippet. Paste
          it just above the <Code children="</body>" /> tag.
        </Text>
        <Code children="<script async defer src='https://cdn.bitapps.pro/bit-chaty.js'></script>"></Code>
      </Box>

      <Box>
        <Title badge="2">Add Domains</Title>
        <Domains />
      </Box>
    </VStack>
  )
}

export default Publish
