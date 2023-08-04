import { GamepadInputType as GIT, inputDef } from '../types/gamepad'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { ButtonShape } from '../components/ButtonInline'


// TODO: confirm label-index combos are correct

export enum PSxButton {
	Cross =		0,
	Cr =		0,
	Circle =	1,
	Ci =		1,
	Square =	2,
	Sq =		2,
	Triangle =	3,
	Tr =		3,
	L1 =		4,
	R1 =		5,
	L2 =		6,
	R2 =		7,
	Select =	8,
	Share =		8,
	Create =	8,
	Start =		9,
	Options =	9,
	L3 =		10,
	R3 =		11,
	DU =		12,
	DD =		13,
	DL =		14,
	DR =		15,
	PS =		16,
}

export enum PSxAxis {
	LSx = 0,
	LSy = 1,
	RSx = 2,
	RSy = 3,
}


const PSA = PSxAxis
const PSB = PSxButton
const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const PSX_DFLT_CONTAINER: WidgetContainerDef = {
	w: 512,
	h: 144,
	m: 32,
	line: 3
}

export const PSX_DFLT_WIDGETS: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: -INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Axis,PSA.LSx),
			inputDef(GIT.Axis,PSA.LSy),
			inputDef(GIT.Button,PSB.L3)
		],
		val: [48]
	},
	{
		type: WidgetType.StickCircle,
		x: INNER_X,
		y: INNER_Y,
		inputs: [
			inputDef(GIT.Axis,PSA.RSx),
			inputDef(GIT.Axis,PSA.RSy),
			inputDef(GIT.Button,PSB.R3)
		],
		val: [48]
	},
	{
		type: WidgetType.ButtonRing,
		x: 0,
		y: -48,
		inputs: [
			inputDef(GIT.Button,PSB.Start),
			inputDef(GIT.Button,PSB.Select)
		],
		val: [32,12,8,1,0,0,ButtonShape.TriIso,ButtonShape.Rect]
	},
	{
		type: WidgetType.DPad,
		x: -OUTER_X,
		y: OUTER_Y,
		inputs: [
			inputDef(GIT.Button,PSB.DD),
			inputDef(GIT.Button,PSB.DR),
			inputDef(GIT.Button,PSB.DL),
			inputDef(GIT.Button,PSB.DU)
		],
		val: [80,28]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: OUTER_X,
		y: OUTER_Y,
		inputs: [
			inputDef(GIT.Button,PSB.Ci),
			inputDef(GIT.Button,PSB.Cr),
			inputDef(GIT.Button,PSB.Sq),
			inputDef(GIT.Button,PSB.Tr)
		],
		val: [28,16]
	},
	{
		type: WidgetType.Trigger,
		x: -PSX_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,PSB.L2),
			inputDef(GIT.Button,PSB.L1)
		],
		val: [96,256]
	},
	{
		type: WidgetType.Trigger,
		x: PSX_DFLT_CONTAINER.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,PSB.R2),
			inputDef(GIT.Button,PSB.R1)
		],
		val: [96,256],
		fx: true },
]

export const PSX_DFLT_STR: string =
	`${genContainerStr(PSX_DFLT_CONTAINER)}|${genWidgetStr(PSX_DFLT_WIDGETS)}`

export const PSX_DFLT_CONTAINER_COMPACT: WidgetContainerDef = {
	w: 396,
	h: 80,
	m: 32,
	line: 3
}

export const PSX_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{
		type: WidgetType.StickCircle,
		x: -INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,PSA.LSx),
			inputDef(GIT.Axis,PSA.LSy),
			inputDef(GIT.Button,PSB.L3)
		],
		val: [40]
	},
	{
		type: WidgetType.StickCircle,
		x: INNER_X_COMPACT,
		y: INNER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Axis,PSA.RSx),
			inputDef(GIT.Axis,PSA.RSy),
			inputDef(GIT.Button,PSB.R3)
		],
		val: [40]
	},
	{
		type: WidgetType.ButtonRing,
		x: 0,
		y: -34,
		inputs: [
			inputDef(GIT.Button,PSB.Start),
			inputDef(GIT.Button,PSB.Select)
		],
		val: [100,10,6,1,0,0,ButtonShape.TriIso,ButtonShape.Rect]
	},
	{
		type: WidgetType.DPad,
		x : -OUTER_X_COMPACT,
		y : OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,PSB.DD),
			inputDef(GIT.Button,PSB.DR),
			inputDef(GIT.Button,PSB.DL),
			inputDef(GIT.Button,PSB.DU)
		],
		val: [72,24]
	},
	{
		type: WidgetType.ButtonRingCircle,
		x: OUTER_X_COMPACT,
		y: OUTER_Y_COMPACT,
		inputs: [
			inputDef(GIT.Button,PSB.Ci),
			inputDef(GIT.Button,PSB.Cr),
			inputDef(GIT.Button,PSB.Sq),
			inputDef(GIT.Button,PSB.Tr)
		],
		val: [24,13]
	},
	{
		type: WidgetType.Trigger,
		x: -PSX_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,PSB.L2),
			inputDef(GIT.Button,PSB.L1)
		],
		val: [64,256]
	},
	{
		type: WidgetType.Trigger,
		x: PSX_DFLT_CONTAINER_COMPACT.w/2,
		y: 0,
		inputs: [
			inputDef(GIT.Button,PSB.R2),
			inputDef(GIT.Button,PSB.R1)
		],
		val: [64,256],
		fx: true
	},
]

export const PSX_DFLT_STR_COMPACT: string =
	`${genContainerStr(PSX_DFLT_CONTAINER_COMPACT)}|${genWidgetStr(PSX_DFLT_WIDGETS_COMPACT)}`

