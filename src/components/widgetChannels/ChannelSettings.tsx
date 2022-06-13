import { VStack, Input, FormControl, FormLabel, Switch, FormHelperText, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'

import SaveButton from '@components/widgetChannels/SaveButton'
import Whatsapp from '@components/widgetChannels/channels/Whatsapp'
import Facebook from '@components/widgetChannels/channels/Facebook'
import Twitter from '@components/widgetChannels/channels/Twitter'
import Instagram from '@components/widgetChannels/channels/Instagram'
import Telegram from '@components/widgetChannels/channels/Telegram'
import Skype from '@components/widgetChannels/channels/Skype'
import Discord from '@components/widgetChannels/channels/Discord'
import Line from '@components/widgetChannels/channels/Line'
import Snapchat from '@components/widgetChannels/channels/Snapchat'
import Viber from '@components/widgetChannels/channels/Viber'
import WeChat from '@components/widgetChannels/channels/WeChat'
import SMS from '@components/widgetChannels/channels/SMS'
import Linkedin from '@components/widgetChannels/channels/Linkedin'
import TikTok from '@components/widgetChannels/channels/TikTok'
import GoogleMap from '@components/widgetChannels/channels/GoogleMap'
import Slack from '@components/widgetChannels/channels/Slack'
import Youtube from '@components/widgetChannels/channels/Youtube'
import Call from '@components/widgetChannels/channels/Call'
import UpdateButton from '@components/widgetChannels/UpdateButton'

const ChannelSettings = ({ edit = false }) => {
  const [flow, setFlow] = useAtom(flowAtom)

  const handleChanges = (value: string | number | boolean | (string | number)[], key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  return (
    <>
      <VStack alignItems="flex-start" spacing="4">
        <FormControl isRequired>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" value={flow.config.title} onChange={(e) => handleChanges(e.target.value, 'title')} />
          <FormHelperText>Descriptive text for visitors.</FormHelperText>
        </FormControl>

        {flow.channel_name?.toLowerCase() === 'discord' && <Discord />}
        {flow.channel_name?.toLowerCase() === 'line' && <Line />}
        {flow.channel_name?.toLowerCase() === 'snapchat' && <Snapchat />}
        {flow.channel_name?.toLowerCase() === 'viber' && <Viber />}
        {flow.channel_name?.toLowerCase() === 'wechat' && <WeChat />}
        {flow.channel_name?.toLowerCase() === 'sms' && <SMS />}
        {flow.channel_name?.toLowerCase() === 'linkedin' && <Linkedin />}
        {flow.channel_name?.toLowerCase() === 'tiktok' && <TikTok />}
        {flow.channel_name?.toLowerCase() === 'googlemap' && <GoogleMap />}
        {flow.channel_name?.toLowerCase() === 'slack' && <Slack />}
        {flow.channel_name?.toLowerCase() === 'youtube' && <Youtube />}
        {flow.channel_name?.toLowerCase() === 'call' && <Call />}
        {flow.channel_name?.toLowerCase() === 'skype' && <Skype />}
        {flow.channel_name?.toLowerCase() === 'whatsapp' && <Whatsapp />}
        {flow.channel_name?.toLowerCase() === 'facebook' && <Facebook />}
        {flow.channel_name?.toLowerCase() === 'twitter' && <Twitter />}
        {flow.channel_name?.toLowerCase() === 'instagram' && <Instagram />}
        {flow.channel_name?.toLowerCase() === 'telegram' && <Telegram />}

        <FormControl>
          <FormLabel htmlFor="hide_after_office_hours">
            Hide after office hours
            <Switch
              ml="2"
              id="hide_after_office_hours"
              colorScheme="purple"
              isChecked={!!flow.config?.hide_after_office_hours}
              onChange={(e) => handleChanges(e.target.checked, 'hide_after_office_hours')}
            />
          </FormLabel>
          <FormHelperText>Hide this channel after office time.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Channel show on</FormLabel>
          <CheckboxGroup onChange={(val) => handleChanges(val, 'channel_show_on')} colorScheme="purple" value={flow.config?.channel_show_on ?? []}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox size="lg" value="desktop">
                Desktop
              </Checkbox>
              <Checkbox size="lg" value="mobile">
                Mobile
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
      </VStack>

      {edit ? <UpdateButton /> : <SaveButton />}
    </>
  )
}

export default ChannelSettings
