import { Stack } from '@chakra-ui/react'
import BusinessHours from '@components/Settings/BusinessHours'
import PageFilters from '@components/Settings/PageFilters'
import Trigger from '@components/Settings/Trigger'
import WidgetBehavior from '@components/Settings/WidgetBehavior'
import FontFamily from '@components/Settings/FontFamily'
import CallToAction from '@components/Settings/CallToAction'
import Responses from '@components/Settings/Responses'

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