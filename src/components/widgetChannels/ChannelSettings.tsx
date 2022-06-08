import { VStack, Input, Button, FormControl, FormLabel, Switch, FormHelperText } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { flowAtom, resetFlowAtom } from '@globalStates/atoms'
import { MdArrowBackIosNew } from 'react-icons/md'
import SaveButton from '@components/widgetChannels/SaveButton'
import React from 'react'
import Whatsapp from '@components/widgetChannels/channels/Whatsapp'
import Facebook from '@components/widgetChannels/channels/Facebook'
import Twitter from '@components/widgetChannels/channels/Twitter'
import Instagram from '@components/widgetChannels/channels/Instagram'
import Telegram from '@components/widgetChannels/channels/Telegram'
import Skype from '@components/widgetChannels/channels/Skype'

const ChannelSettings = () => {
  const [flow, setFlow] = useAtom(flowAtom)
  const [, resetFlow] = useAtom(resetFlowAtom)

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  console.log('flow.config', flow.config)

  return (
    <>
      <VStack alignItems="flex-start">
        <Button onClick={resetFlow}>
          <MdArrowBackIosNew />
        </Button>

        <FormControl isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" value={flow.config.title} onChange={(e) => handleChanges(e.target.value, 'title')} />
          <FormHelperText>Descriptive text for visitors.</FormHelperText>
        </FormControl>

        <Whatsapp />
        <Facebook />
        <Twitter />
        <Skype />
        <Instagram />
        <Telegram />

        <FormControl>
          <FormLabel htmlFor="hide_after_office">
            Hide After Office
            <Switch
              ml="2"
              id="hide_after_office"
              colorScheme="purple"
              isChecked={!!flow.config?.hide_after_office}
              onChange={(e) => handleChanges(e.target.checked, 'hide_after_office')}
            />
          </FormLabel>
          <FormHelperText>Hide this channel after office time.</FormHelperText>
        </FormControl>
      </VStack>

      <SaveButton />
    </>
  )
}

export default ChannelSettings
