import { FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Skype = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Skype username</FormLabel>
        <Input id="unique_id" value={flow.config.unique_id} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        <FormHelperText>Your skype username. Example: john_smith.238746</FormHelperText>
      </FormControl>

      <Text>-Or-</Text>

      <FormControl>
        <FormLabel htmlFor="phone_number">(Skype) Phone number</FormLabel>
        <Input id="phone_number" type="tel" value={flow.config.phone_number} onChange={(e) => handleChanges(e.target.value, 'phone_number')} />
        <FormHelperText>Including land code. Example: +123123123</FormHelperText>
      </FormControl>
    </>
  )
}

export default Skype
