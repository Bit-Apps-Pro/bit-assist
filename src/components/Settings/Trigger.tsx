import InitialDelay from '@components/Settings/InitialDelay'
import PageScroll from '@components/Settings/PageScroll'
import Title from '@components/Global/Title'
import { Box } from '@chakra-ui/react'

const Trigger = () => {
  return (
    <Box>
      <Title>Trigger Widget</Title>
      <InitialDelay />
      <PageScroll />
    </Box>
  )
}

export default Trigger