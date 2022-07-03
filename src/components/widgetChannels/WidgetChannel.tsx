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
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useAtom } from 'jotai'
import { DragHandleIcon } from '@chakra-ui/icons'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { editWidgetChannelIdAtom } from '@globalStates/atoms'
import EditChannel from '@components/widgetChannels/EditChannel'
import useDeleteWidgetChannel from '@hooks/mutations/widgetChannel/useDeleteWidgetChannel'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const WidgetChannelType = ({ widgetChannel, ...props }) => {
  const tempWidgetChannelId = useRef('')
  const [, setEditWidgetChannelId] = useAtom(editWidgetChannelIdAtom)
  const brandColorToggle = useColorModeValue('purple.500', 'purple.200')
  const channelColorToggle = useColorModeValue('white', 'gray.800')
  const { deleteWidgetChannel, isWidgetChannelDeleting } = useDeleteWidgetChannel()
  const { isOpen: isOpenEditModal, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id: widgetChannel.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    touchAction: 'pinch-zoom',
  }

  return (
    <>
      <HStack
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        p={3}
        w={'full'}
        rounded="md"
        style={style}
        borderWidth={1}
        bg={channelColorToggle}
        shadow={props.shadow || 'none'}
        cursor={props.cursor || 'grab'}
        justifyContent={'space-between'}
      >
        <HStack>
          <Flex justifyContent={'center'} alignItems={'center'} w={[6, 8]}>
            <DragHandleIcon />
          </Flex>
          <Text _hover={{ color: brandColorToggle }} ml="2" cursor="pointer" display="inline-block" onClick={onOpenEditModal(widgetChannel.id)}>
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
            <Button onClick={handleDeleteWidgetChannel} isLoading={isWidgetChannelDeleting} loadingText="Deleting..." colorScheme="red" shadow={'md'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WidgetChannelType
