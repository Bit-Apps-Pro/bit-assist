import { Box, Input } from '@chakra-ui/react'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import Title from '@components/Global/Title'
import { useToast } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { widgetAtom } from '@globalStates/atoms'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'
import { chat_widgets } from '@prisma/client'

const WidgetName = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const debounceUpdateWidget = useRef(
    debounce(async (name) => {
      const newWidget = { ...widget, name }
      const response: any = await updateWidget(newWidget)
      showToast(response)
    }, 1000)
  ).current

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidget((oldValue: chat_widgets) => ({ ...oldValue, name: e.target.value }))
    debounceUpdateWidget(e.target.value)
  }

  const showToast = (response: any) => {
    let status: 'success' | 'info' | 'warning' | 'error' | 'loading' = 'error'
    let title = 'Widget name could not be updated'
    if (response?.success) {
      status = 'success'
      title = 'Widget name updated'
    }
    toast({ status, position: 'top-right', title })
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
