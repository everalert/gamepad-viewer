import { rc2s, rc2rad } from '../helpers/math'


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

const MARK_VSCALE = 3/5


const Trigger = (props: TriggerProps) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={rc2s(props.trigR,props.trigH) + props.markW + props.line*2}
	height={props.trigH + props.markW + props.line*2}
	class={`inline-block ${props.class||''}`}
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
	<rect
		class='fill-black'
		x={props.line-props.line*MARK_VSCALE+props.trigR*(1-Math.cos(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		y={props.line-props.line*MARK_VSCALE+props.markW/2+props.trigH/2-
			props.trigR*(Math.sin(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		rx={props.markW*MARK_VSCALE/2+props.line*MARK_VSCALE}
		ry={props.markW*MARK_VSCALE/2+props.line*MARK_VSCALE}
		width={props.markW+props.line*MARK_VSCALE*2}
		height={props.markW*MARK_VSCALE+props.line*MARK_VSCALE*2}
	/>
	<rect
		class='fill-white'
		x={props.line+props.trigR*(1-Math.cos(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		y={props.line+props.markW/2+props.trigH/2-
			props.trigR*(Math.sin(rc2rad(props.trigR,props.trigH)*(props.trigger-0.5)))}
		rx={props.markW*MARK_VSCALE/2}
		ry={props.markW*MARK_VSCALE/2}
		width={props.markW}
		height={props.markW*MARK_VSCALE}
	/>
</svg>

export default Trigger;
