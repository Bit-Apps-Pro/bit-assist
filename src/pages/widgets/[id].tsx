import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Customizations from '../../components/Customizations'
import Installation from '../../components/Installation'
import Integrations from '../../components/Integrations'
import Settings from '../../components/Settings'

const Widget = () => {
  return (
    <Tabs variant="solid-rounded" colorScheme="teal">
      <TabList gap="2" justifyContent="center">
        <Tab>Installation</Tab>
        <Tab>Integrations</Tab>
        <Tab>Settings</Tab>
        <Tab>Customizations</Tab>
      </TabList>
      <TabPanels borderWidth="1px" rounded="lg" shadow="md" mt="6" p="4">
        <TabPanel>
          <Installation />
        </TabPanel>
        <TabPanel>
          <Integrations />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
        <TabPanel>
          <Customizations />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Widget
