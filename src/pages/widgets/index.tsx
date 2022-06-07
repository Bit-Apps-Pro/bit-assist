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
  Spinner,
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
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgets from '@hooks/queries/widget/useFetchWidgets'
import useDeleteWidget from '@hooks/mutations/widget/useDeleteWidget'
import useCreateWidget from '@hooks/mutations/widget/useCreateWidget'
import Head from 'next/head'

const Widgets = () => {
  const { widgets, isWidgetFetching } = useFetchWidgets()
  const { deleteWidget, isWidgetDeleting } = useDeleteWidget()
  const { createWidget, isWidgetCreating } = useCreateWidget()

  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
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
      <Head>
        <title>Widgets</title>
        <meta name="description" content="Bit Assist" />
        <meta name="keywords" content="BitCode, Bit, Code, Bit Assist, Assist, Bit Form, Form, Bit Integrations, Integrations, Bit Flow, Flow" />
      </Head>
      <TableContainer borderWidth="1px" rounded="lg" shadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th colSpan={2}>
                <HStack justifyContent={'space-between'}>
                  <HStack>
                    <Heading as="h2" size="sm" textTransform="none" my="2">
                      Widgets List
                    </Heading>
                    {isWidgetFetching && <Spinner />}
                  </HStack>
                  <Button
                    onClick={addNewWidget}
                    isLoading={isWidgetCreating}
                    loadingText="Creating..."
                    variant="outline"
                    spinnerPlacement="start"
                    colorScheme="gray"
                    leftIcon={<HiPlus />}
                  >
                    Add Widget
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
                    <MenuButton isRound={true} as={IconButton} aria-label="Options" icon={<HiDotsVertical />} />
                    <MenuList shadow="lg">
                      <Link href={`/widgets/${widget.id}`}>
                        <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                      </Link>
                      <MenuItem icon={<FiCopy />}>Duplicate</MenuItem>
                      <MenuItem icon={<FiTrash2 />} color="red.600" onClick={openDeleteModal(widget.id)}>
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
          <ModalCloseButton disabled={isWidgetDeleting} />
          <ModalBody>Are you sure want to delete this widget?</ModalBody>

          <ModalFooter>
            <Button disabled={isWidgetDeleting} mr={3} onClick={closeDelModal}>
              Cancel
            </Button>
            <Button onClick={handleDeleteWidget} isLoading={isWidgetDeleting} loadingText="Deleting..." colorScheme="red" shadow={'md'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Widgets
