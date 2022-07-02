import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
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
  VStack,
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
import { DragHandleIcon } from '@chakra-ui/icons'

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
          <VStack>
            {widgetChannels?.map((widgetChannel: WidgetChannel) => (
              <HStack w={'full'} justifyContent={'space-between'} p={3} borderWidth={1} rounded="md" key={widgetChannel.id}>
                <HStack>
                  <Flex justifyContent={'center'} alignItems={'center'} w={[6, 8]} cursor="grabbing">
                    <DragHandleIcon />
                  </Flex>
                  <Text
                    _hover={{ color: brandColorToggle }}
                    ml="2"
                    cursor="pointer"
                    display="inline-block"
                    onClick={onOpenEditModal(widgetChannel.id)}
                  >
                    {widgetChannel.config?.title}
                  </Text>
                </HStack>
                <Box textAlign="right">
                  <ButtonGroup>
                    <Tooltip label="Edit">
                      <IconButton isRound aria-label="Edit Channel" icon={<FiEdit2 />} variant="ghost" onClick={onOpenEditModal(widgetChannel.id)} />
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
                </Box>
              </HStack>
            ))}
          </VStack>

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
