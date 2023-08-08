import type { JSXElement } from 'solid-js'
import { Index } from 'solid-js'
import { Widget, WidgetProps } from '../Widget'
import { getInputMap } from '../../types/gamepad'
import { deg2rad, rotVec2x, rotVec2y } from '../../helpers/math'


interface DPadProps {
	on: boolean[];
	length: number;
	thickness: number;
	line: number;
	class?: string;
	style?: string;
}

const RADIUS_FACTOR = 0.30  // original design = 8px/28px = 0.285


export const DPad = (props: DPadProps) => {
	const w = () => props.length+props.line*2
	const ang = () => 360/props.on.length
	const rad = () => props.thickness*RADIUS_FACTOR
	const rv2x = (x:number, y:number, i:number) => rotVec2x(x,y,-90+ang()*i)
	const rv2y = (x:number, y:number, i:number) => rotVec2y(x,y,-90+ang()*i)
	const halft = () => props.thickness*0.5
	const ix = () => Math.sqrt((halft()/Math.sin(deg2rad(ang()/2)))**2 - halft()**2)
	const ox = () => props.length/2
	const iy = halft, oy = halft

	const arm = (i:number) => 
`	${ w()/2 + rv2x(ix(), iy(), i) }
	${ w()/2 + rv2y(ix(), iy(), i)}
L	${ w()/2 + rv2x(ox()-rad(), oy(), i) }
	${ w()/2 + rv2y(ox()-rad(), oy(), i) }
Q	${ w()/2 + rv2x(ox(), oy(), i) }
	${ w()/2 + rv2y(ox(), oy(), i) },
	${ w()/2 + rv2x(ox(), oy()-rad(), i) }
	${ w()/2 + rv2y(ox(), oy()-rad(), i) }
L	${ w()/2 + rv2x(ox(), -oy()+rad(), i) }
	${ w()/2 + rv2y(ox(), -oy()+rad(), i) }
Q	${ w()/2 + rv2x(ox(), -oy(), i) }
	${ w()/2 + rv2y(ox(), -oy(), i) },
	${ w()/2 + rv2x(ox()-rad(), -oy(), i) }
	${ w()/2 + rv2y(ox()-rad(), -oy(), i) }`

	const dfull = () => `M ${props.on.map((o,i) => arm(i)).join(' L ')} Z`
	const darm = (i:number) => `M ${arm(i)}
L	${ w()/2 + rv2x(ix(), -iy(), i) }
	${ w()/2 + rv2y(ix(), -iy(), i) }
Z`

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={w()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${w()/2}px;
			${props.style||''}`}
		>
		<path
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.line*2}
			d={dfull()}
		/>
		<Index each={props.on}>{(o,i) =>
			 <path class={`${o()?'fill-white':'fill-transparent'}`} d={darm(i)} />
		}</Index>
		<path
			class={`stroke-gray-300 fill-transparent`}
			stroke-width={props.line}
			d={dfull()}
		/>
	</svg>
}

export const WDPad = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<DPad
			on			= { inputs().map(i => i?.pressed) }
			length=		{props.def.val[0]||80}
			thickness=	{props.def.val[1]||28}
			line=		{props.container.line||3}
		/>
	</Widget>
}

export default DPad;