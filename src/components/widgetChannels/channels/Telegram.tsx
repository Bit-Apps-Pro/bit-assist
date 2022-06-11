import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Telegram = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Username</FormLabel>
        <Input id="unique_id" value={flow.config?.unique_id ?? ''} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
      </FormControl>
    </>
  )
}

export default Telegram
