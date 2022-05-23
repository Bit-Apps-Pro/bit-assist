import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import { useState } from 'react'

const WidgetPositions = () => {
  const grayColorToggle = useColorModeValue('gray.200', 'gray.700')
  const brandColorToggle = useColorModeValue('teal.500', 'teal.200')
  const [position, setPosition] = useState('bottom-right')

  const handlePositionChange = (e) => {
    setPosition(e.target.getAttribute('data-position'))
  }

  return (
    <Box>
      <Title>Widget Position</Title>
      <SimpleGrid columns={3} spacing={2} width="20">
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="top-left"
          onClick={handlePositionChange}
          bg={`${position === 'top-left' && brandColorToggle}`}
          borderColor={`${position === 'top-left' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
        <Box bg={grayColorToggle} height="6" />
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="top-right"
          onClick={handlePositionChange}
          bg={`${position === 'top-right' && brandColorToggle}`}
          borderColor={`${position === 'top-right' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
        <Box bg={grayColorToggle} height="6" />
        <Box bg={grayColorToggle} height="6" />
        <Box bg={grayColorToggle} height="6" />
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="bottom-left"
          onClick={handlePositionChange}
          bg={`${position === 'bottom-left' && brandColorToggle}`}
          borderColor={`${position === 'bottom-left' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
        <Box bg={grayColorToggle} height="6" />
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="bottom-right"
          onClick={handlePositionChange}
          bg={`${position === 'bottom-right' && brandColorToggle}`}
          borderColor={`${position === 'bottom-right' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
      </SimpleGrid>
    </Box>
  )
}

export default WidgetPositions
