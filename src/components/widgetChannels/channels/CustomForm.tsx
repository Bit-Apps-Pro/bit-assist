import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { TColor } from '@atomik-color/core/dist/types'
import { str2Color } from '@atomik-color/core'
import ColorPickerWrap from '@components/global/ColorPickerWrap'
import Field from './Fields/Field'
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FiPlus } from 'react-icons/fi'

const CustomForm = () => {
  const [flow, setFlow] = useAtom(flowAtom)
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    if (typeof flow.config?.form_config?.form_bg_color !== 'undefined') return
    setFlow((prev) => {
      if (typeof prev.config?.form_config === 'undefined') {
        prev.config.form_config = {}
      }
      prev.config.form_config = { form_bg_color: str2Color('#00ffa3'), form_text_color: str2Color('#fff'), submit_button_text: 'Submit' }
    })
  }, [])

  const handleColorChange = (color: TColor, key: string) => {
    setFlow((prev) => {
      prev.config.form_config[key] = color
    })
  }

  const handleFormChange = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config.form_config[key] = value
    })
  }

  const handleChanges = (value: string | number | boolean, key: string) => {
    setFlow((prev) => {
      prev.config[key] = value
    })
  }

  const handleAddField = (value: string) => {
    if (value === '') return

    setFlow((prev) => {
      if (typeof prev.config?.form_config?.form_fields === 'undefined') {
        prev.config.form_config.form_fields = []
      }
      prev.config.form_config.maxOrder = (prev.config.form_config.maxOrder || 0) + 1
      prev.config.form_config.form_fields.push({
        id: prev.config.form_config.maxOrder,
        label: value.charAt(0).toUpperCase() + value.slice(1),
        field_type: value,
        required: true,
      })
    })
  }

  const handleDeleteField = (index: number) => {
    setFlow((prev) => {
      prev.config.form_config.form_fields.splice(index, 1)
    })
  }

  const handleChangeField = (value: string | boolean | number, key: string, index: number) => {
    setFlow((prev) => {
      prev.config.form_config.form_fields[index][key] = value
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }) => {
    setActiveId(active?.id)
  }

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (active?.id !== over?.id) {
      const oldIndex = flow.config?.form_config?.form_fields.findIndex((item) => item?.id === active?.id)
      const newIndex = flow.config?.form_config?.form_fields.findIndex((item) => item?.id === over?.id)
      const newWidgetChannels = arrayMove(flow.config?.form_config?.form_fields, oldIndex, newIndex)
      setFlow((prev) => {
        prev.config.form_config.form_fields = newWidgetChannels
      })
    }
  }

  return (
    <>
      <VStack alignSelf={'center'} shadow="base" w="full" maxW="full" borderWidth={1} p={[2, 4]} rounded={'sm'}>
        {flow.config?.form_config?.form_fields && (
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={flow.config.form_config.form_fields.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <VStack w="full">
                {flow.config.form_config.form_fields.map((field, index) => {
                  return <Field key={field.id} id={index} field={field} handleChange={handleChangeField} handleDelete={handleDeleteField} />
                })}

                <DragOverlay style={{ marginTop: 0 }}>
                  {activeId && (
                    <Field
                      shadow="lg"
                      cursor="grabbing"
                      bg={'gray.100'}
                      id={activeId}
                      field={flow.config.form_config.form_fields.find((item) => item.id == activeId)}
                      handleChange={handleChangeField}
                      handleDelete={handleDeleteField}
                    />
                  )}
                </DragOverlay>
              </VStack>
            </SortableContext>
          </DndContext>
        )}

        <Popover>
          <PopoverTrigger>
            <Button rightIcon={<FiPlus />}>Add Field</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <SimpleGrid columns={3} gap={1}>
                <Button onClick={() => handleAddField('text')}>Text</Button>
                <Button onClick={() => handleAddField('email')}>Email</Button>
                <Button onClick={() => handleAddField('number')}>Number</Button>
                <Button onClick={() => handleAddField('date')}>Date</Button>
                <Button onClick={() => handleAddField('textarea')}>Textarea</Button>
                {/* <Button onClick={() => handleAddField('select')}>Select</Button> */}
                {/* <Button onClick={() => handleAddField('file')}>File</Button> */}
                {/* <Button onClick={() => handleAddField('rating')}>Rating</Button>
                <Button onClick={() => handleAddField('emoji')}>Emoji</Button>
                <Button onClick={() => handleAddField('feedback')}>Feedback</Button> */}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <FormControl>
          <FormLabel htmlFor="submitButtonText">Button Text</FormLabel>
          <Input
            id="submitButtonText"
            value={flow.config?.form_config?.submit_button_text ?? 'Submit'}
            onChange={(e) => handleFormChange(e.target.value, 'submit_button_text')}
          />
        </FormControl>
      </VStack>

      <Stack w={'full'} spacing="0" gap="2" flexDirection={['column', 'row']}>
        <FormControl>
          <FormLabel>Form Theme Color</FormLabel>
          <ColorPickerWrap color={flow.config?.form_config?.form_bg_color} handleChange={(val: TColor) => handleColorChange(val, 'form_bg_color')} />
        </FormControl>

        <FormControl>
          <FormLabel>Form Text Color</FormLabel>
          <ColorPickerWrap
            color={flow.config?.form_config?.form_text_color}
            handleChange={(val: TColor) => handleColorChange(val, 'form_text_color')}
          />
        </FormControl>
      </Stack>
    </>
  )
}

export default CustomForm
