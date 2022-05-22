import {
  Button,
  Heading,
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
import { HiDotsVertical } from 'react-icons/hi'
import Link from 'next/link'
import { serializeObj } from '@utils/utils'
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgets from '@hooks/queries/useFetchWidgets'
import db from '@db'
import useDeleteWidget from '@hooks/mutations/useDeleteWidget'
import useCreateWidget from '@hooks/mutations/useCreateWidget'

export async function getServerSideProps(context) {

  const { widgets } = await db.users.findUnique({
    where: { id: '628626c4aeedcb3965aa667b' },
    select: { widgets: true },
  })

  return {
    props: { widgetsFromServer: serializeObj(widgets) },
  }
}

const Widgets = ({ widgetsFromServer }) => {
  const { widgets, isWidgetFetching } = useFetchWidgets(widgetsFromServer)
  const { deleteWidget, isWidgetDeleting } = useDeleteWidget()
  const { createWidget, isWidgetCreating } = useCreateWidget()

  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
  const tempWidgetId = useRef(0)

  const openDeleteModal = (widgetId) => () => {
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

  return (
    <>
      <TableContainer borderWidth="1px" rounded="lg" shadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Heading as="h2" size="sm" textTransform="none" my="2">Widgets</Heading>
                <button onClick={addNewWidget}>+</button>
              </Th>
              <Th/>
            </Tr>
          </Thead>
          <Tbody>
            {widgets?.map((wid, i: number) => (
              <Tr key={wid.id}>
                <Td><Link href={`/widgets/${i}`}>{wid.name}</Link></Td>

                <Td textAlign="right">
                  <Menu>
                    <MenuButton
                      isRound={true}
                      as={IconButton}
                      aria-label="Options"
                      icon={<HiDotsVertical />}
                    />
                    <MenuList shadow="lg">
                      <Link href={`/widgets/${i}`}>
                        <MenuItem gap="3">
                          <FiEdit2 />Edit
                        </MenuItem>
                      </Link>
                      <MenuItem gap="3"><FiCopy />Duplicate</MenuItem>
                      <MenuItem onClick={openDeleteModal(wid.id)} gap="3" color="red.600"><FiTrash2 />Delete</MenuItem>
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
          <ModalBody>
            Are you sure want to delete this widget?
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={closeDelModal}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteWidget}
              isLoading={isWidgetDeleting}
              loadingText="Deleting"
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
