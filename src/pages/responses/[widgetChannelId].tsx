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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import Head from 'next/head'
import { WidgetResponse } from '@globalStates/Interfaces'
import useFetchResponses from '@hooks/queries/response/useFetchResponses'
import useDeleteResponses from '@hooks/mutations/response/useDeleteResponses'
import { textTrim, toSlug } from '@utils/utils'
import React, { useEffect, useRef, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Pagination from '@components/global/Pagination'
import useFetchOthersData from '@hooks/queries/response/useFetchOthersData'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useRouter } from 'next/router'

const Responses = () => {
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { othersData } = useFetchOthersData()
  const { widgetResponses, isResponsesLoading, isFetching, isFetched } = useFetchResponses(pageLimit, pageNumber)
  const { deleteResponses, isResponsesDeleting } = useDeleteResponses(pageLimit, pageNumber)
  const { isOpen, onOpen: openDelModal, onClose: closeDelModal } = useDisclosure()
  const [checkedItems, setCheckedItems] = useState([])
  const router = useRouter()
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const btnRef = useRef()
  const drawerResponse = useRef()

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

  const handleResponseClick = (response) => {
    drawerResponse.current = response
    onDrawerOpen()
  }

  const handleDrawerClose = () => {
    drawerResponse.current = null
    onDrawerClose()
  }

  return (
    <>
      <Head>
        <title>Responses</title>
        <meta name="description" content="Bit Assist" />
        <meta name="keywords" content="BitCode, Bit, Code, Bit Assist, Assist, Bit Form, Form, Bit Integrations, Integrations, Bit Flow, Flow" />
      </Head>

      <HStack mb="4" flexWrap="wrap">
        <HStack alignItems={'center'}>
          <Button p="1" size="sm" variant="ghost" onClick={() => router.back()}>
            <MdArrowBackIosNew size="1rem" />
          </Button>
          <Text as="h2" fontSize="lg" textTransform="none">
            Response List {othersData?.channelName && '- ' + othersData.channelName.replace(/-/g, ' ')}
          </Text>
          {isResponsesLoading && <Spinner />}
        </HStack>
        {checkedItems?.length && (
          <HStack spacing={1}>
            <IconButton
              onClick={openDelModal}
              fontSize={'1rem'}
              size="sm"
              rounded="full"
              aria-label="Delete Icon"
              variant="ghost"
              icon={<FiTrash2 />}
            />
            <Badge textTransform="lowercase">{checkedItems.length} items selected</Badge>
          </HStack>
        )}
      </HStack>

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
              {othersData?.formFields?.map((field: { id: string; label: string }) => (
                <Th key={field.id + 'th'}>{textTrim(field.label, 20)}</Th>
              ))}
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
                  {othersData?.formFields?.map((field: { id: string; label: string }) => (
                    <Td ref={btnRef} onClick={() => handleResponseClick(widgetResponse.response)} cursor="pointer" key={field.id + 'td'}>
                      {textTrim(widgetResponse.response[toSlug(field.label, '_')], 40)}
                    </Td>
                  ))}
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

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerClose} finalFocusRef={btnRef}>
        <DrawerOverlay bg={'blackAlpha.400'} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Response Details</DrawerHeader>

          <DrawerBody>
            {drawerResponse?.current &&
              Object.entries(drawerResponse.current).map(([label, value]) => {
                return (
                  <Box key={label}>
                    <Text fontSize="md" fontWeight="bold" mb="2">
                      {label.toUpperCase().replace(/_/g, ' ')}
                    </Text>
                    <Text fontSize="sm" mb="2">
                      {value.toString()}
                    </Text>
                  </Box>
                )
              })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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

Responses.auth = process.env.NODE_ENV === 'development' ? false : true

export default Responses
