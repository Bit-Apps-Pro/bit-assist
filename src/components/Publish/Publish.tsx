/* eslint-disable react/no-children-prop */
import { Badge, Box, Code, HStack, Text, VStack } from '@chakra-ui/react'
import Domains from './Domains'

const Publish = () => {
  return (
    <VStack gap="10" alignItems="flex-start">
      <Box>
        <HStack mb="4">
          <Badge fontSize="0.85em" colorScheme="teal">1</Badge>
          <Text fontWeight="semibold">Add Bit Chaty to your website</Text>
        </HStack>
        <Text mb="2">
          Bit Chaty can easily be installed using the below code snippet. Paste
          it just above the <Code children="</body>" /> tag.
        </Text>
        <Code children="<script async defer src='https://cdn.bitapps.pro/bit-chaty.js'></script>"></Code>
      </Box>

      <Box>
        <HStack mb="4">
          <Badge fontSize="0.85em" colorScheme="teal">2</Badge>
          <Text fontWeight="semibold">Add Bit Chaty to your website</Text>
        </HStack>
        <Domains />
      </Box>
    </VStack>
  )
}

export default Publish
