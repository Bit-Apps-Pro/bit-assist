import { atomWithImmer } from 'jotai/immer'
import { ChatWidget } from './Interfaces'

export const widgetAtom = atomWithImmer<ChatWidget>()
