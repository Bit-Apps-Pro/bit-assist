import InitialDelay from '@components/Settings/InitialDelay'
import PageScroll from '@components/Settings/PageScroll'
import Title from '@components/Global/Title'
import { Box, VStack } from '@chakra-ui/react'

const Trigger = () => {
  return (
    <Box>
      <Title>Trigger Widget</Title>
      <VStack alignItems="flex-start">
        <InitialDelay />
        <PageScroll />
      </VStack>
    </Box>
  )
}

export default Trigger
