import { Box, Input } from '@chakra-ui/react'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import Title from '@components/Global/Title'
import { useToast } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { widgetAtom } from '@globalStates/atoms'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'
import { chat_widgets } from '@prisma/client'
import ResponseToast from '@components/Global/ResponseToast'

const WidgetName = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const debounceUpdateWidget = useRef(
    debounce(async (name) => {
      const newWidget = { ...widget, name }
      const response: any = await updateWidget(newWidget)
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget name' })
    }, 1000)
  ).current

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidget((oldValue: chat_widgets) => ({
      ...oldValue,
      name: e.target.value,
    }))
    debounceUpdateWidget(e.target.value)
  }

  useEffect(() => {
    return () => {
      debounceUpdateWidget.cancel()
    }
  }, [debounceUpdateWidget])

  return (
    <Box>
      <Title>Widget Name</Title>
      <Input
        placeholder="Widget Name"
        value={widget.name}
        onChange={handleChange}
        isRequired={true}
      />
    </Box>
  )
}

export default WidgetName
