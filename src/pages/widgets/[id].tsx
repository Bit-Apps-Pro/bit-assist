import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Customizations from '../../components/Customizations/Customizations'
import Publish from '../../components/Publish/Publish'
import Integrations from '../../components/Integrations'
import Settings from '../../components/Settings'

const Widget = () => {
  return (
    <Tabs variant="solid-rounded" colorScheme="teal">
      <TabList gap="2" justifyContent="center">
        <Tab>Integrations</Tab>
        <Tab>Customizations</Tab>
        <Tab>Settings</Tab>
        <Tab>Publish</Tab>
      </TabList>
      <TabPanels borderWidth="1.5px" rounded="lg" shadow="lg" mt="6" p="4">
        <TabPanel><Integrations /></TabPanel>
        <TabPanel><Customizations /></TabPanel>
        <TabPanel><Settings /></TabPanel>
        <TabPanel><Publish /></TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Widget
