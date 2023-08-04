import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { GamepadInputType as GIT, inputDef as iD } from '../types/gamepad'
import { Gamepad } from '../components'
import { PSxAxis as PSA, PSxButton as PSB } from '../types/psx'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { ButtonShape } from '../components/ButtonInline'
import { TextContainer } from '../components/TextContainer'
import { DisplayContainer } from '../components/DisplayContainer'


const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const PSX_DFLT_CONTAINER: WidgetContainerDef = { w: 512, h: 144, m: 32, line: 3 }

export const PSX_DFLT_WIDGETS: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-INNER_X, y:INNER_Y,
		inputs:[iD(GIT.Axis,PSA.LSx),iD(GIT.Axis,PSA.LSy),iD(GIT.Button,PSB.L3)],
		val:[48] },
	{ type:WidgetType.StickCircle, x:INNER_X, y:INNER_Y,
		inputs:[iD(GIT.Axis,PSA.RSx),iD(GIT.Axis,PSA.RSy),iD(GIT.Button,PSB.R3)],
		val:[48] },
	{ type:WidgetType.ButtonRing, x:0, y:-48,
		inputs:[iD(GIT.Button,PSB.Start),iD(GIT.Button,PSB.Select)],
		val:[32,12,8,1,0,0,ButtonShape.TriIso,ButtonShape.Rect] },
	{ type:WidgetType.DPad, x:-OUTER_X, y:OUTER_Y,
		inputs:[iD(GIT.Button,PSB.DD),iD(GIT.Button,PSB.DR),
			iD(GIT.Button,PSB.DL),iD(GIT.Button,PSB.DU)],
		val:[80,28] },
	{ type:WidgetType.ButtonRingCircle, x:OUTER_X, y:OUTER_Y,
		inputs:[iD(GIT.Button,PSB.Ci),iD(GIT.Button,PSB.Cr),
			iD(GIT.Button,PSB.Sq),iD(GIT.Button,PSB.Tr)],
		val:[28,16] },
	{ type:WidgetType.Trigger, x:-PSX_DFLT_CONTAINER.w/2, y:0,
		inputs:[iD(GIT.Button,PSB.L2),iD(GIT.Button,PSB.L1)],
		val:[96,256] },
	{ type:WidgetType.Trigger, x:PSX_DFLT_CONTAINER.w/2, y:0,
		inputs:[iD(GIT.Button,PSB.R2),iD(GIT.Button,PSB.R1)],
		val:[96,256], fx:true },
]

export const PSX_DFLT_STR: string =
	`${genContainerStr(PSX_DFLT_CONTAINER)}|${genWidgetStr(PSX_DFLT_WIDGETS)}`

export const PSX_DFLT_CONTAINER_COMPACT: WidgetContainerDef = { w: 396, h: 80, m: 32, line: 3 }

export const PSX_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-INNER_X_COMPACT, y:INNER_Y_COMPACT,
		inputs:[iD(GIT.Axis,PSA.LSx),iD(GIT.Axis,PSA.LSy),iD(GIT.Button,PSB.L3)],
		val:[40] },
	{ type:WidgetType.StickCircle, x:INNER_X_COMPACT, y:INNER_Y_COMPACT,
		inputs:[iD(GIT.Axis,PSA.RSx),iD(GIT.Axis,PSA.RSy),iD(GIT.Button,PSB.R3)],
		val:[40] },
	{ type:WidgetType.ButtonRing, x:0, y:-34,
		inputs:[iD(GIT.Button,PSB.Start),iD(GIT.Button,PSB.Select)],
		val:[100,10,6,1,0,0,ButtonShape.TriIso,ButtonShape.Rect] },
	{ type:WidgetType.DPad, x:-OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		inputs:[iD(GIT.Button,PSB.DD),iD(GIT.Button,PSB.DR),
			iD(GIT.Button,PSB.DL),iD(GIT.Button,PSB.DU)],
		val:[72,24] },
	{ type:WidgetType.ButtonRingCircle, x:OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		inputs:[iD(GIT.Button,PSB.Ci),iD(GIT.Button,PSB.Cr),
			iD(GIT.Button,PSB.Sq),iD(GIT.Button,PSB.Tr)],
		val:[24,13] },
	{ type:WidgetType.Trigger, x:-PSX_DFLT_CONTAINER_COMPACT.w/2, y:0,
		inputs:[iD(GIT.Button,PSB.L2),iD(GIT.Button,PSB.L1)],
		val:[64,256] },
	{ type:WidgetType.Trigger, x:PSX_DFLT_CONTAINER_COMPACT.w/2, y:0,
		inputs:[iD(GIT.Button,PSB.R2),iD(GIT.Button,PSB.R1)],
		val:[64,256], fx:true },
]

export const PSX_DFLT_STR_COMPACT: string =
	`${genContainerStr(PSX_DFLT_CONTAINER_COMPACT)}|${genWidgetStr(PSX_DFLT_WIDGETS_COMPACT)}`


const PSx: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	const MODE_COMPACT	= params.compact !== undefined

	const container: WidgetContainerDef = MODE_COMPACT ?
		PSX_DFLT_CONTAINER_COMPACT : PSX_DFLT_CONTAINER

	const widgets: WidgetDef[] = MODE_COMPACT ?
		PSX_DFLT_WIDGETS_COMPACT : PSX_DFLT_WIDGETS

	return <>
		<Gamepad padIndex={padIndex} pad={pad} onUpdate={setPad} />
		<DisplayContainer container={container}>
			{ NOTEXT || <TextContainer
				widgets={widgets} pad={pad()}
				style={`width:${container.w}px;`} />
			}
			{ NOIMAGE || <WidgetContainer def={container} widgets={widgets} pad={pad()} /> }
		</DisplayContainer>
	</>
}

export default PSx;
