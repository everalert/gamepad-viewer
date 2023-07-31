import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad } from '../components'
import { WiiUAxis as WUA, WiiUButton as WUB } from '../types/wiiu'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { TextContainer } from '../components/TextContainer'


const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const WIIU_DFLT_CONTAINER: WidgetContainerDef = { w: 512, h: 144, m: 32, line: 3 }

export const WIIU_DFLT_WIDGETS: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-OUTER_X, y:OUTER_Y,
		ax:[WUA.LSx,WUA.LSy], bt:[WUB.LSB], val:[48] },
	{ type:WidgetType.StickCircle, x:OUTER_X, y:OUTER_Y,
		ax:[WUA.RSx,WUA.RSy], bt:[WUB.RSB], val:[48] },
	{ type:WidgetType.Button2, x:0, y:-48,
		ax:[], bt:[WUB.Select,WUB.Start], val:[32,12] },
	{ type:WidgetType.DPad, x:-INNER_X, y:INNER_Y,
		ax:[], bt:[WUB.DD,WUB.DR,WUB.DL,WUB.DU], val:[80,28] },
	{ type:WidgetType.Button4, x:INNER_X, y:INNER_Y,
		ax:[], bt:[WUB.B,WUB.A,WUB.Y,WUB.X], val:[28,16] },
	{ type:WidgetType.Trigger, x:-WIIU_DFLT_CONTAINER.w/2, y:0,
		ax:[], bt:[WUB.ZL,WUB.L], val:[96,256] },
	{ type:WidgetType.Trigger, x:WIIU_DFLT_CONTAINER.w/2, y:0,
		ax:[], bt:[WUB.ZR,WUB.R], val:[96,256], fx:true },
]

export const WIIU_DFLT_STR: string =
	`${genContainerStr(WIIU_DFLT_CONTAINER)}|${genWidgetStr(WIIU_DFLT_WIDGETS)}`

export const WIIU_DFLT_CONTAINER_COMPACT: WidgetContainerDef = { w: 396, h: 80, m: 32, line: 3 }

export const WIIU_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		ax:[WUA.LSx,WUA.LSy], bt:[WUB.LSB], val:[40] },
	{ type:WidgetType.StickCircle, x:OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		ax:[WUA.RSx,WUA.RSy], bt:[WUB.RSB], val:[40] },
	{ type:WidgetType.Button2, x:0, y:-34,
		ax:[], bt:[WUB.Select,WUB.Start], val:[84,10] },
	{ type:WidgetType.DPad, x:-INNER_X_COMPACT, y:INNER_Y_COMPACT,
		ax:[], bt:[WUB.DD,WUB.DR,WUB.DL,WUB.DU], val:[72,24] },
	{ type:WidgetType.Button4, x:INNER_X_COMPACT, y:INNER_Y_COMPACT,
		ax:[], bt:[WUB.B,WUB.A,WUB.Y,WUB.X], val:[24,13] },
	{ type:WidgetType.Trigger, x:-WIIU_DFLT_CONTAINER_COMPACT.w/2, y:0,
		ax:[], bt:[WUB.ZL,WUB.L], val:[64,256] },
	{ type:WidgetType.Trigger, x:WIIU_DFLT_CONTAINER_COMPACT.w/2, y:0,
		ax:[], bt:[WUB.ZR,WUB.R], val:[64,256], fx:true },
]

export const WIIU_DFLT_STR_COMPACT: string =
	`${genContainerStr(WIIU_DFLT_CONTAINER_COMPACT)}|${genWidgetStr(WIIU_DFLT_WIDGETS_COMPACT)}`


const WiiU: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	const MODE_COMPACT	= params.compact !== undefined
	
	const container: WidgetContainerDef = MODE_COMPACT ?
		WIIU_DFLT_CONTAINER_COMPACT : WIIU_DFLT_CONTAINER

	const widgets: WidgetDef[] = MODE_COMPACT ?
		WIIU_DFLT_WIDGETS_COMPACT : WIIU_DFLT_WIDGETS

	return <>
		<Gamepad padIndex={padIndex} onUpdate={setPad} />
		<div
			class={`flex flex-col`}
			style={`
				width:${container.w+container.m*2}px;
				padding:${container.m}px;
				gap:${container.m/2}px;
				`}>
			{ NOTEXT || <TextContainer
				widgets={widgets} pad={pad()}
				style={`width:${container.w}px;`} />
			}
			{ NOIMAGE || <WidgetContainer def={container} widgets={widgets} pad={pad()} /> }
		</div>
	</>
}

export default WiiU;
