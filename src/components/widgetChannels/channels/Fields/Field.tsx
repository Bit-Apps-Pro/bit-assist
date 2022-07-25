import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, IconButton, Input, Switch, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { CSS } from '@dnd-kit/utilities'

const Field = ({ id, field, handleChange, handleDelete, ...props }) => {
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
    <HStack w="full" style={style} ref={setNodeRef}>
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
          <HStack w="full">
            <Input value={field.label} onChange={(e) => handleChange(e.target.value, 'label', id)} />
            <IconButton aria-label="Show Desc" size="sm" icon={<FiChevronDown />} />
          </HStack>
          {/* <Textarea mt="2" /> */}
        </Box>
      </HStack>
      <Box>
        <IconButton aria-label="Delete Icon" size="sm" isRound icon={<FiX />} onClick={() => handleDelete(id)} />
      </Box>
    </HStack>
  )
}

export default Field
