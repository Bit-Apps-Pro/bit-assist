import { VStack, Input, HStack, Spinner, Text } from '@chakra-ui/react'
import useFetchChannels from '@hooks/queries/channel/useFetchChannels'
import SingleChannel from '@components/widgetChannels/SingleChannel'
import { Channel } from '@globalStates/Interfaces'
import { useState } from 'react'

const ChannelSelect = () => {
  const [filter, setFilter] = useState('')
  const { channels, isChannelFetching } = useFetchChannels()
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    setFilteredChannels(channels?.filter((channel: Channel) => channel.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <VStack spacing="4">
      <Input value={filter} placeholder="Search channels" onChange={handleFilterChange} />

      {isChannelFetching && <Spinner />}

      <HStack flexWrap="wrap" spacing="0" gap="3">
        {filter.length
          ? filteredChannels?.map((channel: Channel) => <SingleChannel key={channel.id} channel={channel} />)
          : channels?.map((channel: Channel) => <SingleChannel key={channel.id} channel={channel} />)}

        {!isChannelFetching && (channels?.length === 0 || (filter.length && filteredChannels?.length === 0)) && (
          <Text color="gray.500" fontSize="md">
            No channels found
          </Text>
        )}
      </HStack>
    </VStack>
  )
}

export default ChannelSelect
