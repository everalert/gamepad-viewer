import { GamepadInputType as GIT, inputDef } from '../types/gamepad'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { XBoxAxis as XBA, XBoxButton as XBB } from './xbox'
import { ButtonShape } from '../components'


const INNER_X = 56
const INNER_Y = 24
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
			inputDef(GIT.Axis,XBA.LSx),
			inputDef(GIT.Axis,XBA.LSy),
			inputDef(GIT.Button,XBB.LSB)
		],
		val: [48]
	},
	{
		type: WidgetType.StickCircle,
		x: INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Axis,XBA.RSx),
			inputDef(GIT.Axis,XBA.RSy),
			inputDef(GIT.Button,XBB.RSB)
		],
		val: [40]
	},
	{
		type: WidgetType.Button,
		x: 0,
		y: -36,
		inputs: [inputDef(GIT.Button,XBB.Start)],
		val: [ButtonShape.Circle,8]
	},
	{
		type: WidgetType.DPad,
		x: -INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Button,XBB.DD),
			inputDef(GIT.Button,XBB.DR),
			inputDef(GIT.Button,XBB.DL),
			inputDef(GIT.Button,XBB.DU)
		],
		val: [72,24]
	},
	{
		type: WidgetType.Button,
		x: OUTER_X,
		y: OUTER_Y,
		inputs: [inputDef(GIT.Button,XBB.B)],
		val: [ButtonShape.Circle,20]
	},
	{
		type: WidgetType.ButtonRing,
		x: OUTER_X,
		y: OUTER_Y,
		rot: -22,
		inputs: [
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,XBB.A),
		],
		val: [42,12,0,0,0,0,ButtonShape.NONE,ButtonShape.Circle]
	},
	{
		type: WidgetType.ButtonRing,
		x: OUTER_X,
		y: OUTER_Y,
		rot: -6,
		inputs: [
			inputDef(GIT.Button,XBB.Y),
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,0),
			inputDef(GIT.Button,XBB.X)
		],
		val: [40,40,28,8,1,0,ButtonShape.GCXY,ButtonShape.NONE,ButtonShape.NONE]
	},
	{
		type: WidgetType.Button,
		x: GCN_DFLT_CONTAINER.w/2-30,
		y: 44,
		inputs: [inputDef(GIT.Button,XBB.Back)],
		val: [ButtonShape.Rect,12,6,5,0,0]
	},
	{
		type: WidgetType.Trigger,
		x: -GCN_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.LT),
			inputDef(GIT.Button,XBB.LB)
		],
		val: [96,256]
	},
	{
		type: WidgetType.Trigger,
		x: GCN_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.RT),
			inputDef(GIT.Button,XBB.RB)
		],
		val: [96,256],
		fx: true
	},
]

export const GCN_DFLT_STR: string =
	`${genContainerStr(GCN_DFLT_CONTAINER)}|${genWidgetStr(GCN_DFLT_WIDGETS)}`
