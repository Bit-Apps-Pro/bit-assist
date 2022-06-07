import { atomWithImmer } from 'jotai/immer'
import { FlowDefault, WidgetDefault } from './DefaultStates'
import { Widget, Flow } from './Interfaces'

export const flowAtom = atomWithImmer<Flow>(FlowDefault)

export const widgetAtom = atomWithImmer<Widget>(WidgetDefault)
