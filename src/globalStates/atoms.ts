import { chat_widgets } from '@prisma/client'
import { atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'

interface UserStateType {
  name?: string
  email?: string
  puid?: string
  enableAffiliate?: null | boolean
  referId?: string
  role?: string
  _id?: string
}

export const widgetAtom = atomWithImmer<chat_widgets>()

export const userState = atom<UserStateType>({})
