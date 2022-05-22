import {
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useRadioGroup,
} from '@chakra-ui/react'
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import { useState } from 'react'
import transparentBg from '../../public/transparent_bg.png'
import RadioCard from './RadioCard'

const Customizations = () => {
  const [color, setColor] = useState(str2Color('#121212'))
  const options = ['react', 'vue', 'svelte']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <Stack gap="10">
      <Box>
        <Text mb="2">Button Name</Text>
        <Input placeholder="Button Name" isRequired={true} />
      </Box>

      <Box>
        <Text mb="2">Button Color</Text>
        <Menu>
          <MenuButton
            bgImage={transparentBg.src}
            transition="none"
            rounded="md"
            overflow="hidden"
          >
            <Box bgColor={color.str} h="12" w="12"></Box>
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

      <Box>
        <Text mb="2">Button Size</Text>
        <HStack {...group}>
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </Box>
    </Stack>
  )
}

export default Customizations
