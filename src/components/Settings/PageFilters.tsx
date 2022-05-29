/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Kbd,
  Select,
  Switch,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { useAtom } from 'jotai'
import { useState } from 'react'
import Page from '@components/Settings/Page'
import { HiCheck, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import ResponseToast from '@components/Global/ResponseToast'

const PageFilters = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [isEnabled, setIsEnabled] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

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

  const addNewPage = async () => {
    if (pageUrl === '' || pageCondition === '' || pageVisibility === '') {
      toast({
        status: 'warning',
        position: 'top-right',
        description: 'All fields are required',
      })
      return
    }

    setWidget((prev) => {
      prev.exclude_pages.push(pageUrl)
      // prev.exclude_pages.push({ url: pageUrl, condition: pageCondition, visibility: pageVisibility })
    })
    resetStates()

    const response = await updateWidget({
      ...widget,
      exclude_pages: [...widget.exclude_pages, pageUrl],
      // exclude_pages: [...widget.exclude_pages, { url: pageUrl, condition: pageCondition, visibility: pageVisibility }],
    })
    ResponseToast({
      toast,
      response,
      action: 'create',
      messageFor: 'Widget page',
    })
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

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="pageFilters" mb="0">
          Enable Page Filters
        </FormLabel>
        <Switch isChecked={isEnabled} colorScheme={'purple'} onChange={() => setIsEnabled((prev) => !prev)} id="pageFilters" />
      </FormControl>

      {isEnabled && (
        <Box mt={4}>
          <Box mb="4" rounded={'md'} borderWidth={`${widget.exclude_pages.length && '1px'}`}>
            {widget.exclude_pages.map((page, index) => (
              <Page key={index} index={index} page={page} updateWidget={updateWidget} isWidgetUpdating={isWidgetUpdating} />
            ))}
          </Box>
        </Box>
      )}

      {isAdding && (
        <Box mb={4}>
          <HStack mb={2}>
            <Select w="15rem" maxW="full" onChange={(e) => setPageVisibility(e.target.value)}>
              <option value="showOn">Show On</option>
              <option value="hideOn">Hide On</option>
            </Select>
            <Select w="25rem" maxW="full" onChange={(e) => setPageCondition(e.target.value)}>
              <option value="contains">Pages that contain</option>
              <option value="equal">Specific page</option>
              <option value="startWith">Pages stars with</option>
              <option value="endWith">Pages ended with</option>
            </Select>
            <InputGroup>
              <InputLeftAddon children={'http://'} />
              <Input placeholder="Page url" value={pageUrl} onChange={(e) => setPageName(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
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
            <Kbd>enter</Kbd> to add, &nbsp; <Kbd>esc</Kbd> to cancel
          </span>
        </Box>
      )}

      {!isAdding && (
        <Button leftIcon={<HiPlus />} colorScheme="purple" variant="outline" rounded={'full'} onClick={addPageButtonClickHandle} isLoading={isWidgetUpdating}>
          Add Page
        </Button>
      )}
    </Box>
  )
}

export default PageFilters
