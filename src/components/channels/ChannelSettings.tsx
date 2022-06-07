import { VStack, Input, Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { flowAtom } from '@globalStates/atoms'
import { MdArrowBackIosNew } from 'react-icons/md'
import SaveButton from '@components/channels/SaveButton'
import React from 'react'
import { FlowDefault } from '@globalStates/DefaultStates'

const ChannelSettings = () => {
  const [flow, setFlow] = useAtom(flowAtom)

  const goBack = () => {
    setFlow({ ...FlowDefault })
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlow((prev) => {
      prev.config.title = e.target.value
    })
  }

  return (
    <>
      <VStack spacing="4" alignItems="flex-start">
        <Button onClick={goBack}>
          <MdArrowBackIosNew />
        </Button>
        <Input placeholder="Channel Title" onChange={onTitleChange} />
      </VStack>

      <SaveButton />
    </>
  )
}

export default ChannelSettings
