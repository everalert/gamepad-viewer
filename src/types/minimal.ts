import { GamepadInputType as GIT, inputDef } from '../types/gamepad'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { TriggerSimpleMode } from '../components/Trigger'
import { XBoxButton as XBB } from './xbox'


const INNER_X	= 68
const OUTER_X	= 204
const STICK_Y	= -16
const BUTTON_Y	= 8

export const MINIMAL_DFLT_CONTAINER: WidgetContainerDef = {
	w: 540,
	h: 44,
	m: 32,
	line: 3
}

export const MINIMAL_DFLT_WIDGETS: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: 0,
		y: 0,
		hide: true,
		inputs: [
			inputDef(GIT.Axis,0),
			inputDef(GIT.Axis,1),
		],
		val: []
	},
	{
		type: WidgetType.StickCircle,
		x: 0,
		y: 0,
		hide: true,
		inputs: [
			inputDef(GIT.Axis,2),
			inputDef(GIT.Axis,3),
		],
		val: []
	},
	{
		type: WidgetType.Trigger,
		x: 0,
		y: 0,
		hide: true,
		inputs: [inputDef(GIT.Button,XBB.LT)],
		val: []
	},
	{
		type: WidgetType.Trigger,
		x: 0,
		y: 0,
		hide: true,
		inputs: [inputDef(GIT.Button,XBB.RT)],
		val: []
	},
	{
		type: WidgetType.Trigger,
		x: -OUTER_X,
		y: STICK_Y,
		rot: 90,
		inputs: [inputDef(GIT.Axis,0)],
		val: [132,0,TriggerSimpleMode.SplitThick]
	},
	{
		type: WidgetType.Trigger,
		x: -INNER_X,
		y: STICK_Y,
		rot: 90,
		inputs: [inputDef(GIT.Axis,1)],
		val: [132,0,TriggerSimpleMode.SplitThick],
	},
	{
		type: WidgetType.Trigger,
		x: INNER_X,
		y: STICK_Y,
		rot: 90,
		inputs: [inputDef(GIT.Axis,2)],
		val: [132,0,TriggerSimpleMode.SplitThick],
	},
	{
		type: WidgetType.Trigger,
		x: OUTER_X,
		y: STICK_Y,
		rot: 90,
		inputs: [inputDef(GIT.Axis,3)],
		val: [132,0,TriggerSimpleMode.SplitThick],
	},
	{
		type: WidgetType.ButtonGridRect,
		x: 0,
		y: BUTTON_Y,
		inputs: [
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,1),
			inputDef(GIT.Button,2),
			inputDef(GIT.Button,3),
			inputDef(GIT.Button,4),
			inputDef(GIT.Button,5),
			inputDef(GIT.Button,6),
			inputDef(GIT.Button,7),
			inputDef(GIT.Button,8),
			inputDef(GIT.Button,9),
			inputDef(GIT.Button,10),
			inputDef(GIT.Button,11),
			inputDef(GIT.Button,12),
			inputDef(GIT.Button,13),
			inputDef(GIT.Button,14),
			inputDef(GIT.Button,15),
		],
		val: [8,68,16,32,6,0,1]
	},
]

export const MINIMAL_DFLT_STR: string =
	`${genContainerStr(MINIMAL_DFLT_CONTAINER)}|${genWidgetStr(MINIMAL_DFLT_WIDGETS)}`
