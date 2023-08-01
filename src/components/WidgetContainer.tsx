import type { Component } from 'solid-js';
import { For, Switch, Match } from 'solid-js';
import { WidgetType, WidgetDef, WidgetProps, Widget} from '../components/Widget'
import type { GamepadState } from '../types/gamepad'
import { 
	WStick, WStickCircle, WStickSquare, WStickGC, WStickN64, WStickHori, WStickRound,
	WButtonRing, WButtonRingCircle, WButtonRingRect, WButtonRingTriangle, WButtonRingN64C,
	WButtonGrid, WButtonGridCircle, WButtonGridRect, WButtonGridTriangle, WButtonGridN64C,
	WDPad, WTrigger, WTriggerCurved, WTriggerFlat,
} from './'


export interface WidgetContainerDef {
	w: number;
	h: number;
	m: number;
	line: number;
}

const containerdef_re =		/G((?:(?:w|h|m|l)\-?[0-9]+)+)/g
const containerparam_re =	/(w|h|m|l)(\-?[0-9]+)/g
export const WCONTAINER_DFLT = { w:512, h:144, m:32, line:3 }

export const parseContainerStr = (str: string):WidgetContainerDef => {
	const c_out:WidgetContainerDef = JSON.parse(JSON.stringify(WCONTAINER_DFLT))
	for (const c of str.matchAll(containerdef_re)) {
		for (const p of c[1].matchAll(containerparam_re)) {
			switch (p[1]) {
				case 'w': c_out.w = Number.parseInt(p[2]); break;
				case 'h': c_out.h = Number.parseInt(p[2]); break;
				case 'm': c_out.m = Number.parseInt(p[2]); break;
				case 'l': c_out.line = Number.parseInt(p[2]); break;
			}
		}
	}
	return c_out
}

export const genContainerStr = (container:WidgetContainerDef):string => {
	const w = `w${container.w.toString()}`
	const h = `h${container.h.toString()}`
	const m = `m${container.m.toString()}`
	const l = `l${container.line.toString()}`
	return `G${w}${h}${m}${l}`
}


export interface WidgetContainerProps {
	def: WidgetContainerDef;
	widgets: WidgetDef[];
	pad: GamepadState
	class?: string;
	style?: string;
}

export const WidgetContainer = (props: WidgetContainerProps) => {
	const widgetMatch = (w:WidgetDef, t:WidgetType, C:Component<WidgetProps>) => (
		<Match when={w.type===t}>
			<C pad={props.pad} def={w} container={props.def} />
		</Match>
	)
	return <div
		class={`relative ${props.class||''}`}
		style={`width:${props.def.w}px; height:${props.def.h}px; ${props.style||''}`}
		>
		<For each={props.widgets}>{w => (
			<Switch fallback={<Widget widget={w} container={props.def}>
				no {WidgetType[w.type]} widget
			</Widget>}>
				{ widgetMatch(w, WidgetType.StickCircle,		WStickCircle) }
				{ widgetMatch(w, WidgetType.StickSquare,		WStickSquare) }
				{ widgetMatch(w, WidgetType.StickGC,			WStickGC) }
				{ widgetMatch(w, WidgetType.StickN64,			WStickN64) }
				{ widgetMatch(w, WidgetType.StickHori,			WStickHori) }
				{ widgetMatch(w, WidgetType.StickRound,			WStickRound) }
				{ widgetMatch(w, WidgetType.Stick,				WStick) }
				{ widgetMatch(w, WidgetType.ButtonRing,			WButtonRing) }
				{ widgetMatch(w, WidgetType.ButtonRingCircle,	WButtonRingCircle) }
				{ widgetMatch(w, WidgetType.ButtonRingRect,		WButtonRingRect) }
				{ widgetMatch(w, WidgetType.ButtonRingTriangle,	WButtonRingTriangle) }
				{ widgetMatch(w, WidgetType.ButtonRingN64C,		WButtonRingN64C) }
				{ widgetMatch(w, WidgetType.ButtonGrid,			WButtonGrid) }
				{ widgetMatch(w, WidgetType.ButtonGridCircle,	WButtonGridCircle) }
				{ widgetMatch(w, WidgetType.ButtonGridRect,		WButtonGridRect) }
				{ widgetMatch(w, WidgetType.ButtonGridTriangle,	WButtonGridTriangle) }
				{ widgetMatch(w, WidgetType.ButtonGridN64C,		WButtonGridN64C) }
				{ widgetMatch(w, WidgetType.DPad,				WDPad) }
				{ widgetMatch(w, WidgetType.Trigger,			WTrigger) }
				{ widgetMatch(w, WidgetType.TriggerCurved,		WTriggerCurved) }
				{ widgetMatch(w, WidgetType.TriggerFlat,		WTriggerFlat) }
			</Switch>
		)}</For>
	</div>
}
