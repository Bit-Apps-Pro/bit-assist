import { Stack } from '@chakra-ui/react'
import BusinessHours from '@components/settings/BusinessHours'
import PageFilters from '@components/settings/PageFilters'
import Trigger from '@components/settings/Trigger'
import WidgetBehavior from '@components/settings/WidgetBehavior'
import FontFamily from '@components/settings/FontFamily'
import CallToAction from '@components/settings/CallToAction'
import Responses from '@components/settings/Responses'

const Settings = () => {
  return (
    <Stack gap="10">
      <BusinessHours />
      <PageFilters />
      <Trigger />
      <CallToAction />
      <WidgetBehavior />
      {/* <FontFamily /> */}
      <Responses />
    </Stack>
  )
}

export default Settings