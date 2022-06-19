/* eslint-disable react/no-children-prop */
import { Box, Button, HStack, IconButton, Input, useToast, Tooltip, Kbd } from '@chakra-ui/react'
import ResponseToast from '@components/global/ResponseToast'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/widget/useUpdateWidget'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { HiCheck, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import Domain from '@components/publish/Domain'

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
    const pattern = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/gm
    if (domainName === '' || pattern.test(domainName) === false) {
      toast({ status: 'error', position: 'top-right', description: 'Please enter a valid domain name' })
      return
    }

    const domainExists = widget.domains.find((domain: string) => domain === domainName)
    if (domainExists) {
      toast({ status: 'warning', position: 'top-right', description: 'Domain already exists' })
      return
    }

    setWidget((prev) => {
      prev.domains.push(domainName)
    })
    resetStates()

    const response = await updateWidget({ ...widget, domains: [...widget.domains, domainName] })
    ResponseToast({ toast, response, action: 'create', messageFor: 'Widget domain' })
  }

  const resetStates = () => {
    setDomainName('')
    setIsAdding(false)
  }

  return (
    <Box w="sm" maxW="full">
      <Box mb="4" rounded={'md'} borderWidth={`${widget.domains.length && '1px'}`}>
        {widget.domains.map((domain, index) => (
          <Domain key={domain} index={index} domain={domain} updateWidget={updateWidget} isWidgetUpdating={isWidgetUpdating} />
        ))}
      </Box>

      {isAdding && (
        <Box mb={4}>
          <HStack mb={2}>
            <Input placeholder="Domain Name" value={domainName ?? ''} onChange={(e) => setDomainName(e.target.value)} onKeyDown={handleKeyDown} />
            <Tooltip label="Cancel">
              <IconButton isRound={true} aria-label="Remove Domain" variant="ghost" colorScheme="red" icon={<HiOutlineTrash />} onClick={resetStates} />
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
            Press <Kbd>enter</Kbd> to add, &nbsp; <Kbd>esc</Kbd> to cancel
          </span>
        </Box>
      )}

      {!isAdding && (
        <Button leftIcon={<HiPlus />} colorScheme="gray" variant="outline" onClick={() => setIsAdding(true)} isLoading={isWidgetUpdating}>
          Add Domain
        </Button>
      )}
    </Box>
  )
}

export default Domains
