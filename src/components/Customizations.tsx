import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { useState } from 'react'

const Customizations = () => {
  const [color, setColor] = useState(str2Color('#000'))

  return (
    <Stack gap="10">
      <Box>
        <Text mb="2">Button Name</Text>
        <Input placeholder="Button Name" isRequired={true} />
      </Box>
      <Box>
        <Text mb="2">Button Color</Text>
        <Menu>
          <MenuButton h='12' w='12' bg={`#${color.hex}`} transition='none' rounded='md'></MenuButton>
          <MenuList p="0" border="0" maxW='220px'>
            <Box maxW='100%'>
              <ColorPicker
                showParams={true}
                value={color}
                onChange={setColor}
              />
            </Box>
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  )
}

export default Customizations
