import { For, Switch, Match } from 'solid-js';
import { WidgetType, WidgetDef, Widget} from '../components/Widget'
import type { GamepadState } from '../types/gamepad'
import { WStick, WStickO, WButton, WButton2, WButton4, WDPad, WTrigger } from './'


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

export const WidgetContainer = (props: WidgetContainerProps) => <div
	class={`relative ${props.class||''}`}
	style={`width:${props.def.w}px; height:${props.def.h}px; ${props.style||''}`}
	>
	<For each={props.widgets}>{w => (
		<Switch fallback={<Widget widget={w} container={props.def}>
			no {WidgetType[w.type]} widget
		</Widget>}>
			<Match when={w.type===WidgetType.Stick}>
				<WStick pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.StickOct}>
				<WStickO pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.Button}>
				<WButton pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.Button2}>
				<WButton2 pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.Button4}>
				<WButton4 pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.DPad}>
				<WDPad pad={props.pad} def={w} container={props.def} />
			</Match>
			<Match when={w.type===WidgetType.Trigger}>
				<WTrigger pad={props.pad} def={w} container={props.def} />
			</Match>
		</Switch>
	)}</For>
</div>
