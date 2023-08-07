import { GamepadInputType as GIT, inputDef } from '../types/gamepad'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { TriggerSimpleMode } from '../components/Trigger'
import { XBoxButton as XBB } from './xbox'


const INNER_X	= 208
const OUTER_X	= 248
const STICK_Y	= -22
const BUTTON_Y	= 14


export const RACING_DFLT_CONTAINER: WidgetContainerDef = {
	w: 512,
	h: 64,
	m: 32,
	line: 6
}

export const RACING_DFLT_WIDGETS: WidgetDef[] = [
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
		x: -OUTER_X,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.LT),
			inputDef(GIT.Button,XBB.LB),
		],
		val: [76,128,TriggerSimpleMode.FullThick]
	},
	{
		type: WidgetType.Trigger,
		x: OUTER_X,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.RT),
			inputDef(GIT.Button,XBB.RB),
		],
		val: [76,128,TriggerSimpleMode.FullThick],
		fx: true
	},
	
	{
		type: WidgetType.Trigger,
		x: -INNER_X-RACING_DFLT_CONTAINER.line-2,
		y: 0,
		inputs: [
			inputDef(GIT.Axis,0),
			inputDef(GIT.Button,XBB.LSB)
		],
		val: [68,0,TriggerSimpleMode.Split],
	},
	{
		type: WidgetType.Trigger,
		x: -INNER_X+RACING_DFLT_CONTAINER.line+2,
		y: 0,
		inputs: [
			inputDef(GIT.Axis,1),
			inputDef(GIT.Button,XBB.LSB)
		],
		val: [68,0,TriggerSimpleMode.Split],
		fy: true
	},
	
	{
		type: WidgetType.Trigger,
		x: INNER_X+RACING_DFLT_CONTAINER.line+2,
		y: 0,
		inputs: [
			inputDef(GIT.Axis,2),
			inputDef(GIT.Button,XBB.RSB)
		],
		val: [68,0,TriggerSimpleMode.Split],
		fx: true,
		fy: true
	},
	{
		type: WidgetType.Trigger,
		x: INNER_X-RACING_DFLT_CONTAINER.line-2,
		y: 0,
		inputs: [
			inputDef(GIT.Axis,3),
			inputDef(GIT.Button,XBB.RSB)
		],
		val: [68,0,TriggerSimpleMode.Split],
		fx: true,
		fy: true
	},

	{
		type: WidgetType.Trigger,
		x: 0,
		y: STICK_Y,
		rot: 90,
		inputs: [inputDef(GIT.Axis,0)],
		val: [374,0,TriggerSimpleMode.SplitThick]
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
			inputDef(GIT.Button,8),
			inputDef(GIT.Button,9),
			inputDef(GIT.Button,12),
			inputDef(GIT.Button,13),
			inputDef(GIT.Button,14),
			inputDef(GIT.Button,15),
		],
		val: [10,38,0,16,20,0,1],
	},
]

export const RACING_DFLT_STR: string =
	`${genContainerStr(RACING_DFLT_CONTAINER)}|${genWidgetStr(RACING_DFLT_WIDGETS)}`
