import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, IconButton, Input, Switch, Text, useColorModeValue } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { FiX } from 'react-icons/fi'
import { CSS } from '@dnd-kit/utilities'

const Field = ({ id, field, handleChange, handleDelete, ...props }) => {
  const channelColorToggle = useColorModeValue('white', 'gray.800')

  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: field.id,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    touchAction: 'pinch-zoom',
  }
  return (
    <HStack w="full" style={style} ref={setNodeRef} bg={channelColorToggle}>
      <HStack w="full" borderWidth={1} p="2" rounded="sm">
        <Flex
          {...listeners}
          {...attributes}
          rounded="sm"
          bg={props.bg}
          cursor={props.cursor || 'grab'}
          justifyContent={'center'}
          alignItems={'center'}
          w={6}
          h={8}
        >
          <DragHandleIcon />
        </Flex>
        <Box w="full">
          <HStack alignItems={'flex-start'} justifyContent="space-between">
            <Text fontWeight={500} mb="2">
              {field.field_type.charAt(0).toUpperCase() + field.field_type.slice(1)} Field
              {!field.required && (
                <Text display={'inline'} color="gray.400">
                  &nbsp;&nbsp;(Optional)
                </Text>
              )}
            </Text>
            <HStack alignItems={'center'}>
              <Text>Required</Text>
              <Switch colorScheme={'purple'} isChecked={field.required || false} onChange={(e) => handleChange(e.target.checked, 'required', id)} />
            </HStack>
          </HStack>
          <Input value={field.label} onChange={(e) => handleChange(e.target.value, 'label', id)} />
        </Box>
      </HStack>
      <Box>
        <IconButton aria-label="Delete Icon" size="sm" isRound icon={<FiX />} onClick={() => handleDelete(id)} />
      </Box>
    </HStack>
  )
}

export default Field