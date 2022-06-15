import {
  Button,
  Heading,
  HStack,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { HiDotsVertical, HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import { serializeObj } from '@utils/utils'
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgets from '@hooks/queries/useFetchWidgets'
import db from '@db'
import useDeleteWidget from '@hooks/mutations/useDeleteWidget'
import useCreateWidget from '@hooks/mutations/useCreateWidget'

const Widgets = ({ widgetsFromServer }) => {
  const { widgets, isWidgetFetching } = useFetchWidgets()
  const { deleteWidget, isWidgetDeleting } = useDeleteWidget()
  const { createWidget, isWidgetCreating } = useCreateWidget()

  const {
    isOpen,
    onOpen: openDelModal,
    onClose: closeDelModal,
  } = useDisclosure()
  const tempWidgetId = useRef('')

  const openDeleteModal = (widgetId: string) => () => {
    tempWidgetId.current = widgetId
    openDelModal()
  }

  const handleDeleteWidget = async () => {
    await deleteWidget(tempWidgetId.current)
    closeDelModal()
  }

  const addNewWidget = () => {
    createWidget()
  }

  interface Widget {
    id: string
    name: string
  }

  return (
    <>
      <TableContainer borderWidth="1px" rounded="lg" shadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th colSpan={2}>
                <HStack justifyContent={'space-between'}>
                  <Heading as="h2" size="sm" textTransform="none" my="2">
                    Widgets List
                  </Heading>
                  <Button
                    onClick={addNewWidget}
                    isLoading={isWidgetCreating}
                    loadingText="Creating..."
                    spinnerPlacement="start"
                    colorScheme="teal"
                    shadow="md"
                    rounded="full"
                    leftIcon={<HiPlus />}
                  >
                    Add New Widget
                  </Button>
                </HStack>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {widgets?.map((widget: Widget) => (
              <Tr key={widget.id}>
                <Td>
                  <Link href={`/widgets/${widget.id}`}>{widget.name}</Link>
                </Td>
                <Td textAlign="right">
                  <Menu>
                    <MenuButton
                      isRound
                      as={IconButton}
                      aria-label="Options"
                      icon={<HiDotsVertical />}
                    />
                    <MenuList shadow="lg">
                      <Link href={`/widgets/${widget.id}`}>
                        <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                      </Link>
                      <MenuItem icon={<FiCopy />}>Duplicate</MenuItem>
                      <MenuItem
                        icon={<FiTrash2 />}
                        color="red.600"
                        onClick={openDeleteModal(widget.id)}
                      >
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

      <Modal isOpen={isOpen} onClose={closeDelModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to delete this widget?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={closeDelModal}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteWidget}
              isLoading={isWidgetDeleting}
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
  )
}

export default Widgets

// export async function getServerSideProps(context) {
//   const { widgets } = await db.users.findUnique({
//     where: { id: '628626c4aeedcb3965aa667b' },
//     select: { widgets: true },
//   })

//   return {
//     props: { widgetsFromServer: serializeObj(widgets) },
//   }
// }
