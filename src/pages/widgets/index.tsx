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
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { HiDotsVertical, HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import { FiCopy, FiEdit2, FiList, FiTrash2 } from 'react-icons/fi'
import { useRef } from 'react'
import useFetchWidgets from '@hooks/queries/widget/useFetchWidgets'
import useDeleteWidget from '@hooks/mutations/widget/useDeleteWidget'
import useCreateWidget from '@hooks/mutations/widget/useCreateWidget'
import Head from 'next/head'
import { Widget } from '@globalStates/Interfaces'
import ResponseToast from '@components/global/ResponseToast'
import useUpdateWidgetStatus from '@hooks/mutations/widget/useUpdateWidgetStatus'

const Widgets = () => {
  const { widgets, isWidgetFetching } = useFetchWidgets()
  const { deleteWidget, isWidgetDeleting } = useDeleteWidget()
  const { createWidget, isWidgetCreating } = useCreateWidget()
  const { updateWidgetStatus, isWidgetStatusUpdating } = useUpdateWidgetStatus()
  const toast = useToast({ isClosable: true })

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

  const handleStatusChange = async (isChecked: boolean, widgetId: string) => {
    const response: any = await updateWidgetStatus(widgetId, isChecked)
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget status updated.' })
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
                    {(isWidgetFetching || isWidgetStatusUpdating) && <Spinner />}
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
                  <Switch
                    aria-label="Switch widget status"
                    disabled={isWidgetStatusUpdating}
                    isChecked={widget.status}
                    colorScheme="purple"
                    mr="2"
                    onChange={(e) => handleStatusChange(e.target.checked, widget.id)}
                  />
                  <Menu>
                    <MenuButton isRound={true} as={IconButton} aria-label="Options" icon={<HiDotsVertical />} />
                    <MenuList shadow="lg">
                      <Link href={`/widgets/${widget.id}`}>
                        <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                      </Link>
                      {/* <MenuItem icon={<FiCopy />}>Duplicate</MenuItem> */}
                      <Link href={`/responses/${widget.id}`}>
                        <MenuItem icon={<FiList />}>Responses</MenuItem>
                      </Link>
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
