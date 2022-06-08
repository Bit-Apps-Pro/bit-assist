import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Whatsapp = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Phone number</FormLabel>
        <Input id="unique_id" type="tel" value={flow.config.unique_id} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        <FormHelperText>Including land code. Example: +123123123</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="message">Message</FormLabel>
        <Input id="message" value={flow.config.message} onChange={(e) => handleChanges(e.target.value, 'message')} />
        <FormHelperText>Including land code. Example: +123123123</FormHelperText>
      </FormControl>
    </>
  )
}

export default Whatsapp
