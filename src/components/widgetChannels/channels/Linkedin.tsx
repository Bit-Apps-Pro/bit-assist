import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import OpenWindowAction from '@components/widgetChannels/channels/OpenWindowAction'

const Linkedin = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="unique_id">User name</FormLabel>
        <Input id="unique_id" value={flow.config?.unique_id ?? ''} onChange={(e) => handleChanges(e.target.value, 'unique_id')} />
      </FormControl>
      <OpenWindowAction value={flow.config?.open_window_action ?? ''} handleChanges={handleChanges} />
    </>
  )
}

export default Linkedin
