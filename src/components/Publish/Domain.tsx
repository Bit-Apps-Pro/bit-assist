import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useToast,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import { widgetAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const Domain = ({ domain, index, updateWidget, isWidgetUpdating }) => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)

  const handleRemoveDomain = async (domainIndex: number, onClose: Function) => {
    onClose()

    const newDomains = [...widget.domains]
    newDomains.splice(domainIndex, 1)
    const response = await updateWidget({
      ...widget,
      domains: [...newDomains],
    })
    ResponseToast({
      toast,
      response,
      action: 'delete',
      messageFor: 'Widget domain',
    })

    setWidget((prev) => {
      prev.domains.splice(domainIndex, 1)
    })
  }

  const initRef = useRef()

  return (
    <HStack
      justifyContent={'space-between'}
      gap="4"
      py="2"
      px="4"
      borderTopWidth={`${index > 0 && '1px'}`}
    >
      <Text>{domain}</Text>
      <Popover closeOnBlur={false} initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Box>
                <Tooltip label="Remove domain" placement="right">
                  <IconButton
                    isRound={true}
                    aria-label="Remove Domain"
                    variant="ghost"
                    colorScheme="red"
                    icon={<HiOutlineTrash />}
                    disabled={isWidgetUpdating}
                  />
                </Tooltip>
              </Box>
            </PopoverTrigger>
            <PopoverContent shadow={'2xl'}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody p={3}>
                <Text>Are you sure you want to remove this domain?</Text>
                <Box mt={4} display="flex" alignItems="center" justifyContent="center" gap={2}>
                  <Button ref={initRef} onClick={onClose} size="sm">Cancel</Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleRemoveDomain(index, onClose)}
                    disabled={isWidgetUpdating}
                  >
                    Confirm
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </HStack>
  )
}

export default Domain
