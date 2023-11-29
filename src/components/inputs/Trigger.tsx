import { type JSX, createMemo } from 'solid-js'
import { Show } from 'solid-js'
import { TriggerSimpleMode } from '../../types/inputs'
import { rc2rad, rc2deg } from '../../helpers/math'
import { Color, getColorDef } from '../../types/colors'


interface TriggerProps {
	trigger: number;
	bumper: boolean;
	trigR: number;
	trigH: number;
	simple: TriggerSimpleMode;
	line: number;
	color?: Color;
	style?: string;
	class?: string;
}


const MARK_HSCALE = 2.25
const MARK_VSCALE = 4/7
const MARK_RSCALE = 1/3


export const Trigger = (props: TriggerProps): JSX.Element => {
	const color		= createMemo(() => getColorDef(props.color))
	const rad		= createMemo(() => rc2rad(props.trigR,props.trigH))
	const deg		= createMemo(() => rc2deg(props.trigR,props.trigH))
	const m			= createMemo(() => props.line*2)
	const x			= (m:number) => props.trigR===0 ? 0 :
						props.trigR*(1-Math.cos(rad()*m))
	const y			= (m:number) => props.trigR===0 ? props.trigH*m :
						props.trigR*Math.sin(rad()*m)

	const markL		= createMemo(() => props.line*MARK_VSCALE)
	const markW		= createMemo(() => markL()+props.line*MARK_HSCALE)
	const markH		= createMemo(() => markL()+props.line*MARK_HSCALE*MARK_VSCALE)
	const markR		= createMemo(() => markW()*MARK_RSCALE)
	const markContW = createMemo(() => Math.sqrt(markW()**2+markW()**2))
	
	const trig		= createMemo(() => props.trigger-0.5)
	const path = (p1:number, p2:number) => props.trigR===0 ?
		`M ${m()} ${m()+props.trigH/2-y(p1)} V ${m()+props.trigH/2-y(p2)}` :
		`M ${m()+x(p1)} ${m()+props.trigH/2-y(p1)}
		A ${props.trigR} ${props.trigR} 0  0 ${p2<p1?0:1}  ${m()+x(p2)} ${m()+props.trigH/2-y(p2)}`
	
	const isThick	= createMemo(() => TriggerSimpleMode[props.simple].includes('Thick'))
	const isFull	= createMemo(() => TriggerSimpleMode[props.simple].includes('Full'))
	const isSimple	= createMemo(() =>
		props.simple>TriggerSimpleMode.NONE && props.simple<TriggerSimpleMode.MAX)

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={x(1)+m()*2}
		height={props.trigH+m()*2}
		class={`${props.class||''}`}
		style={`margin-left:-${m()}px;margin-top:-${m()+props.trigH/2}px;${props.style||''}`}
		>

		<Show when={!isSimple()}>
			<path
				// outline
				d={path(-0.5,0.5)}	
				class={`opacity-[0.35] fill-transparent ${color().bgOl}`}
				stroke-width={props.line*3}
				stroke-linecap='square'
			/>
			<path
				// main line
				d={path(-0.5,0.5)}	
				class={`fill-transparent ${props.bumper ? color().lineOn : color().lineOff}`}
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
					class={`${color().hl} ${color().bgOl}`}
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

		<Show when={isSimple()}>
			<path
				// background
				d={path(-0.5,0.5)}	
				class={`fill-transparent ${ props.bumper ?
					'opacity-[0.85]' : 'opacity-50' } ${color().sBgOl}`}
				stroke-width={isThick() ? props.line*4 : props.line*2}
			/>
			<path
				// foreground
				d={path(isFull()?-0.5:0,trig())}
				class={`fill-transparent ${props.bumper ? color().hlOl : color().ol}`}
				stroke-width={isThick() ? props.line*4+1 : props.line*2+1}
			/>
		</Show>
	</svg>
}

export default Trigger
