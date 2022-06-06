import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import ChannelSelect from '@components/channels/ChannelSelect'
import ChannelSettings from '@components/channels/ChannelSettings'
import { useAtom } from 'jotai'
import { flowAtom } from '@globalStates/atoms'
import { HiPlus } from 'react-icons/hi'

const AddChannel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [flow] = useAtom(flowAtom)

  return (
    <>
      <Button mb="4" variant="outline" colorScheme="gray" leftIcon={<HiPlus />} onClick={onOpen}>
        Add Channel
      </Button>

      <Modal scrollBehavior="inside" size="2xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="4">
            {flow.step === 1 && <ChannelSelect />}
            {flow.step === 2 && <ChannelSettings />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddChannel
