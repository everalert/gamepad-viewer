import { GamepadInputType as GIT, inputDef } from '../gamepad'
import { WidgetType, WidgetDef, WidgetContainerDef } from '../widget'


// TODO: confirm label-index combos are correct

export enum WiiUButton {
	B =		0,
	A =		1,
	Y =		2,
	X =		3,
	L =		4,
	R =		5,
	ZL =	6,
	ZR =	7,
	Select = 8,
	Start =	9,
	LSB =	10,
	RSB =	11,
	DU =	12,
	DD =	13,
	DL =	14,
	DR =	15,
	Home =	16,
}

export enum WiiUAxis {
	LSx = 0,
	LSy = 1,
	RSx = 2,
	RSy = 3,
}


const WUA = WiiUAxis
const WUB = WiiUButton
const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const WIIU_DFLT_CONTAINER: WidgetContainerDef = {
	w: 512,
	h: 144,
	m: 32,
	line: 3
}

export const WIIU_DFLT_WIDGETS: WidgetDef[] = [
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
		x: OUTER_X,
		y: OUTER_Y,
		inputs: [
			inputDef(GIT.Axis,WUA.RSx),
			inputDef(GIT.Axis,WUA.RSy),
			inputDef(GIT.Button,WUB.RSB)
		],
		val: [48]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: 0,
		y: -48,
		inputs: [
			inputDef(GIT.Button,WUB.Start),
			inputDef(GIT.Button,WUB.Select)
		],
		val: [32,12]
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
		val: [80,28]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Button,WUB.A),
			inputDef(GIT.Button,WUB.B),
			inputDef(GIT.Button,WUB.Y),
			inputDef(GIT.Button,WUB.X)
		],
		val: [28,16]
	},
	{
		type: WidgetType.Trigger,
		x: -WIIU_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZL),
			inputDef(GIT.Button,WUB.L)
		],
		val: [96,256]
	},
	{
		type: WidgetType.Trigger,
		x: WIIU_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZR),
			inputDef(GIT.Button,WUB.R)
		],
		val :[96,256],
		fx: true
	},
]

export const WIIU_DFLT_CONTAINER_COMPACT: WidgetContainerDef = {
	w: 396,
	h: 80,
	m: 32,
	line: 3
}

export const WIIU_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: -OUTER_X_COMPACT,
		y: OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,WUA.LSx),
			inputDef(GIT.Axis,WUA.LSy),
			inputDef(GIT.Button,WUB.LSB)
		],
		val: [40]
	},
	{
		type: WidgetType.StickCircle,
		x: OUTER_X_COMPACT,
		y: OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,WUA.RSx),
			inputDef(GIT.Axis,WUA.RSy),
			inputDef(GIT.Button,WUB.RSB)
		],
		val: [40]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: 0,
		y: -34,
		inputs: [
			inputDef(GIT.Button,WUB.Start),
			inputDef(GIT.Button,WUB.Select)
		],
		val: [84,10]
	},
	{
		type: WidgetType.DPad,
		x: -INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,WUB.DR),
			inputDef(GIT.Button,WUB.DD),
			inputDef(GIT.Button,WUB.DL),
			inputDef(GIT.Button,WUB.DU)
		],
		val: [72,24]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,WUB.A),
			inputDef(GIT.Button,WUB.B),
			inputDef(GIT.Button,WUB.Y),
			inputDef(GIT.Button,WUB.X)
		],
		val: [24,13]
	},
	{
		type: WidgetType.Trigger,
		x: -WIIU_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZL),
			inputDef(GIT.Button,WUB.L)
		],
		val: [64,256]
	},
	{
		type: WidgetType.Trigger,
		x: WIIU_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,WUB.ZR),
			inputDef(GIT.Button,WUB.R)
		],
		val: [64,256],
		fx: true
	},
]
