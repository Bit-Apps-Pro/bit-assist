import { chat_widgets } from '@prisma/client'
import { atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'

export const widgetAtom = atomWithImmer<chat_widgets>()

export const userState = atom({})
