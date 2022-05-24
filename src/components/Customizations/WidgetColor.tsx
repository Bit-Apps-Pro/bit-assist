import { Box, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import transparentBg from '@public/transparent_bg.png'
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { useEffect, useState } from 'react'
import { TColor } from '@atomik-color/core/dist/types'
import { useAtom } from 'jotai'
import { widgetAtom } from '@globalStates/atoms'

const WidgetColor = () => {
  const [widget, setWidget] = useAtom(widgetAtom)

  useEffect(() => {
    setWidget((oldValue: object) => ({
      ...oldValue,
      color: str2Color('#161616'),
    }))
  }, [])

  const handleColorChange = (val: TColor) => {
    setWidget((oldValue: object) => ({ ...oldValue, color: val }))
  }

  return (
    <Box>
      <Title>Widget Color</Title>
      <Menu>
        <MenuButton
          bgImage={transparentBg.src}
          transition="none"
          rounded="md"
          boxShadow="md"
          _focus={{ boxShadow: 'outline' }}
        >
          <Box
            bgColor={widget?.styles?.color.str}
            h="14"
            w="14"
            rounded="md"
          ></Box>
        </MenuButton>
        <MenuList p="0" border="0" maxW="220px">
          <Box maxW="100%">
            <ColorPicker
              showParams={true}
              value={widget?.styles?.color}
              onChange={handleColorChange}
            />
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default WidgetColor
