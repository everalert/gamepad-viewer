import type { JSXElement } from 'solid-js'
import { Show } from 'solid-js'
import { Widget, WidgetProps } from '../Widget'
import { getInputMap } from '../../types/gamepad'
import { clamp, rc2rad, rc2deg } from '../../helpers/math'


export enum TriggerSimpleMode {
	None,
	Full,
	Split,
	FullThick,
	SplitThick,
}


interface TriggerProps {
	trigger: number;
	bumper: boolean;
	trigR: number;
	trigH: number;
	simple: TriggerSimpleMode;
	line: number;
	style?: string;
	class?: string;
}

const MARK_HSCALE = 2.25
const MARK_VSCALE = 4/7
const MARK_RSCALE = 1/3


export const Trigger = (props: TriggerProps) => {
	const rad		= () => rc2rad(props.trigR,props.trigH)
	const deg		= () => rc2deg(props.trigR,props.trigH)
	const m			= () => props.line*2
	const x			= (m:number) => props.trigR===0 ? 0 :
						props.trigR*(1-Math.cos(rad()*m))
	const y			= (m:number) => props.trigR===0 ? props.trigH*m :
						props.trigR*Math.sin(rad()*m)
	const markL		= () => props.line*MARK_VSCALE
	const markW		= () => markL()+props.line*MARK_HSCALE
	const markH		= () => markL()+props.line*MARK_HSCALE*MARK_VSCALE
	const markR		= () => markW()*MARK_RSCALE
	const markContW = () => Math.sqrt(markW()**2+markW()**2)
	const trig		= () => props.trigger-0.5
	const path = (p1:number, p2:number) => props.trigR===0 ?
		`M ${m()} ${m()+props.trigH/2-y(p1)} V ${m()+props.trigH/2-y(p2)}` :
		`M ${m()+x(p1)} ${m()+props.trigH/2-y(p1)}
		A ${props.trigR} ${props.trigR} 0  0 ${p2<p1?0:1}  ${m()+x(p2)} ${m()+props.trigH/2-y(p2)}`
	const isThick = () => TriggerSimpleMode[props.simple].includes('Thick')

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={x(1)+m()*2}
		height={props.trigH+m()*2}
		class={`${props.class||''}`}
		style={`margin-left:-${m()}px;margin-top:-${m()+props.trigH/2}px;${props.style||''}`}
		>

		<Show when={props.simple===TriggerSimpleMode.None}>
			<path
				// outline
				d={path(-0.5,0.5)}	
				class={`fill-transparent stroke-black/[0.35]`}
				stroke-width={props.line*3}
				stroke-linecap='square'
			/>
			<path
				// main line
				d={path(-0.5,0.5)}	
				class={`fill-transparent ${props.bumper?'stroke-gray-300':'stroke-gray-800'}`}
				stroke-width={props.line}
				stroke-linecap='square'
			/>
			<svg
				// marker 
				x={m()-markContW()/2+x(trig())}
				y={m()-markContW()/2+props.trigH/2-y(trig())}
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
		</Show>

		<Show when={props.simple!==TriggerSimpleMode.None}>
			<path
				// background
				d={path(-0.5,0.5)}	
				class={`fill-transparent ${ props.bumper ?
					'stroke-black/[0.75]' : 'stroke-black/[0.5]' }`}
				stroke-width={isThick() ? props.line*4 : props.line*2}
			/>
			<path
				// foreground
				d={path(TriggerSimpleMode[props.simple].includes('Full')?-0.5:0,trig())}	
				class={`fill-transparent ${props.bumper?'stroke-white':'stroke-gray-300'}`}
				stroke-width={isThick() ? props.line*4 : props.line*2}
			/>
		</Show>
	</svg>
}

export const WTrigger = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { inputs()[0]?.bscalar || 0 }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { props.def.val[1]>=0 ? props.def.val[1] : 256 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.None }
			line	= { props.container.line || 3 }
		/>	
	</Widget>
}

export const WTriggerCurved = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { inputs()[0]?.bscalar || 0 }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { props.def.val[1]>=0 ? props.def.val[1] : 256 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.None }
			line	= { props.container.line || 3 }
		/>	
	</Widget>
}

export const WTriggerFlat = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { inputs()[0]?.bscalar || 0 }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { 0 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.None }
			line	= { props.container.line || 3 }
		/>	
	</Widget>
}

export default Trigger;
