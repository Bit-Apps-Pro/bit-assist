import { Box, VStack } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import DeleteResponses from '@components/Settings/DeleteResponses'
import StoreResponses from '@components/Settings/StoreResponses'

const Responses = () => {
  return (
    <Box>
      <Title>Responses</Title>
      <VStack alignItems="flex-start">
        <StoreResponses />
        <DeleteResponses />
      </VStack>
    </Box>
  )
}

export default Responses
