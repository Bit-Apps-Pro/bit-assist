/* eslint-disable react/no-children-prop */
import { HStack, Input, InputGroup, InputRightAddon, Text, useToast } from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import produce from 'immer'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'

const PageScroll = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseInt(e.target.value) : 0
    setWidget((draft) => {
      draft.page_scroll = val
    })
    debounceUpdateWidget(
      produce(widget, (draft) => {
        draft.page_scroll = val
      })
    )
  }

  const debounceUpdateWidget = useRef(
    debounce(async (widget) => {
      const response: any = await updateWidget(widget)
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget page scroll' })
    }, 1000)
  ).current

  useEffect(() => {
    return () => {
      debounceUpdateWidget.cancel()
    }
  }, [debounceUpdateWidget])

  return (
    <HStack>
      <Text whiteSpace={'nowrap'}>Page scroll</Text>
      <InputGroup>
        <Input w="28" min="0" type="number" placeholder="Page Scroll in %" value={widget.page_scroll ?? ''} onChange={handleChange} />
        <InputRightAddon children="%" />
      </InputGroup>
    </HStack>
  )
}

export default PageScroll
