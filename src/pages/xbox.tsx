import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad } from '../components'
import { XBoxAxis as XBA, XBoxButton as XBB } from '../types/xbox'
import { WidgetType, WidgetDef, genWidgetStr } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef, genContainerStr } from '../components/WidgetContainer'
import { TextContainer } from '../components/TextContainer'


const INNER_X = 64,		INNER_X_COMPACT = 46
const INNER_Y = 24,		INNER_Y_COMPACT = 6
const OUTER_X = 172,	OUTER_X_COMPACT = 140
const OUTER_Y = -24,	OUTER_Y_COMPACT = 0

export const XBOX_DFLT_CONTAINER: WidgetContainerDef = { w: 512, h: 144, m: 32, line: 3 }

export const XBOX_DFLT_WIDGETS: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-OUTER_X, y:OUTER_Y,
		ax:[XBA.LSx,XBA.LSy], bt:[XBB.LSB], val:[48] },
	{ type:WidgetType.StickCircle, x:INNER_X, y:INNER_Y,
		ax:[XBA.RSx,XBA.RSy], bt:[XBB.RSB], val:[48] },
	{ type:WidgetType.ButtonRingCircle, x:0, y:-48,
		ax:[], bt:[XBB.Start,XBB.Back], val:[32,12] },
	{ type:WidgetType.DPad, x:-INNER_X, y:INNER_Y,
		ax:[], bt:[XBB.DD,XBB.DR,XBB.DL,XBB.DU], val:[80,28] },
	{ type:WidgetType.ButtonRingCircle, x:OUTER_X, y:OUTER_Y,
		ax:[], bt:[XBB.B,XBB.A,XBB.X,XBB.Y], val:[28,16] },
	{ type:WidgetType.Trigger, x:-XBOX_DFLT_CONTAINER.w/2, y:0,
		ax:[], bt:[XBB.LT,XBB.LB], val:[96,256] },
	{ type:WidgetType.Trigger, x:XBOX_DFLT_CONTAINER.w/2, y:0,
		ax:[], bt:[XBB.RT,XBB.RB], val:[96,256], fx:true },
]

export const XBOX_DFLT_STR: string =
	`${genContainerStr(XBOX_DFLT_CONTAINER)}|${genWidgetStr(XBOX_DFLT_WIDGETS)}`

export const XBOX_DFLT_CONTAINER_COMPACT: WidgetContainerDef = { w: 396, h: 80, m: 32, line: 3 }

export const XBOX_DFLT_WIDGETS_COMPACT: WidgetDef[] = [
	{ type:WidgetType.StickCircle, x:-OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		ax:[XBA.LSx,XBA.LSy], bt:[XBB.LSB], val:[40] },
	{ type:WidgetType.StickCircle, x:INNER_X_COMPACT, y:INNER_Y_COMPACT,
		ax:[XBA.RSx,XBA.RSy], bt:[XBB.RSB], val:[40] },
	{ type:WidgetType.ButtonRingCircle, x:0, y:-34,
		ax:[], bt:[XBB.Start,XBB.Back], val:[92,10] },
	{ type:WidgetType.DPad, x:-INNER_X_COMPACT, y:INNER_Y_COMPACT,
		ax:[], bt:[XBB.DD,XBB.DR,XBB.DL,XBB.DU], val:[72,24] },
	{ type:WidgetType.ButtonRingCircle, x:OUTER_X_COMPACT, y:OUTER_Y_COMPACT,
		ax:[], bt:[XBB.B,XBB.A,XBB.X,XBB.Y], val:[24,13] },
	{ type:WidgetType.Trigger, x:-XBOX_DFLT_CONTAINER_COMPACT.w/2, y:0,
		ax:[], bt:[XBB.LT,XBB.LB], val:[64,256] },
	{ type:WidgetType.Trigger, x:XBOX_DFLT_CONTAINER_COMPACT.w/2, y:0,
		ax:[], bt:[XBB.RT,XBB.RB], val:[64,256], fx:true },
]

export const XBOX_DFLT_STR_COMPACT: string =
	`${genContainerStr(XBOX_DFLT_CONTAINER_COMPACT)}|${genWidgetStr(XBOX_DFLT_WIDGETS_COMPACT)}`


const XBox: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	const MODE_COMPACT	= params.compact !== undefined
	
	const container: WidgetContainerDef = MODE_COMPACT ?
		XBOX_DFLT_CONTAINER_COMPACT : XBOX_DFLT_CONTAINER

	const widgets: WidgetDef[] = MODE_COMPACT ?
		XBOX_DFLT_WIDGETS_COMPACT : XBOX_DFLT_WIDGETS

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

export default XBox;
