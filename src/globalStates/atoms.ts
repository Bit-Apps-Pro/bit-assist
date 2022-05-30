import { chat_widgets } from '@prisma/client'
import { atomWithImmer } from 'jotai/immer'

export const widgetAtom = atomWithImmer<chat_widgets>()
