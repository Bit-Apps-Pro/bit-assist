import { Box, useRadio, useColorModeValue, Center } from '@chakra-ui/react'

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const formBackground = useColorModeValue('purple.500', 'purple.200')
  const iconColor = useColorModeValue('white', 'gray.800')

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontSize="xl"
        _checked={{
          bg: props?.design != 'border' && formBackground,
          color: iconColor,
          borderColor: formBackground,
          borderWidth: '2px',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        h="14"
        w="14"
      >
        {props.children}
      </Center>
    </Box>
  )
}

export default RadioCard