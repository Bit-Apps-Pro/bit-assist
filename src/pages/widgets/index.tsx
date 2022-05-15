import { SettingsIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

const Widgets = () => {
  return (
    <>
      <Heading as="h2" size="md" mb="4">
        Widgets
      </Heading>

      <TableContainer borderWidth="1px" rounded="lg" shadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Bit Code Widget</Td>
              <Td textAlign="right">
                <ButtonGroup>
                  <Link href={'/widgets/1'}>
                    <IconButton
                      isRound={true}
                      aria-label="Button Setting Page"
                      icon={<SettingsIcon />}
                    />
                  </Link>
                  <Menu>
                    <MenuButton
                      isRound={true}
                      as={IconButton}
                      aria-label="Options"
                      icon={<HiDotsVertical />}
                    />
                    <MenuList>
                      <MenuItem>Copy</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Widgets
