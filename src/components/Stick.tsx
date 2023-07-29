import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'

interface StickProps {
	x: number;
	y: number;
	button?: boolean;
	r: number;
	line: number;
	class?: string;
	style?: string;
}

const DOT_RSCALE = 1.25	// radius
const DOT_LSCALE = 0.6	// line

const Stick = (props: StickProps) => {
	const dotR = () => props.line*DOT_RSCALE+props.line*DOT_LSCALE
	const m = () => props.line+dotR()

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={(props.r+m())*2}
		height={(props.r+m())*2}
		class={`${props.class||''}`}
		style={`margin-left:-${(props.r+m())}px;
margin-top:-${(props.r+m())}px;
${props.style||''}`}
		>
		<circle
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.line*2}
			cx={props.r+m()}
			cy={props.r+m()}
			r={props.r}
		/>
		<line
			class='stroke-gray-900'
			stroke-width={props.line/2}
			x1={props.r+m()}
			x2={props.r+m()}
			y1={m()}
			y2={props.r*2+m()}
		/>
		<line
			class='stroke-gray-900'
			stroke-width={props.line/2}
			y1={props.r+m()}
			y2={props.r+m()}
			x1={m()}
			x2={props.r*2+m()}
		/>
		<circle
			class={`fill-transparent ${props.button?'stroke-gray-300':'stroke-gray-800'}`}
			stroke-width={props.line}
			cx={props.r+m()}
			cy={props.r+m()}
			r={props.r}
		/>

		<line
			class={`stroke-gray-500`}
			stroke-width={props.line}
			stroke-linecap='round'
			x1={props.r+m()}
			y1={props.r+m()}
			x2={(props.x+1)*props.r+m()}
			y2={(props.y+1)*props.r+m()}
		/>
		<circle
			class='fill-white stroke-black'
			stroke-width={props.line*DOT_LSCALE}
			cx={(props.x+1)*props.r+m()}
			cy={(props.y+1)*props.r+m()}
			r={dotR()}
		/>
	</svg>
}

export const WStick = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<Stick
		x={props.pad?.axes[props.def.ax[0]]||0}
		y={props.pad?.axes[props.def.ax[1]]||0}
		button={props.pad?.buttonPress[props.def.bt[0]]||false}
		r={props.def.val[0]||48}
		line={props.container.line||3}
	/>	
</Widget>

export default Stick;
