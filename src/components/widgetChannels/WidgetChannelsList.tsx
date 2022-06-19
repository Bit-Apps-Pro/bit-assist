import {
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgetChannels from '@hooks/queries/widgetChannel/useFetchWidgetChannels'
import useDeleteWidgetChannel from '@hooks/mutations/widgetChannel/useDeleteWidgetChannel'
import { WidgetChannel } from '@globalStates/Interfaces'
import EditChannel from '@components/widgetChannels/EditChannel'
import { useAtom } from 'jotai'
import { editWidgetChannelIdAtom } from '@globalStates/atoms'

const ChannelsList = () => {
  const { widgetChannels, isWidgetChannelsFetching } = useFetchWidgetChannels()
  const { deleteWidgetChannel, isWidgetChannelDeleting } = useDeleteWidgetChannel()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEditModal, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure()
  const tempWidgetChannelId = useRef('')
  const [, setEditWidgetChannelId] = useAtom(editWidgetChannelIdAtom)
  const brandColorToggle = useColorModeValue('purple.500', 'purple.200')

  const onOpenEditModal = (widgetChannelId: string) => () => {
    setEditWidgetChannelId(widgetChannelId)
    openEditModal()
  }

  const openDeleteModal = (widgetChannelId: string) => () => {
    tempWidgetChannelId.current = widgetChannelId
    onOpen()
  }

  const handleDeleteWidgetChannel = async () => {
    await deleteWidgetChannel(tempWidgetChannelId.current)
    onClose()
  }

  return (
    <>
      {isWidgetChannelsFetching && <Spinner />}
      {widgetChannels?.length < 1 && <Text>Create new channel from here.</Text>}
      {!!widgetChannels?.length && (
        <>
          <TableContainer borderWidth="1px" rounded="lg">
            <Table variant="simple">
              <Tbody>
                {widgetChannels?.map((widgetChannel: WidgetChannel) => (
                  <Tr key={widgetChannel.id}>
                    <Td>
                      <Text _hover={{ color: brandColorToggle }} cursor="pointer" display="inline-block" onClick={onOpenEditModal(widgetChannel.id)}>
                        {widgetChannel.config?.title}
                      </Text>
                    </Td>
                    <Td textAlign="right">
                      <ButtonGroup>
                        <Tooltip label="Edit">
                          <IconButton
                            isRound
                            aria-label="Edit Channel"
                            icon={<FiEdit2 />}
                            variant="ghost"
                            onClick={onOpenEditModal(widgetChannel.id)}
                          />
                        </Tooltip>
                        <Tooltip label="Delete">
                          <IconButton
                            isRound
                            aria-label="Delete Channel"
                            icon={<FiTrash2 />}
                            variant="ghost"
                            colorScheme="red"
                            onClick={openDeleteModal(widgetChannel.id)}
                          />
                        </Tooltip>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <EditChannel isOpen={isOpenEditModal} onClose={closeEditModal} />

          <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalCloseButton disabled={isWidgetChannelDeleting} />
              <ModalBody>Are you sure want to delete this channel?</ModalBody>

              <ModalFooter>
                <Button disabled={isWidgetChannelDeleting} mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteWidgetChannel}
                  isLoading={isWidgetChannelDeleting}
                  loadingText="Deleting..."
                  colorScheme="red"
                  shadow={'md'}
                >
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}

export default ChannelsList
