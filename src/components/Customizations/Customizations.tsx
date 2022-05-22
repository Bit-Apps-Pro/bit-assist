import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { useState } from 'react'
import transparentBg from '../../../public/transparent_bg.png'
import ButtonIcons from './ButtonIcons'
import ButtonPositions from './ButtonPositions'

const Customizations = () => {
  const [color, setColor] = useState(str2Color('#121212'))

  return (
    <Stack gap="10">
      <Box>
        <Text mb="2">Button Name</Text>
        <Input placeholder="Button Name" isRequired={true} />
      </Box>

      <Box>
        <Text mb="2">Button Color</Text>
        <Menu>
          <MenuButton bgImage={transparentBg.src} transition="none" rounded="md" boxShadow="md" _focus={{ boxShadow: 'outline' }}>
            <Box bgColor={color.str} h="14" w="14" rounded="md"></Box>
          </MenuButton>
          <MenuList p="0" border="0" maxW="220px">
            <Box maxW="100%">
              <ColorPicker
                showParams={true}
                value={color}
                onChange={setColor}
              />
            </Box>
          </MenuList>
        </Menu>
      </Box>

      <ButtonIcons />
      <ButtonPositions />
    </Stack>
  )
}

export default Customizations
