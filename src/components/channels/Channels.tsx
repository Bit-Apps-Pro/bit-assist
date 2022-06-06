import { Box } from '@chakra-ui/react'
import AddChannel from '@components/channels/AddChannel'
import ChannelsList from '@components/channels/ChannelsList'

const Channels = () => {
  return (
    <Box>
      <AddChannel />
      <ChannelsList />
    </Box>
  )
}

export default Channels
