import { Box, HStack, useRadioGroup, useToast } from '@chakra-ui/react'
import RadioCard from '@components/Global/RadioCard'
import {
  IoChatboxEllipsesOutline,
  IoChatboxEllipses,
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoChatbubblesOutline,
  IoChatbubblesSharp,
} from 'react-icons/io5'
import { HiChatAlt2, HiOutlineChatAlt2 } from 'react-icons/hi'
import Title from '@components/Global/Title'
import { useAtom } from 'jotai'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { widgetAtom } from '@globalStates/atoms'
import ResponseToast from '@components/Global/ResponseToast'
import produce from 'immer'

const WidgetIcons = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const handleChange = async (icon: string) => {
    console.log('widget.styles', widget.styles)
    setWidget((prev) => {
      if (prev.styles === null) {
        prev.styles = {}
      }
      prev.styles.icon = icon
    })

    const response: any = await updateWidget(
      produce(widget, (draft) => {
        if (draft.styles === null) {
          draft.styles = {}
        }
        draft.styles.icon = icon
      })
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget icon' })
  }

  const iconOptions = ['chat-icon-1', 'chat-icon-2', 'chat-icon-3', 'chat-icon-4', 'chat-icon-5', 'chat-icon-6', 'chat-icon-7', 'chat-icon-8']
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'widgetIcon',
    defaultValue: widget.styles?.icon,
    onChange: handleChange,
  })

  const group = getRootProps()

  return (
    <Box>
      <Title>Button Size</Title>
      <HStack {...group} flexWrap="wrap" gap={2} spacing={0}>
        {iconOptions.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value === iconOptions[0] && <IoChatboxEllipses />}
              {value === iconOptions[1] && <HiChatAlt2 />}
              {value === iconOptions[2] && <IoChatbubbleEllipsesSharp />}
              {value === iconOptions[3] && <IoChatbubblesSharp />}
              {value === iconOptions[4] && <IoChatboxEllipsesOutline />}
              {value === iconOptions[5] && <HiOutlineChatAlt2 />}
              {value === iconOptions[6] && <IoChatbubbleEllipsesOutline />}
              {value === iconOptions[7] && <IoChatbubblesOutline />}
            </RadioCard>
          )
        })}
      </HStack>
    </Box>
  )
}

export default WidgetIcons
