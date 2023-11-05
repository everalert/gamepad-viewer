import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { WidgetContainerDef } from '../../types/widget'
import { WidgetTypeMap } from '../../types/widgetmap'
import { useInputLayout } from '../InputLayout'


const containerdef_re =		/G((?:(?:w|h|m|l|c)\-?[0-9]+)+)/g
const containerparam_re =	/(w|h|m|l|c)(\-?[0-9]+)/g

export const WIDGET_CONTAINER_DFLT: WidgetContainerDef =
	{ w:512, h:144, m:32, line:3 }

export const parseContainerStr = (str:string):WidgetContainerDef => {
	const c_out:WidgetContainerDef = JSON.parse(JSON.stringify(WIDGET_CONTAINER_DFLT))
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
	class?: string;
	style?: string;
}

export const WidgetContainer = (props: WidgetContainerProps) => {
	const [layout] = useInputLayout()
	return <div
		class={`sticky top-0 ${props.class||''}`}
		style={`width:${layout.container.w}px; height:${layout.container.h}px; ${props.style||''}`}
		>
		<For each={layout.widgets}>{w => w.hide ? null : (
			<Dynamic
				component={WidgetTypeMap[w.type]}
				def={w}
				container={layout.container}
			/>
		)}</For>
	</div>
}

export default WidgetContainer
