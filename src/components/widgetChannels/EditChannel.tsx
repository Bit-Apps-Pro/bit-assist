import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import ChannelSelect from '@components/widgetChannels/ChannelSelect'
import ChannelSettings from '@components/widgetChannels/ChannelSettings'
import { useAtom } from 'jotai'
import { flowAtom, resetFlowAtom } from '@globalStates/atoms'
import { HiPlus } from 'react-icons/hi'

const EditChannel = ({ isOpen, onOpen, onClose }) => {
  const [flow] = useAtom(flowAtom)
  const [, resetFlow] = useAtom(resetFlowAtom)

  const onModalClose = () => {
    onClose()
    resetFlow()
  }

  return (
    <>
      <Modal scrollBehavior="inside" size="2xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="4">
            <ChannelSettings />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditChannel
