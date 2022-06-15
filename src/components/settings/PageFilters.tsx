/* eslint-disable react/no-children-prop */
import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftAddon, Kbd, Select, Tooltip, useToast } from '@chakra-ui/react'
import Title from '@components/global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/widget/useUpdateWidget'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import Page from '@components/settings/Page'
import { HiCheck, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import ResponseToast from '@components/global/ResponseToast'
import produce from 'immer'

const PageFilters = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [isAdding, setIsAdding] = useState(false)

  const [pageDomain, setPageDomain] = useState('')
  const [pageUrl, setPageName] = useState('')
  const [pageVisibility, setPageVisibility] = useState('')
  const [pageCondition, setPageCondition] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) {
      return
    }

    if (e.key === 'Enter') {
      addNewPage()
    } else if (e.key === 'Escape') {
      resetStates()
    }
  }

  useEffect(() => {
    setPageDomain(window.location.origin)
  }, [])

  const addNewPage = async () => {
    if (pageUrl === '' || pageCondition === '' || pageVisibility === '') {
      toast({ status: 'warning', position: 'top-right', description: 'All fields are required' })
      return
    }

    setWidget((prev) => {
      prev.exclude_pages.push({ url: pageUrl, condition: pageCondition, visibility: pageVisibility })
    })
    resetStates()

    const response = await updateWidget(produce(widget, (draft) => {
      draft.exclude_pages.push({ url: pageUrl, condition: pageCondition, visibility: pageVisibility })
    }))
    ResponseToast({ toast, response, action: 'create', messageFor: 'Widget page' })
  }

  const addPageButtonClickHandle = () => {
    setIsAdding(true)
    setPageVisibility('showOn')
    setPageCondition('contains')
  }

  const resetStates = () => {
    setIsAdding(false)
    setPageName('')
    setPageCondition('')
    setPageVisibility('')
  }

  return (
    <Box>
      <Title>Page Filters</Title>

      <Box mt={4}>
        <Box mb="4" rounded={'md'} borderWidth={`${widget.exclude_pages.length && '1px'}`}>
          {widget.exclude_pages.map((page, index) => (
            <Page key={page?.url} index={index} pageDomain={pageDomain} page={page} updateWidget={updateWidget} isWidgetUpdating={isWidgetUpdating} />
          ))}
        </Box>
      </Box>

      {isAdding && (
        <Box mb={4} maxW="full" overflowX="auto">
          <HStack mb={2} spacing="0" gap="2">
            <Select w="15rem" minW="7rem" maxW="full" onChange={(e) => setPageVisibility(e.target.value)}>
              <option value="showOn">Show On</option>
              <option value="hideOn">Hide On</option>
            </Select>
            <Select w="25rem" minW="10rem" maxW="full" onChange={(e) => setPageCondition(e.target.value)}>
              <option value="contains">Pages that contain</option>
              <option value="equal">Specific page</option>
              <option value="startWith">Pages stars with</option>
              <option value="endWith">Pages ended with</option>
            </Select>
            <InputGroup>
              <InputLeftAddon children={`${pageDomain}/`} />
              <Input minW="10rem" placeholder="Page url" value={pageUrl ?? ''} onChange={(e) => setPageName(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
            </InputGroup>

            <Tooltip label="Cancel">
              <IconButton isRound={true} aria-label="Remove Page" variant="ghost" colorScheme="red" icon={<HiOutlineTrash />} onClick={resetStates} />
            </Tooltip>
            <Tooltip label="Save">
              <IconButton
                isRound={true}
                aria-label="Remove Page"
                variant="ghost"
                colorScheme="green"
                icon={<HiCheck />}
                onClick={() => addNewPage()}
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
        <Button leftIcon={<HiPlus />} colorScheme="gray" variant="outline" onClick={addPageButtonClickHandle} isLoading={isWidgetUpdating}>
          Add Page
        </Button>
      )}
    </Box>
  )
}

export default PageFilters
