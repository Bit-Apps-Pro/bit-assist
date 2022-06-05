import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import Editor from '@monaco-editor/react'
import { useAtom } from 'jotai'

const CustomCSS = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChangeCustomCSS = (value: string) => {
    setWidget((prev) => {
      prev.custom_css = value
    })
  }

  const handleSaveCustomCSS = async () => {
    const response = await updateWidget(widget)
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget custom css' })
    onClose()
  }

  return (
    <Box>
      <Title>Custom CSS</Title>
      <Box onClick={onOpen} position="relative" filter="auto" blur="1.1px" w="80" h="32">
        <Editor height="100%" width="100%" theme="vs-dark" defaultLanguage="css" defaultValue="/*write your custom css here*/" value={widget.custom_css ?? ''} />
        <Box position="absolute" top="0" w="full" h="full" zIndex={1}></Box>
      </Box>

      <Modal id="custom_css" size={'2xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Custom CSS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box boxShadow={'md'} overflow="hidden">
              <Editor
                height="50vh"
                width="100%"
                theme="vs-dark"
                onChange={handleChangeCustomCSS}
                defaultLanguage="css"
                defaultValue="/*write your custom css here*/"
                value={widget.custom_css ?? ''}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomCSS} isLoading={isWidgetUpdating} loadingText="Updating..." colorScheme="purple" shadow={'md'}>
              update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CustomCSS
