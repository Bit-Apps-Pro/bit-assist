/* eslint-disable react/no-children-prop */
import { Box, Input, InputGroup, InputRightAddon, Text, useToast } from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import produce from 'immer'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'

const WidgetSize = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseInt(e.target.value) : null
    setWidget((prev) => {
      if (prev.styles === null) {
        prev.styles = {}
      }
      prev.styles.size = val
    })
    debounceUpdateWidget(
      produce(widget, (draft) => {
        if (draft.styles === null) {
          draft.styles = {}
        }
        draft.styles.size = val
      })
    )
  }

  const debounceUpdateWidget = useRef(
    debounce(async (widget) => {
      const response: any = await updateWidget(widget)
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget size' })
    }, 1000)
  ).current

  useEffect(() => {
    return () => {
      debounceUpdateWidget.cancel()
    }
  }, [debounceUpdateWidget])

  return (
    <Box>
      <Title>Widget Size</Title>
      <Text fontSize="sm" color="gray.500" mb="2">Default widget size 54px</Text>
      <InputGroup>
        <Input min="0" w="28" type="number" placeholder="Size" value={widget.styles?.size} onChange={handleChange} />
        <InputRightAddon children="px" />
      </InputGroup>
    </Box>
  )
}

export default WidgetSize
