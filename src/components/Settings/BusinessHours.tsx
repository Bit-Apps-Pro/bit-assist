// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Checkbox, FormControl, FormLabel, HStack, Input, Switch, Text, useToast, VStack } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search'
import { Timezones } from '@components/Settings/Timezones'
import ResponseToast from '@components/Global/ResponseToast'
import produce from 'immer'

// import '/node_modules/react-select-search/style.css'
// import '@components/Settings/Timezone.module.css'

const BusinessHours = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [selectedTimezone, setSelectedTimezone] = useState<string | string[]>()
  const [isChanged, setIsChanged] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [defaultBusinessHours] = useState([
    {
      day: 'monday',
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'tuesday',
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'wednesday',
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'thursday',
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'friday',
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'saturday',
    },
    {
      day: 'sunday',
    },
  ])

  useEffect(() => {
    if (widget.business_hours.length > 0) {
      setIsEnabled(true)
    }
  }, [])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setIsChanged(true)

    setWidget((prev) => {
      prev.business_hours[index][e.target.name] = e.target.value
    })
  }

  const updateChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!isChanged) {
      return
    }
    const response = await updateWidget(
      produce(widget, (draft) => {
        draft.business_hours[index][e.target.name] = e.target.value
      })
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
    setIsChanged(false)
  }

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.checked) {
      setWidget((prev) => {
        prev.business_hours[index].start = '09:00'
        prev.business_hours[index].end = '18:00'
      })

      const response = await updateWidget(
        produce(widget, (draft) => {
          draft.business_hours[index].start = '09:00'
          draft.business_hours[index].end = '18:00'
        })
      )
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
    } else {
      setWidget((prev) => {
        delete prev.business_hours[index].start
        delete prev.business_hours[index].end
      })

      const response = await updateWidget(
        produce(widget, (draft) => {
          delete draft.business_hours[index].start
          delete draft.business_hours[index].end
        })
      )
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
    }
  }

  const handleTimezoneChange = (selectedOption: SelectedOptionValue) => {
    setSelectedTimezone(selectedOption.toString())
  }

  const fuzzySearch = (options: SelectSearchOption[]) => {
    return (searchTerm: string) => {
      return options.filter((option) => {
        return option.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }
  }

  const handleSwitchEnable = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled((prev) => !prev)

    if (!isEnabled) {
      enabledBusinessHours()
    } else {
      disabledBusinessHours()
    }
  }

  const enabledBusinessHours = async () => {
    setWidget((prev) => {
      prev.business_hours = defaultBusinessHours
    })

    const response = await updateWidget(
      produce(widget, (draft) => {
        draft.business_hours = defaultBusinessHours
      })
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
  }

  const disabledBusinessHours = async () => {
    setWidget((prev) => {
      prev.business_hours = []
    })

    const response = await updateWidget(
      produce(widget, (draft) => {
        draft.business_hours = []
      })
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
  }

  return (
    <Box>
      <Title>Business Hours</Title>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="businessHours" mb="0">
          Enable Business Hours
        </FormLabel>
        <Switch isChecked={isEnabled} colorScheme={'purple'} onChange={handleSwitchEnable} id="businessHours" />
      </FormControl>

      {isEnabled && (
        <Box mt={4}>
          <VStack alignItems={'flex-start'}>
            <VStack alignItems={'flex-start'} mb="2">
              <Text>TimeZone</Text>
              <Box w="22rem">
                <SelectSearch
                  search
                  filterOptions={fuzzySearch}
                  options={Timezones}
                  onChange={handleTimezoneChange}
                  value={selectedTimezone}
                  placeholder="Choose your timezone"
                />
              </Box>
            </VStack>

            {widget.business_hours.map((item, index) => (
              <HStack key={index} minH="10">
                <Checkbox size="lg" colorScheme="purple" isChecked={item?.start !== undefined} onChange={(e) => handleCheckboxChange(e, index)}>
                  <Text w="24" fontSize={'md'}>
                    {item?.day && item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                  </Text>
                </Checkbox>
                {item?.start !== undefined && (
                  <>
                    <Input
                      w="24"
                      name="start"
                      placeholder="09:00"
                      value={item?.start}
                      onChange={(e) => handleInputChange(e, index)}
                      onBlur={(e) => updateChange(e, index)}
                    />
                    <Text>-</Text>
                    <Input
                      w="24"
                      name="end"
                      placeholder="18:00"
                      value={item?.end}
                      onChange={(e) => handleInputChange(e, index)}
                      onBlur={(e) => updateChange(e, index)}
                    />
                  </>
                )}
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default BusinessHours
