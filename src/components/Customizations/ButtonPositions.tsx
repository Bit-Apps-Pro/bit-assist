import { Box, Text, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'

const ButtonPositions = () => {
  const [position, setPosition] = useState('bottom-right')

  const handlePositionChange = (e) => {
    setPosition(e.target.getAttribute('data-position') || 'bottom-right')
  }

  return (
    <Box>
      <Text mb="2">Button Position</Text>
      <SimpleGrid columns={3} spacing={2} width="20">
        <Box data-position="top-left" onClick={handlePositionChange} bg={`${position === 'top-left' ? 'teal.500' : 'teal.100' }`} height="6" cursor="pointer"></Box>
        <Box bg="gray.200" height="6"></Box>
        <Box data-position="top-right" onClick={handlePositionChange} bg={`${position === 'top-right' ? 'teal.500' : 'teal.100' }`} height="6" cursor="pointer"></Box>
        <Box bg="gray.200" height="6"></Box>
        <Box bg="gray.200" height="6"></Box>
        <Box bg="gray.200" height="6"></Box>
        <Box data-position="bottom-left" onClick={handlePositionChange} bg={`${position === 'bottom-left' ? 'teal.500' : 'teal.100' }`} height="6" cursor="pointer"></Box>
        <Box bg="gray.200" height="6"></Box>
        <Box data-position="bottom-right" onClick={handlePositionChange} bg={`${position === 'bottom-right' ? 'teal.500' : 'teal.100' }`} height="6" cursor="pointer"></Box>
      </SimpleGrid>

    </Box>
  )
}

export default ButtonPositions