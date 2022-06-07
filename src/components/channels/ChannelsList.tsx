import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgetChannels from '@hooks/queries/widgetChannel/useFetchWidgetChannels'
import useDeleteWidgetChannel from '@hooks/mutations/widgetChannel/useDeleteWidgetChannel'
import { WidgetChannel } from '@globalStates/Interfaces'

const ChannelsList = () => {
  const { widgetChannels, isWidgetChannelFetching } = useFetchWidgetChannels()
  const { deleteWidgetChannel, isWidgetChannelDeleting } = useDeleteWidgetChannel()

  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
  const tempWidgetChannelId = useRef('')

  const openDeleteModal = (widgetChannelId: string) => () => {
    tempWidgetChannelId.current = widgetChannelId
    openDelModal()
  }

  const handleDeleteWidgetChannel = async () => {
    await deleteWidgetChannel(tempWidgetChannelId.current)
    closeDelModal()
  }

  if (widgetChannels?.length === 0) {
    return <Text>Create new channel from here.</Text>
  }

  return (
    <>
      <TableContainer borderWidth="1px" rounded="lg">
        <Table variant="simple">
          <Tbody>
            {widgetChannels?.map((widgetChannel: WidgetChannel) => (
              <Tr key={widgetChannel.id}>
                <Td>{widgetChannel.config?.title}</Td>
                <Td textAlign="right">
                  <Menu>
                    <MenuButton isRound={true} as={IconButton} aria-label="Options" icon={<HiDotsVertical />} />
                    <MenuList shadow="lg">
                      {/* <Link href={`/widgetChannels/${widgetChannel.id}`}>
                        <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                      </Link> */}
                      <MenuItem icon={<FiCopy />}>Duplicate</MenuItem>
                      <MenuItem icon={<FiTrash2 />} color="red.600" onClick={openDeleteModal(widgetChannel.id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={closeDelModal} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton disabled={isWidgetChannelDeleting} />
          <ModalBody>Are you sure want to delete this channel?</ModalBody>

          <ModalFooter>
            <Button disabled={isWidgetChannelDeleting} mr={3} onClick={closeDelModal}>
              Cancel
            </Button>
            <Button onClick={handleDeleteWidgetChannel} isLoading={isWidgetChannelDeleting} loadingText="Deleting..." colorScheme="red" shadow={'md'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChannelsList
