import { clamp, rc2s, rc2rad, rc2deg } from '../helpers/math'
import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'


interface TriggerProps {
	trigger: number;
	bumper: boolean;
	trigR: number;
	trigH: number;
	line: number;
	style?: string;
	class?: string;
}

const MARK_HSCALE = 2.25
const MARK_VSCALE = 4/7
const MARK_RSCALE = 1/3
const LINE_N = 'TriggerLine'


const Trigger = (props: TriggerProps) => {
	const m = () => props.line*2
	const rad = () => rc2rad(props.trigR,props.trigH)
	const deg = () => rc2deg(props.trigR,props.trigH)
	const markL = () => props.line*MARK_VSCALE
	const markW = () => markL()+props.line*MARK_HSCALE
	const markH = () => markL()+props.line*MARK_HSCALE*MARK_VSCALE
	const markR = () => markW()*MARK_RSCALE
	const markContW = () => Math.sqrt(markW()**2+markW()**2)
	const trig = () => props.trigger-0.5
	const linename = () => `${LINE_N}_${props.trigR}_${props.trigH}`
	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={rc2s(props.trigR,props.trigH)+m()*2}
		height={props.trigH+m()*2}
		class={`${props.class||''}`}
		style={`margin-left:-${m()}px;margin-top:-${m()+props.trigH/2}px;${props.style||''}`}
		>
		<defs>
			<symbol id={linename()}>
				<path d={`M
					${m()+props.trigR*(1-Math.cos(rad()/2))}
					${m()+props.trigH/2-props.trigR*Math.sin(rad()/2)}
					a ${props.trigR} ${props.trigR} 0  0 0  0 ${props.trigH}`}
				/>
			</symbol>
		</defs>
		<use
			// outline
			href={`#${linename()}`}	
			class={`fill-transparent stroke-black/[0.35]`}
			stroke-width={props.line*3}
			stroke-linecap='square'
		/>
		<use
			// main line
			href={`#${linename()}`}	
			class={`fill-transparent ${props.bumper?'stroke-gray-300':'stroke-gray-800'}`}
			stroke-width={props.line}
			stroke-linecap='square'
		/>
		<svg
			// marker 
			x={m()-markContW()/2+props.trigR*(1-Math.cos(rad()*trig()))}
			y={m()-markContW()/2+props.trigH/2-props.trigR*(Math.sin(rad()*trig()))}
			width={markContW()}
			height={markContW()}
			>
			<rect
				class='fill-white stroke-black'
				stroke-width={markL()}
				transform={`rotate(${deg()*trig()} ${markContW()/2} ${markContW()/2})`}
				x={(markContW()-markW())/2}
				y={(markContW()-markH())/2}
				rx={markR()}
				ry={markR()}
				width={markW()}
				height={markH()}
			/>
		</svg>
	</svg>
}

export const WTrigger = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<Trigger
		trigger={clamp(props.pad?.axes[props.def.ax[0]]*(props.def.val[2]>=1?-1:1),0,1)
			||props.pad?.buttonValue[props.def.bt[0]]||0}
		bumper={props.pad?.buttonPress[props.def.bt[props.def.ax[0]===undefined?1:0]]
			||false}
		trigH={props.def.val[0]>=0?props.def.val[0]:64}
		trigR={props.def.val[1]>=0?props.def.val[1]:256}
		line={props.container.line||3}
	/>	
</Widget>

export default Trigger;
