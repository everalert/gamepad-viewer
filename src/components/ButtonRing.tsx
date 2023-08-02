import type { JSXElement } from 'solid-js'
import { For } from 'solid-js'
import { Widget, WidgetProps } from './Widget'
import { deg2rad } from '../helpers/math'
import { ButtonShape, ButtonInlineMap } from './ButtonInline'


interface ButtonRingProps {
	r: number;
	rx: number;
	ry: number;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	rotate?: boolean;
	class?: string;
	style?: string;
}


export const ButtonRing = (props: ButtonRingProps): JSXElement => {
	const angle = () => deg2rad(360/props.on.length)
	const m = () => props.line*2
	const w = () => (m()+props.r+props.rx)*2
	const lenMult = () => props.on.length!==1?1:0
	const shape = (i:number) =>
		props.shape.length>0 && props.shape[i%props.shape.length] in ButtonInlineMap ?
		ButtonInlineMap[props.shape[i%props.shape.length]] : ButtonInlineMap[0]

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={w()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${w()/2}px;
			${props.style||''}`}
		>
		<For each={props.on}>{(on,i) => {
			const Btn = shape(i())
			return Btn ? <Btn
				x={w()/2+props.r*Math.cos(angle()*i())*lenMult()}
				y={w()/2+props.r*Math.sin(angle()*i())*lenMult()}
				d1={props.rx}
				d2={props.ry}
				angle={props.rotate?(360/props.on.length)*i():0}
				on={on}
				w={props.line}
			/> : null
		}}</For>
	</svg>
}


export const WButtonRing = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<ButtonRing
		on =	{ props.def.bt.map(b=>props.pad?.buttonPress[b]) }
		r  =	{ props.def.val[0] || 28 }
		rx =	{ props.def.val[1] || 16 }
		ry =	{ props.def.val[2] || 16 }
		rotate = { props.def.val[3]>0 || false }
		shape =	{ props.def.val.slice(4) }
		line =	{ props.container.line || 3 }
	/>
</Widget>

const WButtonRingShape = (props: {p:WidgetProps,s:ButtonShape}): JSXElement => <Widget
	widget={props.p.def} container={props.p.container}>
	<ButtonRing
		on =	{ props.p.def.bt.map(b=>props.p.pad?.buttonPress[b]) }
		r  =	{ props.p.def.val[0] || 28 }
		rx =	{ props.p.def.val[1] || 16 }
		ry =	{ props.p.def.val[2] || 16 }
		shape =	{[props.s]}
		line =	{ props.p.container.line || 3 }
	/>
</Widget>

export const WButtonRingCircle = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.Circle} />

export const WButtonRingRect = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.Rect} />

export const WButtonRingTriangle = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.TriIso} />

export const WButtonRingN64C = (props: WidgetProps): JSXElement => 
	<WButtonRingShape p={props} s={ButtonShape.N64C} />


export default ButtonRing;
