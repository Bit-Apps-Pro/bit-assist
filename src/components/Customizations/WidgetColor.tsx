import { Box, Menu, MenuButton, MenuList, useToast } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import transparentBg from '@public/transparent_bg.png'
import ColorPicker from '@atomik-color/component'
import { TColor } from '@atomik-color/core/dist/types'
import { useAtom } from 'jotai'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import ResponseToast from '@components/Global/ResponseToast'

const WidgetColor = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const handleChange = async () => {
    const response: any = await updateWidget(widget)
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget color' })
  }

  const handleColorChange = (color: TColor) => {
    setWidget((prev) => {
      if (prev.styles === null) {
        prev.styles = {}
      }
      prev.styles.color = color
    })
  }

  return (
    <Box>
      <Title>Widget Color</Title>
      <Menu onClose={handleChange}>
        <MenuButton bgImage={transparentBg.src} transition="none" rounded="md" boxShadow="md" _focus={{ boxShadow: 'outline' }}>
          <Box bgColor={widget.styles?.color?.str} h="14" w="14" rounded="md"></Box>
        </MenuButton>
        <MenuList p="0" border="0" maxW="220px">
          <Box maxW="100%">
            <ColorPicker showParams={true} value={widget.styles?.color} onChange={handleColorChange} />
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default WidgetColor
