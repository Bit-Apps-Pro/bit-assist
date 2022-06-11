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
  Spinner,
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
import EditChannel from '@components/widgetChannels/EditChannel'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { flowAtom } from '@globalStates/atoms'

const ChannelsList = () => {
  const { widgetChannels, isWidgetChannelsFetching } = useFetchWidgetChannels()
  const { deleteWidgetChannel, isWidgetChannelDeleting } = useDeleteWidgetChannel()
  const queryClient = useQueryClient()
  const [flow, setFlow] = useAtom(flowAtom)

  const router = useRouter()
  const { id } = router.query

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEditModal, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure()
  const tempWidgetChannelId = useRef('')

  const onOpenEditModal = (channelId: string) => () => {
    const widgetChannelCache = queryClient.getQueryData(['/api/widgetChannel/fetch', id?.toString()])
    if (widgetChannelCache?.success) {
      const editFlow = widgetChannelCache?.data.find((channel: WidgetChannel) => channel.channel_id === channelId)
      editFlow.channel_name = 'whatsapp'
      setFlow(editFlow)
      openEditModal()
    }
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
      {widgetChannels?.length > 0 && (
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
                          <MenuItem icon={<FiEdit2 />} onClick={onOpenEditModal(widgetChannel.channel_id)}>
                            Edit
                          </MenuItem>
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

          <EditChannel isOpen={isOpenEditModal} onOpen={openEditModal} onClose={closeEditModal} />

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
