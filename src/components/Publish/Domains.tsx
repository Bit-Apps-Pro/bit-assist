import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { HiCheck, HiOutlineTrash, HiPlus } from 'react-icons/hi'

const Domains = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [isAdding, setIsAdding] = useState(false)
  const [domainName, setDomainName] = useState('')

  const handleRemoveDomain = async (domainId: number) => {
    console.log('domainId', domainId)
  }

  const addNewDomain = async () => {
    setWidget((prev) => {
      prev.domains.push(domainName)
    })
    resetStates()

    // const response = await updateWidget()
    // ResponseToast({
    //   toast,
    //   response,
    //   action: 'create',
    //   messageFor: 'Widget position',
    // })
  }

  const resetStates = () => {
    setDomainName('')
    setIsAdding(false)
  }

  return (
    <Box width={'sm'}>
      <Box mb="4" borderWidth={`${widget.domains.length && '1px'}`}>
        {widget.domains.map((domain, index) => (
          <HStack
            key={index}
            justifyContent={'space-between'}
            gap="4"
            py="2"
            px="4"
            borderBottomWidth={`${index < widget.domains.length - 1 && '1px'}`}
          >
            <Text>{domain}</Text>
            <IconButton
              isRound={true}
              aria-label="Remove Domain"
              variant="ghost"
              colorScheme="red"
              icon={<HiOutlineTrash />}
              onClick={() => handleRemoveDomain(index)}
            />
          </HStack>
        ))}
      </Box>

      {isAdding && (
        <Box mb={4}>
          <HStack>
            <Input
              placeholder="Domain Name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
            />
            <IconButton
              isRound={true}
              aria-label="Remove Domain"
              variant="ghost"
              colorScheme="red"
              icon={<HiOutlineTrash />}
              onClick={resetStates}
            />
            <IconButton
              isRound={true}
              aria-label="Remove Domain"
              variant="ghost"
              colorScheme="green"
              icon={<HiCheck />}
              onClick={() => addNewDomain()}
            />
          </HStack>
        </Box>
      )}

      {!isAdding && (
        <Button
          leftIcon={<HiPlus />}
          colorScheme="teal"
          variant="outline"
          rounded={'full'}
          onClick={() => setIsAdding(true)}
        >
          Add Domain
        </Button>
      )}
    </Box>
  )
}

export default Domains
