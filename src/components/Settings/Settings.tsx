import { Stack } from '@chakra-ui/react'
import BusinessHours from '@components/Settings/BusinessHours'
import PageFilters from '@components/Settings/PageFilters'
import Trigger from '@components/Settings/Trigger'
import OpenWidget from '@components/Settings/OpenWidget'
import StoreResponses from '@components/Settings/StoreResponses'
import DeleteResponses from '@components/Settings/DeleteResponses'
import FontFamily from '@components/Settings/FontFamily'
import CallToAction from '@components/Settings/CallToAction'

const Settings = () => {
  return (
    <Stack gap="10">
      <BusinessHours />
      <PageFilters />
      <Trigger />
      <CallToAction />
      <OpenWidget />
      <FontFamily />
      <StoreResponses />
      <DeleteResponses />
    </Stack>
  )
}

export default Settings