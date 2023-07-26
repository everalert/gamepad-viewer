import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'

interface StickProps {
	x: number;
	y: number;
	button?: boolean;
	r1: number;
	r2: number;
	line: number;
	class?: string;
	style?: string;
}


const Stick = (props: StickProps) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={(props.r1+props.r2+props.line)*2}
	height={(props.r1+props.r2+props.line)*2}
	class={`inline-block ${props.class||''}`}
	style={`margin-left:-${(props.r1+props.r2+props.line)}px;
			margin-top:-${(props.r1+props.r2+props.line)}px;
			${props.style||''}`}
	>
	<circle
		class='fill-black/[0.5]'
		cx={props.r1+props.r2+props.line}
		cy={props.r1+props.r2+props.line}
		r={props.r1+props.line}
	/>

	<line
		class='stroke-gray-800/[0.5]'
		stroke-width={props.line/2}
		x1={props.r1+props.r2+props.line}
		x2={props.r1+props.r2+props.line}
		y1={props.r2+props.line}
		y2={props.r1*2+props.r2+props.line}
	/>
	<line
		class='stroke-gray-800/[0.5]'
		stroke-width={props.line/2}
		y1={props.r1+props.r2+props.line}
		y2={props.r1+props.r2+props.line}
		x1={props.r2+props.line}
		x2={props.r1*2+props.r2+props.line}
	/>
	<circle
		class={`fill-transparent ${props.button?'stroke-gray-300':'stroke-gray-800'}`}
		stroke-width={props.line}
		cx={props.r1+props.r2+props.line}
		cy={props.r1+props.r2+props.line}
		r={props.r1}
	/>

	<line
		class='stroke-black/[0.5]'
		stroke-width={props.line*2}
		x1={props.r1+props.r2+props.line}
		y1={props.r1+props.r2+props.line}
		x2={(props.x+1)*props.r1+props.r2+props.line}
		y2={(props.y+1)*props.r1+props.r2+props.line}
	/>
	<circle
		class='fill-gray-500 stroke-black/[0.5]'
		stroke-width={props.line/2}
		cx={props.r1+props.r2+props.line}
		cy={props.r1+props.r2+props.line}
		r={props.line/2}
	/>
	<line
		class='stroke-gray-500'
		stroke-width={props.line}
		x1={props.r1+props.r2+props.line}
		y1={props.r1+props.r2+props.line}
		x2={(props.x+1)*props.r1+props.r2+props.line}
		y2={(props.y+1)*props.r1+props.r2+props.line}
	/>
	<circle
		class='fill-white stroke-black'
		stroke-width={props.line/2}
		cx={(props.x+1)*props.r1+props.r2+props.line}
		cy={(props.y+1)*props.r1+props.r2+props.line}
		r={props.r2}
	/>
</svg>

export const WStick = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<Stick
		x={props.pad?.axes[props.def.ax[0]]||0}
		y={props.pad?.axes[props.def.ax[1]]||0}
		button={props.pad?.buttonPress[props.def.bt[0]]||false}
		r1={props.def.val[0]||48}
		r2={props.def.val[1]||5}
		line={props.container.line||3}
	/>	
</Widget>

export default Stick;
