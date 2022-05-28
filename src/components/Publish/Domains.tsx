/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Center,
  useDisclosure,
} from '@chakra-ui/react'
import ResponseToast from '@components/Global/ResponseToast'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { useAtom } from 'jotai'
import React, { useRef, useState } from 'react'
import { HiCheck, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import { Kbd } from '@chakra-ui/react'

const Domains = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [isAdding, setIsAdding] = useState(false)
  const [domainName, setDomainName] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) {
      return
    }

    if (e.key === 'Enter') {
      addNewDomain()
    } else if (e.key === 'Escape') {
      resetStates()
    }
  }

  const addNewDomain = async () => {
    const pattern =
      /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/gm
    if (domainName === '' || pattern.test(domainName) === false) {
      toast({
        status: 'error',
        position: 'top-right',
        description: 'Please enter a valid domain name',
      })
      return
    }

    const domainExists = widget.domains.find(
      (domain: string) => domain === domainName
    )
    if (domainExists) {
      toast({
        status: 'warning',
        position: 'top-right',
        description: 'Domain already exists',
      })
      return
    }

    setWidget((prev) => {
      prev.domains.push(domainName)
    })
    resetStates()

    const response = await updateWidget({
      ...widget,
      domains: [...widget.domains, domainName],
    })
    ResponseToast({
      toast,
      response,
      action: 'create',
      messageFor: 'Widget domain',
    })
  }

  const handleRemoveDomain = async (domainIndex: number, onClose: Function) => {
    const newDomains = [...widget.domains]
    newDomains.splice(domainIndex, 1)
    
    onClose()
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

  const resetStates = () => {
    setDomainName('')
    setIsAdding(false)
  }

  const initRef = useRef()

  return (
    <Box width={'sm'}>
      <Box
        mb="4"
        rounded={'md'}
        borderWidth={`${widget.domains.length && '1px'}`}
      >
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
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text>Are you sure you want to remove this domain?</Text>
                      <Button
                        mt={4}
                        colorScheme={'red'}
                        ref={initRef}
                        onClick={() => handleRemoveDomain(index, onClose)}
                        disabled={isWidgetUpdating}
                      >
                        Confirm
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </HStack>
        ))}
      </Box>

      {isAdding && (
        <Box mb={4}>
          <HStack mb={2}>
            <Input
              placeholder="Domain Name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Tooltip label="Cancel">
              <IconButton
                isRound={true}
                aria-label="Remove Domain"
                variant="ghost"
                colorScheme="red"
                icon={<HiOutlineTrash />}
                onClick={resetStates}
              />
            </Tooltip>
            <Tooltip label="Save">
              <IconButton
                isRound={true}
                aria-label="Remove Domain"
                variant="ghost"
                colorScheme="green"
                icon={<HiCheck />}
                onClick={() => addNewDomain()}
                disabled={isWidgetUpdating}
              />
            </Tooltip>
          </HStack>
          <span>
            <Kbd>enter</Kbd> to add, &nbsp; <Kbd>esc</Kbd> to cancel
          </span>
        </Box>
      )}

      {!isAdding && (
        <Button
          leftIcon={<HiPlus />}
          colorScheme="teal"
          variant="outline"
          rounded={'full'}
          onClick={() => setIsAdding(true)}
          isLoading={isWidgetUpdating}
        >
          Add Domain
        </Button>
      )}
    </Box>
  )
}

export default Domains
