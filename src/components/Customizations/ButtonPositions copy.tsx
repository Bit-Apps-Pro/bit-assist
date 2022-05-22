import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react'
import RadioCard from '../RadioCard'
import { AiOutlineRadiusBottomleft, AiOutlineRadiusBottomright } from 'react-icons/ai'

const ButtonPositions = () => {
  const positionOptions = ['bottom-left', 'bottom-right']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'buttonPosition',
    defaultValue: positionOptions[1],
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <Box>
      <Text mb="2">Button Position</Text>
      <HStack {...group}>
        {positionOptions.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value === positionOptions[0] && <AiOutlineRadiusBottomleft />}
              {value === positionOptions[1] && <AiOutlineRadiusBottomright />}
            </RadioCard>
          )
        })}
      </HStack>
    </Box>
  )
}

export default ButtonPositions