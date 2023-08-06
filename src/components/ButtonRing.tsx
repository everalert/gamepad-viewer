import type { JSXElement } from 'solid-js'
import { Index } from 'solid-js'
import { ButtonShape, ButtonInlineMap } from './'
import { Widget, WidgetProps } from './Widget'
import { deg2rad } from '../helpers/math'
import { getInputMap } from '../types/gamepad'


interface ButtonRingProps {
	r: number;
	rx: number;
	ry: number;
	rz: number;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	rotate?: boolean;
	simple?: boolean;
	class?: string;
	style?: string;
}


export const ButtonRing = (props: ButtonRingProps): JSXElement => {
	const angle = () => deg2rad(360/props.on.length)
	const m = () => props.line*2
	const w = () => (m()+props.r+props.rx)*2
	const lenMult = () => props.on.length!==1?1:0

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={w()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${w()/2}px;
			${props.style||''}`}
		>
		<Index each={props.on}>{(on,i) => {
			const Btn = ButtonInlineMap[props.shape[i%props.shape.length]]
			return Btn ? <Btn
				x={w()/2+props.r*Math.cos(angle()*i)*lenMult()}
				y={w()/2+props.r*Math.sin(angle()*i)*lenMult()}
				d1={props.rx}
				d2={props.ry}
				d3={props.rz}
				simple={props.simple}
				angle={props.rotate?(360/props.on.length)*i:0}
				on={on()}
				w={props.line}
			/> : null
		}}</Index>
	</svg>
}


export const WButtonRing = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<ButtonRing
			on		= { inputs().map(i => i?.pressed) }
			r		= { props.def.val[0] || 28 }
			rx		= { props.def.val[1] || 16 }
			ry		= { props.def.val[2] || 16 }
			rz		= { props.def.val[3] || 0 }
			rotate	= { props.def.val[4]>0 || false }
			simple	= { props.def.val[5]>0 || false }
			shape	= { props.def.val.slice(6) }
			line	= { props.container.line || 3 }
		/>
	</Widget>
}

const WButtonRingShape = (props: {p:WidgetProps,s:ButtonShape}): JSXElement => {
	const inputs = () => getInputMap(props.p.pad?.inputs, props.p.def.inputs)
	return <Widget
		widget={props.p.def} container={props.p.container}>
		<ButtonRing
			on		= { inputs().map(i => i?.pressed) }
			r  		= { props.p.def.val[0] || 28 }
			rx 		= { props.p.def.val[1] || 16 }
			ry 		= { props.p.def.val[2] || 16 }
			rz 		= { props.p.def.val[3] || 0 }
			rotate	= { props.p.def.val[4]>0 || false }
			simple	= { props.p.def.val[5]>0 || false }
			shape	= { [props.s] }
			line	= { props.p.container.line || 3 }
		/>
	</Widget>
}

export const WButtonRingCircle = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.Circle} />

export const WButtonRingRect = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.Rect} />

export const WButtonRingTriangle = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.TriIso} />

export const WButtonRingN64C = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.N64C} />

export const WButtonRingGCXY = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.GCXY} />


export default ButtonRing;
