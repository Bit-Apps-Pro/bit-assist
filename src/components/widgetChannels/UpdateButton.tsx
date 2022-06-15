import { Box, Button } from '@chakra-ui/react'
import { editWidgetChannelIdAtom, flowAtom } from '@globalStates/atoms'
import useUpdateWidgetChannel from '@hooks/mutations/widgetChannel/useUpdateWidgetChannel'
import { useAtom } from 'jotai'

const UpdateButton = () => {
  const [flow] = useAtom(flowAtom)
  const [editWidgetChannelId] = useAtom(editWidgetChannelIdAtom)
  const { updateWidgetChannel, isWidgetChannelUpdating } = useUpdateWidgetChannel()

  const addNewWidgetChannel = () => {
    const newFlow = { ...flow }
    delete newFlow['step']
    delete newFlow['channel_name']
    updateWidgetChannel(newFlow, editWidgetChannelId)
  }

  return (
    <Box textAlign="right" mt="4">
      <Button
        onClick={addNewWidgetChannel}
        isLoading={isWidgetChannelUpdating}
        spinnerPlacement="start"
        loadingText="Updating..."
        colorScheme="purple"
        autoFocus
      >
        Update
      </Button>
    </Box>
  )
}

export default UpdateButton
