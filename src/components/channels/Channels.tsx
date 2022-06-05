import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
  Text,
  HStack,
} from '@chakra-ui/react'
import Title from '@components/global/Title'
import React, { useState } from 'react'
import { FiFacebook } from 'react-icons/fi'
import { HiArrowRight } from 'react-icons/hi'
import { IoLogoWhatsapp } from 'react-icons/io5'

const Channels = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filteredChannels, setFilteredChannels] = useState([])
  const [channels] = useState([
    {
      name: 'Facebook',
      icon: <FiFacebook />,
    },
    {
      name: 'Whatsapp',
      icon: <IoLogoWhatsapp />,
    },
  ])

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredChannels(filteredChannels)
  }

  return (
    <Box>
      <Title>Channels</Title>
      <Button colorScheme="purple" onClick={onOpen}>
        Add New Channel
      </Button>

      <Modal scrollBehavior="inside" size="2xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <Input placeholder="Search channels" onChange={filterChannels} />

              <HStack flexWrap="wrap" spacing="0" gap="3">
                {filteredChannels.length ? (
                  filteredChannels.map((channel) => (
                    <VStack key={channel.name} shadow="sm" borderWidth={1} rounded="md" py="2" w="36" cursor="pointer">
                      {channel.icon}
                      <Text>{channel.name}</Text>
                    </VStack>
                  ))
                ) : (
                  <Text color="gray.500">Channel not found</Text>
                )}
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="purple" rightIcon={<HiArrowRight />}>
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Channels
