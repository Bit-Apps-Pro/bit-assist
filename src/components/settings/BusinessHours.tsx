// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Checkbox, FormControl, FormLabel, HStack, Input, Switch, Text, useToast, VStack } from '@chakra-ui/react'
import Title from '@components/global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/widget/useUpdateWidget'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import SelectSearch from 'react-select-search'
import { Timezones } from '@components/settings/Timezones'
import ResponseToast from '@components/global/ResponseToast'
import { produce } from 'immer'
import { debounce } from 'lodash'
import { SelectedOptionValue } from '@globalStates/Interfaces'
import 'react-select-search/style.css'

const BusinessHours = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget } = useUpdateWidget()
  const [isChanged, setIsChanged] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [defaultBusinessHours] = useState([
    { day: 'sunday', start: '09:00', end: '18:00' },
    { day: 'monday', start: '09:00', end: '18:00' },
    { day: 'tuesday', start: '09:00', end: '18:00' },
    { day: 'wednesday', start: '09:00', end: '18:00' },
    { day: 'thursday', start: '09:00', end: '18:00' },
    { day: 'friday' },
    { day: 'saturday' },
  ])

  useEffect(() => {
    if (widget.business_hours.length > 0) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }, [widget.business_hours])

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
    debounceUpdateWidget(
      produce(widget, (draft) => {
        draft.business_hours[index][e.target.name] = e.target.value
      }),
    )
    setIsChanged(false)
  }

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.checked) {
      setWidget((prev) => {
        prev.business_hours[index].start = '09:00'
        prev.business_hours[index].end = '18:00'
      })

      debounceUpdateWidget(
        produce(widget, (draft) => {
          draft.business_hours[index].start = '09:00'
          draft.business_hours[index].end = '18:00'
        }),
      )
    } else {
      setWidget((prev) => {
        delete prev.business_hours[index].start
        delete prev.business_hours[index].end
      })

      debounceUpdateWidget(
        produce(widget, (draft) => {
          delete draft.business_hours[index].start
          delete draft.business_hours[index].end
        }),
      )
    }
  }

  const handleTimezoneChange = async (selectedOption: SelectedOptionValue) => {
    setWidget((prev) => {
      prev.timezone = selectedOption.toString()
    })

    const response = await updateWidget(
      produce(widget, (draft) => {
        draft.timezone = selectedOption.toString()
      }),
    )
    ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
  }

  const handleSwitchEnable = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(e.target.checked)
    const val = e.target.checked ? defaultBusinessHours : []

    setWidget((prev) => {
      prev.business_hours = val
    })

    debounceUpdateWidget(
      produce(widget, (draft) => {
        draft.business_hours = val
      }),
    )
  }

  const debounceUpdateWidget = useRef(
    debounce(async (widget) => {
      const response: any = await updateWidget(widget)
      ResponseToast({ toast, response, action: 'update', messageFor: 'Widget business hours' })
    }, 1000),
  ).current

  useEffect(() => {
    return () => {
      debounceUpdateWidget.cancel()
    }
  }, [debounceUpdateWidget])

  return (
    <Box>
      <Title>Business Hours</Title>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="businessHours" mb="0">
          Enable Business Hours
        </FormLabel>
        <Switch isChecked={!!isEnabled} colorScheme={'purple'} onChange={handleSwitchEnable} id="businessHours" />
      </FormControl>

      {isEnabled && (
        <Box mt={4}>
          <VStack alignItems="flex-start">
            <VStack alignItems="flex-start" mb="2" maxW="full">
              <Text>TimeZone</Text>
              <Box id="timezoneSelect" w="lg" maxW="full">
                <SelectSearch
                  search
                  options={Timezones}
                  onChange={handleTimezoneChange}
                  defaultValue={widget.timezone ?? ''}
                  placeholder="Choose your timezone"
                  className="select-search"
                />
              </Box>
            </VStack>

            {widget.business_hours.map((item, index) => (
              <HStack key={index} minH="10" maxW="full">
                <Checkbox
                  size="lg"
                  colorScheme="purple"
                  isChecked={!!item?.start}
                  onChange={(e) => handleCheckboxChange(e, index)}
                >
                  <Text w="24" fontSize={'md'}>
                    {item?.day && item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                  </Text>
                </Checkbox>
                {!!item?.start && (
                  <>
                    <Input
                      w="24"
                      name="start"
                      placeholder="09:00"
                      value={item?.start ?? ''}
                      onChange={(e) => handleInputChange(e, index)}
                      onBlur={(e) => updateChange(e, index)}
                    />
                    <Text>-</Text>
                    <Input
                      w="24"
                      name="end"
                      placeholder="18:00"
                      value={item?.end ?? ''}
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
