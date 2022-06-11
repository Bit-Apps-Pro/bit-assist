/* eslint-disable react/no-children-prop */
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Discord = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Discord invite code</FormLabel>
        <InputGroup>
          <InputLeftAddon children="discord.gg/" />
          <Input id="unique_id" value={flow.config?.unique_id ?? ''} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        </InputGroup>
      </FormControl>
    </>
  )
}

export default Discord
