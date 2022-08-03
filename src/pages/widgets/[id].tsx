import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue } from '@chakra-ui/react'
import Customizations from '@components/customizations/Customizations'
import Publish from '@components/publish/Publish'
import WidgetChannels from '@components/widgetChannels/WidgetChannels'
import Settings from '@components/settings/Settings'
import { widgetAtom } from '@globalStates/atoms'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import useFetchWidget from '@hooks/queries/widget/useFetchWidget'
import Head from 'next/head'

const Widget = () => {
  const [, setWidget] = useAtom(widgetAtom)
  const { widget } = useFetchWidget()
  const tabColorMode = useColorModeValue('rgba(255, 255, 255, 0.75)', 'rgba(26,32,44,0.75)')

  useEffect(() => {
    setWidget(widget)
  }, [widget])

  return (
    <>
      <Head>
        <title>Widget</title>
        <meta name="description" content="Bit Assist" />
        <meta name="keywords" content="BitCode, Bit, Code, Bit Assist, Assist, Bit Form, Form, Bit Integrations, Integrations, Bit Flow, Flow" />
      </Head>

      <Tabs variant="solid-rounded" colorScheme="purple">
        <TabList
          gap={['1', '2']}
          justifyContent="center"
          flexWrap="wrap"
          position="sticky"
          top="0"
          py="2"
          zIndex={2}
          bg={tabColorMode}
          backdropFilter="blur(10px)"
        >
          <Tab rounded="md">Channels</Tab>
          <Tab rounded="md">Customizations</Tab>
          <Tab rounded="md">Settings</Tab>
          <Tab rounded="md">Publish</Tab>
        </TabList>
        <TabPanels mx="auto" borderWidth="1.5px" rounded="lg" shadow="lg" mt="2" p={[0, 4]}>
          <TabPanel>
            <WidgetChannels />
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

Widget.auth = process.env.NODE_ENV === 'development' ? false : true

export default Widget
