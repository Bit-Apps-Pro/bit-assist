import {
  Button,
  Checkbox,
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
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import Head from 'next/head'
import { WidgetResponse } from '@globalStates/Interfaces'
import useFetchResponses from '@hooks/queries/response/useFetchResponses'
import useDeleteResponses from '@hooks/mutations/response/useDeleteResponses'
import { serializeObj } from '@utils/utils'
import React, { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Pagination from '@components/global/Pagination'

const Responses = () => {
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { widgetResponses, isResponsesLoading, isFetching, isFetched } = useFetchResponses(pageLimit, pageNumber)
  const { deleteResponses, isResponsesDeleting } = useDeleteResponses()
  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
  const [checkedItems, setCheckedItems] = useState([])

  const handleDeleteWidget = async () => {
    await deleteResponses(checkedItems)
    setCheckedItems([])
    closeDelModal()
  }

  const convertDate = (date: any) => {
    const dateObj = new Date(date?.$date)
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, name]
      } else {
        return prev.filter((item) => item !== name)
      }
    })
  }

  const handleCheckAllBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCheckedItems(() => {
      if (checked) {
        return widgetResponses?.data?.map((item: WidgetResponse) => item.id)
      } else {
        return []
      }
    })
  }

  return (
    <>
      <Head>
        <title>Responses</title>
        <meta name="description" content="Bit Assist" />
        <meta name="keywords" content="BitCode, Bit, Code, Bit Assist, Assist, Bit Form, Form, Bit Integrations, Integrations, Bit Flow, Flow" />
      </Head>

      <Stack mb="4" h="8" direction={'row'}>
        <HStack>
          <Text as="h2" fontSize="lg" textTransform="none">
            Response List {widgetResponses?.widget?.name}
          </Text>
          {isResponsesLoading && <Spinner />}
        </HStack>
        {checkedItems.length && (
          <Box>
            <IconButton
              onClick={openDelModal}
              fontSize={'1rem'}
              size="sm"
              rounded="full"
              aria-label="Delete Icon"
              variant="ghost"
              icon={<FiTrash2 />}
              mr="2"
            />
            <Badge textTransform="lowercase">{checkedItems.length} items selected</Badge>
          </Box>
        )}
      </Stack>

      <TableContainer borderWidth="1px" rounded="lg" shadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th w="4">
                <Checkbox
                  colorScheme="purple"
                  isChecked={widgetResponses?.data?.length && widgetResponses?.data?.length === checkedItems?.length}
                  isIndeterminate={checkedItems?.length && checkedItems?.length < widgetResponses?.data?.length}
                  onChange={handleCheckAllBox}
                />
              </Th>
              <Th>Response</Th>
              <Th w="6">Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(widgetResponses?.data) &&
              widgetResponses?.data.map((widgetResponse: WidgetResponse, index: number) => (
                <Tr key={widgetResponse.id}>
                  <Td>
                    <Checkbox
                      colorScheme="purple"
                      name={widgetResponse.id}
                      isChecked={checkedItems.includes(widgetResponse.id)}
                      onChange={handleCheckboxChange}
                    />
                  </Td>
                  <Td>{serializeObj(widgetResponse.response)}</Td>
                  <Td>{convertDate(widgetResponse.createdAt)}</Td>
                </Tr>
              ))}
            {widgetResponses?.data?.length < 1 && (
              <Tr>
                <Td rowSpan={3}>No responses</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {!isResponsesLoading && (
        <HStack>
          <Pagination
            pageNumber={pageNumber}
            pageLimit={pageLimit}
            totalPages={Math.floor(widgetResponses?.totalResponses / pageLimit)}
            setPageNumber={setPageNumber}
            setPageLimit={setPageLimit}
          />

          {!isFetched && isFetching && (
            <Box  style={{ marginTop: '1rem' }}>
              <Spinner size="sm" />
            </Box>
          )}
        </HStack>
      )}

      <Modal isOpen={isOpen} onClose={closeDelModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton disabled={isResponsesDeleting} />
          <ModalBody>Are you sure want to delete selected responses?</ModalBody>

          <ModalFooter>
            <Button disabled={isResponsesDeleting} mr={3} onClick={closeDelModal}>
              Cancel
            </Button>
            <Button onClick={handleDeleteWidget} isLoading={isResponsesDeleting} loadingText="Deleting..." colorScheme="red" shadow={'md'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Responses
