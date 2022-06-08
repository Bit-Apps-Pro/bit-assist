import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

const Facebook = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">Facebook username</FormLabel>
        <Input id="unique_id" value={flow.config.unique_id} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
        <FormHelperText>Your facebook username. Example: john_smith.238746</FormHelperText>
      </FormControl>
    </>
  )
}

export default Facebook
