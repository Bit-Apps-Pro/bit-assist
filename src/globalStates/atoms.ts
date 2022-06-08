import { atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'
import { FlowDefault, WidgetDefault } from './DefaultStates'
import { Widget, Flow } from './Interfaces'

export const flowAtom = atomWithImmer<Flow>(FlowDefault)

export const resetFlowAtom = atom(null, (_get, set, _update) => {
  set(flowAtom, FlowDefault)
})

export const widgetAtom = atomWithImmer<Widget>(WidgetDefault)
