import type { JSXElement } from 'solid-js'
import { Index } from 'solid-js'
import { Widget, WidgetProps } from '../Widget'
import type { InputPickerDef, ValuePickerDef } from '../ui'
import { Slider, Checkbox } from '../ui'
import { deg2rad, rotVec2x, rotVec2y } from '../../helpers/math'
import { Color, getColorDef, resolveColor } from '../../types/colors'


interface DPadProps {
	on: boolean[];
	length: number;
	thickness: number;
	line: number;
	simple?: boolean;
	color?: Color;
	class?: string;
	style?: string;
}

export const DPadInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['right button','clockwise'],
}

export const DPadValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'length' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

const RADIUS_FACTOR = 0.30  // original design = 8px/28px = 0.285


export const DPad = (props: DPadProps) => {
	const color = () => getColorDef(props.color)
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
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.line*2}
			d={dfull()}
		/>
		<Index each={props.on}>{(o,i) =>
			 <path class={`${o() ? color().hl : 'fill-transparent'}`} d={darm(i)} />
		}</Index>
		<path
			class={`${color().ol} fill-transparent`}
			stroke-width={props.simple?0:props.line}
			d={dfull()}
		/>
	</svg>
}

export const WDPad = (props: WidgetProps): JSXElement => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<DPad
			on			= { inputs().map(i => i?.pressed) }
			length		= { props.def.val[0] || 80 }
			thickness	= { props.def.val[1] || 28 }
			simple		= { props.def.val[2]>0 || false }
			line		= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

export default DPad;
