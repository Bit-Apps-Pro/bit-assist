import { Button, HStack, Text } from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface PaginationProps {
  pageNumber: number
  pageLimit: number
  totalPages: number
  setPageNumber: (pageNumber: number | ((pageNumber: number) => number)) => void
  setPageLimit: (pageNumber: number | ((pageNumber: number) => number)) => void
}

const Pagination = ({ pageNumber, pageLimit, totalPages, setPageNumber, setPageLimit }: PaginationProps) => {
  return (
    <HStack mt="4">
      <Button rounded="full" leftIcon={<FiArrowLeft />} disabled={pageNumber === 1} onClick={() => setPageNumber((prev: number) => prev - 1)}>
        Prev
      </Button>

      <Button
        rounded="full"
        rightIcon={<FiArrowRight />}
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber((prev: number) => prev + 1)}
      >
        Next
      </Button>

      <Text>
        {pageNumber} / {totalPages} page
      </Text>
    </HStack>
  )
}

export default Pagination
