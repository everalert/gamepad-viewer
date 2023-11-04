import { GamepadInputType as GIT, inputDef } from '../gamepad'
import { WidgetType, WidgetDef, WidgetContainerDef } from '../widget'


export enum XBoxAxis {
	LSx = 0,
	LSy = 1,
	RSx = 2,
	RSy = 3,
}

export enum XBoxButton {
	A =		0,
	B =		1,
	X =		2,
	Y =		3,
	LB =	4,
	RB =	5,
	LT =	6,
	RT =	7,
	Back =	8,
	View =	8,
	Start =	9,
	Menu =	9,
	LSB =	10,
	RSB =	11,
	DU =	12,
	DD =	13,
	DL =	14,
	DR =	15,
	Guide =	16,
	XBox =	16,
}


const XBA = XBoxAxis
const XBB = XBoxButton
const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const XBOX_DFLT_CONTAINER: WidgetContainerDef = {
	w: 512,
	h: 144,
	m: 32,
	line: 3
}

export const XBOX_DFLT_WIDGETS: WidgetDef[] = [
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
		val: [48]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: 0,
		y: -48,
		inputs: [
			inputDef(GIT.Button,XBB.Start),
			inputDef(GIT.Button,XBB.Back)
		],
		val: [32,12]
	},
	{
		type: WidgetType.DPad,
		x: -INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Button,XBB.DR),
			inputDef(GIT.Button,XBB.DD),
			inputDef(GIT.Button,XBB.DL),
			inputDef(GIT.Button,XBB.DU)
		],
		val: [80,28]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: OUTER_X,
		y: OUTER_Y,
		inputs: [
			inputDef(GIT.Button,XBB.B),
			inputDef(GIT.Button,XBB.A),
			inputDef(GIT.Button,XBB.X),
			inputDef(GIT.Button,XBB.Y)
		],
		val: [28,16]
	},
	{
		type: WidgetType.Trigger,
		x: -XBOX_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.LT),
			inputDef(GIT.Button,XBB.LB)
		],
		val: [96,256]
	},
	{
		type: WidgetType.Trigger,
		x: XBOX_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.RT),
			inputDef(GIT.Button,XBB.RB)
		],
		val: [96,256],
		fx: true
	},
]

export const XBOX_DFLT_CONTAINER_COMPACT: WidgetContainerDef = {
	w: 396,
	h: 80,
	m: 32,
	line: 3
}

export const XBOX_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: -OUTER_X_COMPACT,
		y: OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,XBA.LSx),
			inputDef(GIT.Axis,XBA.LSy),
			inputDef(GIT.Button,XBB.LSB)
		],
		val: [40]
	},
	{
		type: WidgetType.StickCircle,
		x: INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,XBA.RSx),
			inputDef(GIT.Axis,XBA.RSy),
			inputDef(GIT.Button,XBB.RSB)
		],
		val: [40]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: 6,
		y: -34,
		inputs: [
			inputDef(GIT.Button,XBB.Start),
			inputDef(GIT.Button,XBB.Back)
		],
		val: [92,10]
	},
	{
		type: WidgetType.DPad,
		x: -INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,XBB.DR),
			inputDef(GIT.Button,XBB.DD),
			inputDef(GIT.Button,XBB.DL),
			inputDef(GIT.Button,XBB.DU)
		],
		val: [72,24]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: OUTER_X_COMPACT,
		y: OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,XBB.B),
			inputDef(GIT.Button,XBB.A),
			inputDef(GIT.Button,XBB.X),
			inputDef(GIT.Button,XBB.Y)
		],
		val: [24,13]
	},
	{
		type: WidgetType.Trigger,
		x: -XBOX_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.LT),
			inputDef(GIT.Button,XBB.LB)
		],
		val: [64,256]
	},
	{
		type: WidgetType.Trigger,
		x: XBOX_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,XBB.RT),
			inputDef(GIT.Button,XBB.RB)
		],
		val: [64,256],
		fx: true
	},
]
