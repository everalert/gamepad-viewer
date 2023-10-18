import type { GamepadState } from '../../types/gamepad'
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { WidgetTypeMap, WidgetDef } from '../Widget'
import { Color } from '../../types/colors'


export interface WidgetContainerDef {
	w: number;
	h: number;
	m: number;
	line: number;
	color?: Color;
}

const containerdef_re =		/G((?:(?:w|h|m|l|c)\-?[0-9]+)+)/g
const containerparam_re =	/(w|h|m|l|c)(\-?[0-9]+)/g

export const WCONTAINER_DFLT: WidgetContainerDef =
	{ w:512, h:144, m:32, line:3 }

export const parseContainerStr = (str:string):WidgetContainerDef => {
	const c_out:WidgetContainerDef = JSON.parse(JSON.stringify(WCONTAINER_DFLT))
	if (!str) return c_out
	for (const c of str.matchAll(containerdef_re)) {
		for (const p of c[1].matchAll(containerparam_re)) {
			switch (p[1]) {
				case 'w': c_out.w = Number.parseInt(p[2]); break;
				case 'h': c_out.h = Number.parseInt(p[2]); break;
				case 'm': c_out.m = Number.parseInt(p[2]); break;
				case 'l': c_out.line = Number.parseInt(p[2]); break;
				case 'c': c_out.color = Number.parseInt(p[2]); break;
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
	const c = container.color > 0 ? `c${container.color.toString()}` : ''
	return `G${w}${h}${m}${l}${c}`
}


export interface WidgetContainerProps {
	def: WidgetContainerDef;
	widgets: WidgetDef[];
	pad: GamepadState
	class?: string;
	style?: string;
}

export const WidgetContainer = (props: WidgetContainerProps) => {
	return <div
		class={`sticky top-0 ${props.class||''}`}
		style={`width:${props.def.w}px; height:${props.def.h}px; ${props.style||''}`}
		>
		<For each={props.widgets}>{w => w.hide ? null : (
			<Dynamic
				component={WidgetTypeMap[w.type]}
				def={w}
				container={props.def}
			/>
		)}</For>
	</div>
}

export default WidgetContainer
