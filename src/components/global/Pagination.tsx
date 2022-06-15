import { Button, HStack, Select, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface PaginationProps {
  children: React.ReactNode
  pageNumber: number
  pageLimit: number
  totalPages: number
  setPageNumber: (pageNumber: number | ((pageNumber: number) => number)) => void
  setPageLimit: (pageNumber: number | ((pageNumber: number) => number)) => void
}

const Pagination = ({ children, pageNumber, pageLimit, totalPages, setPageNumber, setPageLimit }: PaginationProps) => {
  const handlePageLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentPageLimit = parseInt(e.target.value)
    setPageLimit(currentPageLimit)
    setPageNumber(Math.ceil((pageLimit * pageNumber) / currentPageLimit))
  }

  return (
    <Stack alignItems="center" gap="3" justifyContent={['center', 'space-between']} direction={'row'} flexWrap="wrap" mt="4" w="full">
      <HStack>
        <Select id="page_limit" maxW="20" value={pageLimit} onChange={handlePageLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </Select>
        <Text whiteSpace="nowrap">Row per page</Text>
      </HStack>

      <HStack>
        {children}

        <Button
          size="sm"
          rounded="full"
          leftIcon={<FiArrowLeft />}
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev: number) => prev - 1)}
        >
          Prev
        </Button>

        <Button
          size="sm"
          rounded="full"
          rightIcon={<FiArrowRight />}
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((prev: number) => prev + 1)}
        >
          Next
        </Button>

        <Text whiteSpace="nowrap">
          {pageNumber} / {totalPages} page
        </Text>
      </HStack>
    </Stack>
  )
}

export default Pagination
