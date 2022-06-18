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
import React, { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Pagination from '@components/global/Pagination'
import useFetchOthersData from '@hooks/queries/response/useFetchOthersData'

const Responses = () => {
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { othersData, isOthersDataLoading } = useFetchOthersData()
  const { widgetResponses, isResponsesLoading, isFetching, isFetched } = useFetchResponses(pageLimit, pageNumber)
  const { deleteResponses, isResponsesDeleting } = useDeleteResponses(pageLimit, pageNumber)
  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
  const [checkedItems, setCheckedItems] = useState([])

  const handleDeleteWidget = async () => {
    await deleteResponses(checkedItems)
    setCheckedItems([])
    closeDelModal()
  }

  const convertDate = (date: string) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, responseId: string) => {
    const { checked } = e.target
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, responseId]
      } else {
        return prev.filter((item) => item !== responseId)
      }
    })
  }

  const handleCheckAllBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCheckedItems(() => {
      if (checked) {
        return widgetResponses?.map((item: WidgetResponse) => item.id)
      } else {
        return []
      }
    })
  }

  useEffect(() => {
    if (checkedItems?.length < 1) return
    setCheckedItems([])
  }, [pageNumber, pageLimit])

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
            Response List {othersData?.widget?.name}
          </Text>
          {isResponsesLoading && <Spinner />}
        </HStack>
        {checkedItems?.length && (
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
                  isChecked={widgetResponses?.length && widgetResponses?.length === checkedItems?.length}
                  isIndeterminate={checkedItems?.length && checkedItems?.length < widgetResponses?.length}
                  onChange={handleCheckAllBox}
                />
              </Th>
              <Th>Response</Th>
              <Th w="6">Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(widgetResponses) &&
              widgetResponses.map((widgetResponse: WidgetResponse) => (
                <Tr key={widgetResponse.id}>
                  <Td>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={checkedItems.includes(widgetResponse.id)}
                      onChange={(e) => handleCheckboxChange(e, widgetResponse.id)}
                    />
                  </Td>
                  <Td>{serializeObj(widgetResponse.response)}</Td>
                  <Td>{convertDate(widgetResponse.createdAt)}</Td>
                </Tr>
              ))}
            {widgetResponses?.length < 1 && (
              <Tr>
                <Td rowSpan={3}>No responses</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {!isResponsesLoading && (
        <Pagination
          pageNumber={pageNumber}
          pageLimit={pageLimit}
          totalPages={Math.floor(othersData?.totalResponses / pageLimit)}
          setPageNumber={setPageNumber}
          setPageLimit={setPageLimit}
        >
          {!isFetched && isFetching && <Spinner size="sm" />}
        </Pagination>
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
