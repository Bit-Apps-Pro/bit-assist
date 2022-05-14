import { SettingsIcon } from '@chakra-ui/icons'
import {
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import Link from 'next/link'

const Index = () => {
  return (
    <>
      <Heading as="h2" size="md" mt={12} mb={4}>
        Buttons
      </Heading>

      <TableContainer borderWidth="1px" rounded={'md'} shadow={'md'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th textAlign={'right'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Bitcode Button</Td>
              <Td textAlign={'right'}>
                <Link href={'/settings'}>
                  <IconButton
                    isRound={true}
                    aria-label="Button Setting Page"
                    colorScheme="gray"
                    icon={<SettingsIcon />}
                  />
                </Link>
                <IconButton
                  ml={2}
                  isRound={true}
                  aria-label="Button Setting Page"
                  colorScheme="gray"
                  icon={<HiDotsVertical />}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Index
