import { atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'
import { FlowDefault, WidgetDefault } from '@globalStates/DefaultStates'
import { Widget, Flow, UserStateType } from '@globalStates/Interfaces'
import { atomWithReset } from 'jotai/utils'

export const userState = atom<UserStateType>({})
export const editWidgetChannelIdAtom = atomWithReset('')
export const flowAtom = atomWithImmer<Flow>(FlowDefault)
export const resetFlowAtom = atom(null, (_get, set, _update) => {
  set(flowAtom, FlowDefault)
})
export const widgetAtom = atomWithImmer<Widget>(WidgetDefault)
