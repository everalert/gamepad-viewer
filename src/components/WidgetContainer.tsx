import type { Component } from 'solid-js';
import { For, Switch, Match } from 'solid-js';
import { WidgetType, WidgetDef, WidgetProps, Widget} from '../components/Widget'
import type { GamepadState } from '../types/gamepad'
import { WStick, WStickCircle, WStickGC, WStickN64, WStickHori, WStickRndOct, WButton, WButton2, WButton4, WDPad, WTrigger } from './'


export interface WidgetContainerDef {
	w: number;
	h: number;
	m: number;
	line: number;
}

const containerdef_re =		/G((?:(?:w|h|m|l)\-?[0-9]+)+)/g
const containerparam_re =	/(w|h|m|l)(\-?[0-9]+)/g

export const parseContainerStr = (str: string):WidgetContainerDef => {
	const c_out:WidgetContainerDef = { w:512, h:144, m:32, line:3 }
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
				{ widgetMatch(w, WidgetType.StickCircle,	WStickCircle) }
				{ widgetMatch(w, WidgetType.StickGC,		WStickGC) }
				{ widgetMatch(w, WidgetType.StickN64,		WStickN64) }
				{ widgetMatch(w, WidgetType.StickHori,		WStickHori) }
				{ widgetMatch(w, WidgetType.StickRndOct,	WStickRndOct) }
				{ widgetMatch(w, WidgetType.Stick,			WStick) }
				{ widgetMatch(w, WidgetType.Button,			WButton) }
				{ widgetMatch(w, WidgetType.Button2,		WButton2) }
				{ widgetMatch(w, WidgetType.Button4,		WButton4) }
				{ widgetMatch(w, WidgetType.DPad,			WDPad) }
				{ widgetMatch(w, WidgetType.Trigger,		WTrigger) }
			</Switch>
		)}</For>
	</div>
}
