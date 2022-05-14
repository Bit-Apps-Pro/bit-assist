import { Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'

const Index = () => {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green" mt={12}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Index
