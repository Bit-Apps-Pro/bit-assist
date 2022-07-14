import { Box, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import ColorPicker from '@atomik-color/component'
import transparentBg from '@public/transparent_bg.png'

const ColorPickerWrap = ({ color, handleChange, handleClose = undefined }) => {
  return (
    <Menu onClose={handleClose}>
      <MenuButton bgImage={transparentBg.src} transition="none" rounded="md" boxShadow="md" _focus={{ boxShadow: 'outline' }}>
        <Box bgColor={color?.str} h="14" w="14" rounded="md"></Box>
      </MenuButton>
      <MenuList zIndex={3} p="0" border="0" maxW="220px">
        <Box maxW="100%">
          <ColorPicker showParams={true} value={color} onChange={handleChange} />
        </Box>
      </MenuList>
    </Menu>
  )
}

export default ColorPickerWrap
