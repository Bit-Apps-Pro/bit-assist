import { Stack } from '@chakra-ui/react'
import WidgetIcons from '@components/Customizations/WidgetIcons'
import WidgetPositions from './WidgetPositions'
import WidgetColor from '@components/Customizations/WidgetColor'
import WidgetName from '@components/Customizations/WidgetName'
import WidgetSize from '@components/Customizations/WidgetSize'
import WidgetShape from '@components/Customizations/WidgetShape'
import CustomCSS from '@components/Customizations/CustomCSS'

const Customizations = () => {
  return (
    <Stack gap="10">
      <WidgetName />
      <WidgetColor />
      <WidgetIcons />
      <WidgetPositions />
      <WidgetSize />
      <WidgetShape />
      <CustomCSS />
    </Stack>
  )
}

export default Customizations
