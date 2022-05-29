import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Customizations from '@components/Customizations/Customizations'
import Publish from '@components/Publish/Publish'
import Integrations from '@components/Integrations/Integrations'
import Settings from '@components/Settings/Settings'
import { serializeObj } from '@utils/utils'
import { widgetAtom } from '@globalStates/atoms'
import db from '@db'
import { useHydrateAtoms } from 'jotai/utils'

const Widget = ({ widgetFromServer }) => {
  useHydrateAtoms([[widgetAtom, widgetFromServer]])

  return (
    <Tabs variant="solid-rounded" colorScheme="purple">
      <TabList gap="2" justifyContent="center">
        <Tab>Integrations</Tab>
        <Tab>Customizations</Tab>
        <Tab>Settings</Tab>
        <Tab>Publish</Tab>
      </TabList>
      <TabPanels borderWidth="1.5px" rounded="lg" shadow="lg" mt="6" p="4">
        <TabPanel>
          <Integrations />
        </TabPanel>
        <TabPanel>
          <Customizations />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
        <TabPanel>
          <Publish />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Widget

export async function getServerSideProps(context) {
  const { id } = context.query
  const widget = await db.chat_widgets.findUnique({
    where: { id },
  })

  return {
    props: { widgetFromServer: serializeObj(widget) },
  }
}