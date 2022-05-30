import { Box, Checkbox, FormControl, FormLabel, HStack, Input, Switch, Text, useToast, VStack } from '@chakra-ui/react'
import Title from '@components/Global/Title'
import { widgetAtom } from '@globalStates/atoms'
import useUpdateWidget from '@hooks/mutations/useUpdateWidget'
import { useAtom } from 'jotai'
import { useState } from 'react'
import TimezoneSelect, { ITimezone } from 'react-timezone-select'

const BusinessHours = () => {
  const toast = useToast({ isClosable: true })
  const [widget, setWidget] = useAtom(widgetAtom)
  const { updateWidget, isWidgetUpdating } = useUpdateWidget()
  const [isEnabled, setIsEnabled] = useState(true)
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>('')
  const [days, setDays] = useState({
    monday: {
      start: '09:00',
      end: '18:00',
    },
    tuesday: {
      start: '09:00',
      end: '18:00',
    },
    wednesday: {
      start: '09:00',
      end: '18:00',
    },
    thursday: {
      start: '09:00',
      end: '18:00',
    },
    friday: {
      start: '09:00',
      end: '18:00',
    },
    saturday: null,
    sunday: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
    setDays((prev) => ({ ...prev, [day]: { ...prev[day], [e.target.name]: e.target.value } }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
    if (e.target.checked) {
      setDays((prev) => ({ ...prev, [day]: { start: '09:00', end: '18:00' } }))
    } else {
      setDays((prev) => ({ ...prev, [day]: null }))
    }
  }

  return (
    <Box>
      <Title>Business Hours</Title>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="businessHours" mb="0">
          Enable Business Hours
        </FormLabel>
        <Switch isChecked={isEnabled} colorScheme={'purple'} onChange={() => setIsEnabled((prev) => !prev)} id="businessHours" />
      </FormControl>

      {isEnabled && (
        <Box mt={4}>
          <VStack alignItems={'flex-start'}>
            <VStack alignItems={'flex-start'} mb="2">
              <Text>TimeZone</Text>
              <Box w="22rem">
                <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
              </Box>
            </VStack>

            {Object.keys(days).map((day) => (
              <HStack key={day} minH="10">
                <Checkbox size="lg" colorScheme="purple" isChecked={days[day] !== null} onChange={(e) => handleCheckboxChange(e, day)} />
                <Text w="24" verticalAlign={'center'}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Text>
                {days[day] !== null && (
                  <>
                    <Input w="24" name="start" placeholder="09:00" value={days[day]?.start} onChange={(e) => handleChange(e, day)} />
                    <Text>-</Text>
                    <Input w="24" name="end" placeholder="18:00" value={days[day]?.end} onChange={(e) => handleChange(e, day)} />
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
