import { Box, Input } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import Title from '@components/Global/Title'
import { debounce } from '@utils/utils'
import { useToast } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { widgetAtom } from 'src/atom'

const WidgetName = () => {
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const toast = useToast({ isClosable: true })

  const handleUpdateWidget = async () => {
    await updateWidget(widget)
    toast({
      status: 'success',
      position: 'top-right',
      title: 'Widget name updated',
    })
  }

  const updateData = useCallback(debounce(handleUpdateWidget, 500, false), [])

  const handleChange = async (e) => {
    setWidget((oldValue: object) => ({ ...oldValue, color: e.target.value }))
    // updateData()
  }

  return (
    <Box>
      <Title>Widget Name</Title>
      <Input
        placeholder="Widget Name"
        value={widget?.name}
        onChange={handleChange}
        isRequired={true}
      />
    </Box>
  )
}

export default WidgetName
