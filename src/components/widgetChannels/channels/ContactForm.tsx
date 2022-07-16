import { FormControl, FormLabel, Input, Stack, Textarea, VStack } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { TColor } from '@atomik-color/core/dist/types'
import { str2Color } from '@atomik-color/core'
import ColorPickerWrap from '@components/global/ColorPickerWrap'

const ContactForm = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  useEffect(() => {
    setFlow((prev) => {
      if (typeof prev.config.form_config === 'undefined') {
        prev.config.form_config = {}
      }
      prev.config.form_config = { form_bg_color: str2Color('#00ffa3'), form_text_color: str2Color('#fff') }
    })
  }, [])

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  const handleColorChange = (color: TColor, key: string) => {
    setFlow((prev) => {
      prev.config.form_config[key] = color
    })
  }

  return (
    <>
      <VStack w="full">
        <FormControl>
          <FormLabel htmlFor="name">Name Field</FormLabel>
          <Input id="name" value={'Name'} onChange={(e) => handleChanges(e.target.value, 'name')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email Field</FormLabel>
          <Input id="email" value={'Email'} onChange={(e) => handleChanges(e.target.value, 'email')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="mobile">Mobile Field</FormLabel>
          <Input id="mobile" value={'Mobile'} onChange={(e) => handleChanges(e.target.value, 'mobile')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="subject">Subject Field</FormLabel>
          <Input id="subject" value={'Subject'} onChange={(e) => handleChanges(e.target.value, 'subject')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="message">Message Field</FormLabel>
          <Textarea id="message" value="Write message" onChange={(e) => handleChanges(e.target.value, 'message')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="buttonText">Button Text</FormLabel>
          <Input id="buttonText" value={'Submit'} onChange={(e) => handleChanges(e.target.value, 'buttonText')} />
        </FormControl>
      </VStack>

      <Stack w={'full'} spacing="0" gap="2" flexDirection={['column', 'row']}>
        <FormControl>
          <FormLabel>Form Theme Color</FormLabel>
          <ColorPickerWrap color={flow.config?.form_config?.form_bg_color} handleChange={(val: TColor) => handleColorChange(val, 'form_bg_color')} />
        </FormControl>

        <FormControl>
          <FormLabel>Form Text Color</FormLabel>
          <ColorPickerWrap
            color={flow.config?.form_config?.form_text_color}
            handleChange={(val: TColor) => handleColorChange(val, 'form_text_color')}
          />
        </FormControl>
      </Stack>
    </>
  )
}

export default ContactForm
