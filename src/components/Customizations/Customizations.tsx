import { Stack } from '@chakra-ui/react'
import WidgetIcons from '@components/Customizations/WidgetIcons'
import WidgetPositions from './WidgetPositions'
import WidgetColor from '@components/Customizations/WidgetColor'
import WidgetName from '@components/Customizations/WidgetName'

const Customizations = () => {
  return (
    <Stack gap="10">
      <WidgetName />
      <WidgetColor />
      <WidgetIcons />
      <WidgetPositions />
    </Stack>
  )
}

export default Customizations
