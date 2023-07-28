import { clamp, rc2s, rc2rad, rc2deg } from '../helpers/math'
import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'


interface TriggerProps {
	trigger: number;
	bumper: boolean;
	trigR: number;
	trigH: number;
	markW: number;
	line: number;
	style?: string;
	class?: string;
}

const MARK_VSCALE = 4/7


const Trigger = (props: TriggerProps) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={rc2s(props.trigR,props.trigH) + props.markW + props.line*2}
	height={props.trigH + props.markW + props.line*2}
	class={`${props.class||''}`}
	style={`margin-left:-${(props.line*2+props.markW)/2}px;
		margin-top:-${(props.line*2+props.markW+props.trigH)/2}px;
		${props.style||''}`}
	>
	<path
		class={`fill-transparent stroke-black/[0.35]`}
		stroke-width={props.line*3}
		d={`M ${props.line+rc2s(props.trigR,props.trigH+props.line)+props.markW/2} ${props.markW/2}
			a ${props.trigR} ${props.trigR} 0  0 0  0 ${props.trigH+props.line*2}`}
	/>
	<path
		class={`fill-transparent ${props.bumper?'stroke-gray-300':'stroke-gray-800'}`}
		stroke-width={props.line}
		d={`M ${props.line+rc2s(props.trigR,props.trigH)+props.markW/2} ${props.line+props.markW/2}
			a ${props.trigR} ${props.trigR} 0  0 0  0 ${props.trigH}`}
	/>
	<svg
		x={props.line/2-props.line*MARK_VSCALE+props.trigR*(1-Math.cos(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		y={props.line/2-props.line*MARK_VSCALE+props.trigH/2-
			props.trigR*(Math.sin(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		width={props.markW+(props.line+props.line*MARK_VSCALE)*2}
		height={props.markW+(props.line+props.line*MARK_VSCALE)*2}
		>
		<rect
			class='fill-black'
			transform={`rotate(${rc2deg(props.trigR,props.trigH)*(props.trigger-0.5)} ${props.markW/2+(props.line*MARK_VSCALE)} ${props.markW/2+(props.line*MARK_VSCALE)})`}
			x={props.line-props.line*MARK_VSCALE}
			y={props.line-props.line*MARK_VSCALE+(props.markW-props.markW*MARK_VSCALE)/2}
			rx={props.markW*MARK_VSCALE**2+props.line*MARK_VSCALE}
			ry={props.markW*MARK_VSCALE**2+props.line*MARK_VSCALE}
			width={props.line*MARK_VSCALE*2+props.markW}
			height={props.line*MARK_VSCALE*2+props.markW*MARK_VSCALE}
		/>
		<rect
			class='fill-white'
			transform={`rotate(${rc2deg(props.trigR,props.trigH)*(props.trigger-0.5)} ${props.markW/2+(props.line*MARK_VSCALE)} ${props.markW/2+(props.line*MARK_VSCALE)})`}
			x={props.line}
			y={props.line+(props.markW-props.markW*MARK_VSCALE)/2}
			rx={props.markW*MARK_VSCALE**2}
			ry={props.markW*MARK_VSCALE**2}
			width={props.markW}
			height={props.markW*MARK_VSCALE}
		/>
	</svg>
</svg>

export const WTrigger = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<Trigger
		trigger={clamp(props.pad?.axes[props.def.ax[0]]*(props.def.val[3]>=1?-1:1),0,1)
			||props.pad?.buttonValue[props.def.bt[0]]||0}
		bumper={props.pad?.buttonPress[props.def.bt[props.def.ax[0]===undefined?1:0]]
			||false}
		trigH={props.def.val[0]||64}
		trigR={props.def.val[1]||256}
		markW={props.def.val[2]||8}
		line={props.container.line||3}
	/>	
</Widget>

export default Trigger;
