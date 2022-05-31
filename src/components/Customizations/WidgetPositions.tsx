import { Box, SimpleGrid, useColorModeValue, useToast } from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import produce from 'immer'
import { useAtom } from 'jotai'

const WidgetPositions = () => {
  const grayColorToggle = useColorModeValue('gray.200', 'gray.700')
  const brandColorToggle = useColorModeValue('purple.500', 'purple.200')

  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()

  const handleChange = async (e) => {
    const position = e.target.getAttribute('data-position')

    setWidget((prev) => {
      prev.styles.position = position
    })

    const response: any = await updateWidget(
      produce(widget, (draft) => {
        draft.styles.position = position
      })
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget position' })
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
          onClick={handleChange}
          bg={`${widget.styles?.position === 'top-left' && brandColorToggle}`}
          borderColor={`${widget.styles?.position === 'top-left' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
        <Box bg={grayColorToggle} height="6" />
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="top-right"
          onClick={handleChange}
          bg={`${widget.styles?.position === 'top-right' && brandColorToggle}`}
          borderColor={`${widget.styles?.position === 'top-right' && brandColorToggle}`}
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
          onClick={handleChange}
          bg={`${widget.styles?.position === 'bottom-left' && brandColorToggle}`}
          borderColor={`${widget.styles?.position === 'bottom-left' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
        <Box bg={grayColorToggle} height="6" />
        <Box
          height="6"
          cursor="pointer"
          borderWidth="2px"
          data-position="bottom-right"
          onClick={handleChange}
          bg={`${widget.styles?.position === 'bottom-right' && brandColorToggle}`}
          borderColor={`${widget.styles?.position === 'bottom-right' && brandColorToggle}`}
          _hover={{ bg: brandColorToggle, borderColor: brandColorToggle }}
        />
      </SimpleGrid>
    </Box>
  )
}

export default WidgetPositions
