import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react'
import RadioCard from '../RadioCard'
import {
  IoChatboxEllipsesOutline,
  IoChatboxEllipses,
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoChatbubblesOutline,
  IoChatbubblesSharp,
} from 'react-icons/io5'
import { HiChatAlt2, HiOutlineChatAlt2 } from 'react-icons/hi'

const ButtonIcons = () => {
  const iconOptions = ['chat-icon-1', 'chat-icon-2', 'chat-icon-3', 'chat-icon-4', 'chat-icon-5', 'chat-icon-6', 'chat-icon-7', 'chat-icon-8']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'buttonIcon',
    defaultValue: iconOptions[0],
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <Box>
      <Text mb="2">Button Size</Text>
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

export default ButtonIcons