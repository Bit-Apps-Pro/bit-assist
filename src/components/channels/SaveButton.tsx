import { Box, Button } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import useCreateWidgetChannel from '@hooks/mutations/widgetChannel/useCreateWidgetChannel'
import { useAtom } from 'jotai'

const SaveButton = () => {
  const [flow, setFlow] = useAtom(flowAtom)
  const { createWidgetChannel, isWidgetChannelCreating } = useCreateWidgetChannel()

  const addNewWidgetChannel = () => {
    createWidgetChannel({ ...flow })
  }

  return (
    <Box textAlign="right" mt="4">
      <Button onClick={addNewWidgetChannel} isLoading={isWidgetChannelCreating} spinnerPlacement="start" loadingText="Saving..." colorScheme="purple">
        Save
      </Button>
    </Box>
  )
}

export default SaveButton
