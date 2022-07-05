import ColorPicker from '@atomik-color/component'
import { Box, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuList, Select, Text, Textarea, VStack } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import React, { useRef, useState } from 'react'
import transparentBg from '@public/transparent_bg.png'
import { TColor } from '@atomik-color/core/dist/types'
import { str2Color } from '@atomik-color/core'

const Form = () => {
  const [flow, setFlow] = useAtom(flowAtom)
  const [color, setColor] = useState(str2Color('#00ffa3'))

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  const handleAddField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log(name, value)
  }


  const colorChangedRef = useRef<boolean>(false)
  const handleChange = async () => {
    if (!colorChangedRef.current) return
    colorChangedRef.current = false
  }

  const handleColorChange = (color: TColor) => {
    colorChangedRef.current = true
    setColor(color)
  }

  return (
    <>
      <VStack w="full">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" onChange={(e) => handleChanges(e.target.value, 'email')} />
        </FormControl>
      </VStack>

      <Text>Add New Field</Text>
      <Select name="addField" w="48" onChange={handleAddField} defaultValue="">
        <option value="">Add Field</option>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="select">Select</option>
        <option value="textarea">Textarea</option>
        <option value="file">File Upload</option>
        <option value="rating">Rating</option>
        <option value="emoji">Emoji</option>
        <option value="feedback">Feedback</option>
      </Select>

      <Text>Form Color</Text>
      <Menu onClose={handleChange}>
        <MenuButton bgImage={transparentBg.src} transition="none" rounded="md" boxShadow="md" _focus={{ boxShadow: 'outline' }}>
          <Box bgColor={color?.str} h="14" w="14" rounded="md"></Box>
        </MenuButton>
        <MenuList zIndex={3} p="0" border="0" maxW="220px">
          <Box maxW="100%">
            <ColorPicker showParams={true} value={color} onChange={handleColorChange} />
          </Box>
        </MenuList>
      </Menu>
      <FormControl>
        <FormLabel htmlFor="submitButtonText">Submit Button Text</FormLabel>
        <Input id="submitButtonText" value={'Submit'} onChange={(e) => handleChanges(e.target.value, 'submitButtonText')} />
      </FormControl>
    </>
  )
}

export default Form
