/* eslint-disable react/no-children-prop */
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const GoogleMap = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Google maps link</FormLabel>

        <InputGroup>
          <InputLeftAddon children="goo.gl/maps/" />
          <Input id="unique_id" value={flow.config?.unique_id ?? ''} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        </InputGroup>
      </FormControl>
    </>
  )
}

export default GoogleMap
