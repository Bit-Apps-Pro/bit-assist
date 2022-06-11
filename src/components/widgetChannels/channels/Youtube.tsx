/* eslint-disable react/no-children-prop */
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Youtube = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">youtube page</FormLabel>
        <InputGroup>
          <InputLeftAddon children="youtube.com/" />
          <Input id="unique_id" value={flow.config?.unique_id ?? ''} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        </InputGroup>
      </FormControl>
    </>
  )
}

export default Youtube
