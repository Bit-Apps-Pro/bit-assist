import { Prisma } from '@prisma/client'
import { atomWithImmer } from 'jotai/immer'

interface ChatWidget {
  id: string
  name: string
  userId: string
  styles: Prisma.JsonValue | null
  domains: string[]
  business_hours: Prisma.JsonValue[]
  exclude_pages: Prisma.JsonValue[]
  initial_delay: number
  status: boolean
  widget_message: string | null
  createdAt: Date
  integrations: Prisma.JsonValue[]
}

export const widgetAtom = atomWithImmer<ChatWidget>()
