import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import { useState } from 'react'

const CallToAction = () => {
  const [sliderValue, setSliderValue] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Box>
      <Title>Call To Action</Title>

      <Slider
        id="slider"
        defaultValue={sliderValue}
        min={0}
        max={60}
        maxW="80"
        colorScheme="purple"
        onChange={(val) => setSliderValue(val)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip hasArrow bg="purple.500" color="white" placement="top" isOpen={showTooltip} label={`${sliderValue} sec`}>
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  )
}

export default CallToAction
