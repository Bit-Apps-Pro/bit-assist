import { Box, Button } from '@chakra-ui/react'
import { editWidgetChannelIdAtom, flowAtom } from '@globalStates/atoms'
import useUpdateWidgetChannel from '@hooks/mutations/widgetChannel/useUpdateWidgetChannel'
import { useAtom } from 'jotai'

const UpdateButton = ({ closeModal }) => {
  const [flow] = useAtom(flowAtom)
  const [editWidgetChannelId] = useAtom(editWidgetChannelIdAtom)
  const { updateWidgetChannel, isWidgetChannelUpdating } = useUpdateWidgetChannel()

  const addNewWidgetChannel = async () => {
    const newFlow = { ...flow }
    delete newFlow['step']
    delete newFlow['channel_name']
    await updateWidgetChannel(newFlow, editWidgetChannelId)
    closeModal()
  }

  return (
    <Box textAlign="right" mt="4">
      <Button
        onClick={addNewWidgetChannel}
        isLoading={isWidgetChannelUpdating}
        spinnerPlacement="start"
        loadingText="Updating..."
        colorScheme="purple"
      >
        Update
      </Button>
    </Box>
  )
}

export default UpdateButton
