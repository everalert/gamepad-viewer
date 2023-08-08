import { GamepadInputType as GIT, inputDef } from '../gamepad'
import { WidgetType, WidgetDef, genWidgetStr } from '../../components/Widget'
import { WidgetContainerDef, genContainerStr } from '../../components/containers'
import { WiiUAxis as WUA, WiiUButton as WUB } from './wiiu'
import { ButtonShape } from '../../components/inputs'


const INNER_X = 56
const INNER_Y = 32
const OUTER_X = 160
const OUTER_Y = -24

export const GCN_DFLT_CONTAINER: WidgetContainerDef = {
	w: 480,
	h: 144,
	m: 32,
	line: 3
}

export const GCN_DFLT_WIDGETS: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: -OUTER_X,
		y: OUTER_Y,
		inputs: [
			inputDef(GIT.Axis,WUA.LSx),
			inputDef(GIT.Axis,WUA.LSy),
			inputDef(GIT.Button,WUB.LSB)
		],
		val: [48]
	},
	{
		type: WidgetType.StickCircle,
		x: INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Axis,WUA.RSx),
			inputDef(GIT.Axis,WUA.RSy),
			inputDef(GIT.Button,WUB.RSB)
		],
		val: [40]
	},
	{
		type: WidgetType.Button,
		x: 0,
		y: -36,
		inputs: [inputDef(GIT.Button,WUB.Start)],
		val: [ButtonShape.Circle,10]
	},
	{
		type: WidgetType.DPad,
		x: -INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Button,WUB.DR),
			inputDef(GIT.Button,WUB.DD),
			inputDef(GIT.Button,WUB.DL),
			inputDef(GIT.Button,WUB.DU)
		],
		val: [72,24]
	},
	{
		type: WidgetType.Button,
		x: OUTER_X,
		y: OUTER_Y+4,
		inputs: [inputDef(GIT.Button,WUB.A)],
		val: [ButtonShape.Circle,24]
	},
	{
		type: WidgetType.ButtonRing,
		x: OUTER_X,
		y: OUTER_Y+4,
		rot: -22,
		inputs: [
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,WUB.B),
		],
		val: [48,14,0,0,0,0,ButtonShape.NONE,ButtonShape.Circle]
	},
	{
		type: WidgetType.ButtonRing,
		x: OUTER_X,
		y: OUTER_Y+4,
		rot: -6,
		inputs: [
			inputDef(GIT.Button,WUB.X),
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,WUB.Y)
		],
		val: [44,44,28,10,0,1,ButtonShape.GCXY,ButtonShape.NONE,ButtonShape.NONE]
	},
	{
		type: WidgetType.Button,
		x: GCN_DFLT_CONTAINER.w/2-30,
		y: 44,
		inputs: [inputDef(GIT.Button,WUB.Select)],
		val: [ButtonShape.Rect,12,6,5,0,0]
	},
	{
		type: WidgetType.Trigger,
		x: -GCN_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZL),
			inputDef(GIT.Button,WUB.L)
		],
		val: [96,256]
	},
	{
		type: WidgetType.Trigger,
		x: GCN_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZR),
			inputDef(GIT.Button,WUB.R)
		],
		val: [96,256],
		fx: true
	},
]

export const GCN_DFLT_STR: string =
	`${genContainerStr(GCN_DFLT_CONTAINER)}|${genWidgetStr(GCN_DFLT_WIDGETS)}`
