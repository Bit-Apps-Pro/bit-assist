import { Spinner, Text, VStack } from '@chakra-ui/react'
import { WidgetChannelType } from '@globalStates/Interfaces'
import useFetchWidgetChannels from '@hooks/queries/widgetChannel/useFetchWidgetChannels'
import WidgetChanel from '@components/widgetChannels/WidgetChannel'
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { flowAtom } from '@globalStates/atoms'

const ChannelsList = () => {
  const { widgetChannels, isWidgetChannelsFetching } = useFetchWidgetChannels()
  const [activeId, setActiveId] = useState<string | null>(null)
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()
  const [, setFlow] = useAtom(flowAtom)

  useEffect(() => {
    if (widgetChannels?.length < 1) return
    let maxNumber = 0
    widgetChannels?.map((item: WidgetChannelType) => {
      if (item.order > maxNumber) {
        maxNumber = item.order
      }
    })
    setFlow((prev) => {
      prev.order = maxNumber + 1
    })
  }, [widgetChannels])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }) => {
    setActiveId(active.id)
  }

  const handleDragEnd = ({ active, over }) => {
    if (active?.id !== over?.id) {
      const oldIndex = widgetChannels.findIndex((item: WidgetChannelType) => item?.id === active?.id)
      const newIndex = widgetChannels.findIndex((item: WidgetChannelType) => item?.id === over?.id)

      queryClient.setQueryData(['/api/widgetChannel/fetch', id?.toString()], {
        data: arrayMove(widgetChannels, oldIndex, newIndex),
      })
    }
    setActiveId(null)
  }

  return (
    <>
      {isWidgetChannelsFetching && <Spinner />}
      {widgetChannels?.length < 1 && <Text>Create new channel from here.</Text>}
      {!!widgetChannels?.length && (
        <>
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={widgetChannels.map((item: WidgetChannelType) => item.id)} strategy={verticalListSortingStrategy}>
              <VStack>
                {widgetChannels?.map((widgetChannel: WidgetChannelType) => (
                  <WidgetChanel key={widgetChannel.id} widgetChannel={widgetChannel} />
                ))}

                <DragOverlay style={{ marginTop: 0 }}>
                  {activeId && (
                    <WidgetChanel
                      shadow={'lg'}
                      cursor={'grabbing'}
                      widgetChannel={widgetChannels.filter((item: WidgetChannelType) => item.id === activeId)[0]}
                    />
                  )}
                </DragOverlay>
              </VStack>
            </SortableContext>
          </DndContext>
        </>
      )}
    </>
  )
}

export default ChannelsList
