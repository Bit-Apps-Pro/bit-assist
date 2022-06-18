import { atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'
import { FlowDefault, WidgetDefault } from './DefaultStates'
import { Widget, Flow } from './Interfaces'
import { atomWithReset } from 'jotai/utils'

interface UserStateType {
  name?: string
  email?: string
  puid?: string
  enableAffiliate?: null | boolean
  referId?: string
  role?: string
  _id?: string
}

export const userState = atom<UserStateType>({})

export const editWidgetChannelIdAtom = atomWithReset('')

export const flowAtom = atomWithImmer<Flow>(FlowDefault)

export const resetFlowAtom = atom(null, (_get, set, _update) => {
  set(flowAtom, FlowDefault)
})

export const widgetAtom = atomWithImmer<Widget>(WidgetDefault)
