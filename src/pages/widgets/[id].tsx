import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Customizations from '@components/customizations/Customizations'
import Publish from '@components/publish/Publish'
import Channels from '@components/channels/Channels'
import Settings from '@components/settings/Settings'
import { widgetAtom } from '@globalStates/atoms'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import useFetchWidget from '@hooks/queries/widget/useFetchWidget'
import Head from 'next/head'

const Widget = () => {
  const [, setWidget] = useAtom(widgetAtom)
  const { widget } = useFetchWidget()

  useEffect(() => {
    setWidget(widget)
  }, [widget, setWidget])

  return (
    <>
      <Head>
        <title>Widget</title>
        <meta name="description" content="Bit Assist" />
        <meta name="keywords" content="BitCode, Bit, Code, Bit Assist, Assist, Bit Form, Form, Bit Integrations, Integrations, Bit Flow, Flow" />
      </Head>
      <Tabs variant="solid-rounded" colorScheme="purple">
        <TabList gap="2" justifyContent="center">
          <Tab>Channels</Tab>
          <Tab>Customizations</Tab>
          <Tab>Settings</Tab>
          <Tab>Publish</Tab>
        </TabList>
        <TabPanels borderWidth="1.5px" rounded="lg" shadow="lg" mt="6" p="4">
          <TabPanel>
            <Channels />
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
    </>
  )
}

export default Widget
