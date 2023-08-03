import type { JSXElement } from 'solid-js'
import { For } from 'solid-js'
import { Widget, WidgetProps } from './Widget'
import { ButtonShape, ButtonInlineMap } from './ButtonInline'
import { getInputMap } from '../types/gamepad'


interface ButtonGridProps {
	cols: number;
	stepx: number;
	stepy: number;
	rx: number;
	ry: number;
	rz: number;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	class?: string;
	style?: string;
}


export const ButtonGrid = (props: ButtonGridProps): JSXElement => {
	const wi = () => (props.cols-1)*props.stepx
	const hi = () => (Math.ceil(props.on.length/props.cols)-1)*props.stepy
	const m = () => props.line*2
	const w = () => (m()+props.rx+props.ry)*2+wi()
	const h = () => (m()+props.rx+props.ry)*2+hi()
	const mi = () => (w()-wi())*0.5
	const shape = (i:number) =>
		props.shape.length>0 && props.shape[i%props.shape.length] in ButtonInlineMap ?
		ButtonInlineMap[props.shape[i%props.shape.length]] : ButtonInlineMap[0]

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={h()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${h()/2}px;
			${props.style||''}`}
		>
		<For each={props.on}>{(on,i) => {
			const Btn = shape(i())
			return Btn ? <Btn
				x={mi()+props.stepx*(i()%props.cols)}
				y={mi()+props.stepy*(Math.floor(i()/props.cols))}
				d1={props.rx}
				d2={props.ry}
				d3={props.rz}
				angle={0}
				on={on}
				w={props.line}
			/> : null
		}}</For>
	</svg>
}


export const WButtonGrid = (props: WidgetProps): JSXElement => {
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	return <Widget
		widget={props.def} container={props.container}>
		<ButtonGrid
			on		= { inputs().map(i => i?.pressed) }
			cols	= { props.def.val[0] || props.def.inputs.length }
			stepx	= { props.def.val[1] || 41 }
			stepy	= { props.def.val[2] || 41 }
			rx		= { props.def.val[3] || 16 }
			ry		= { props.def.val[4] || 16 }
			rz		= { props.def.val[5] || 0 }
			shape	= { props.def.val.slice(6) }
			line	= { props.container.line || 3 }
		/>
	</Widget>
}

const WButtonGridShape = (props: {p:WidgetProps,s:ButtonShape}): JSXElement => {
	const inputs = () => getInputMap(props.p.pad?.inputs, props.p.def.inputs)
	return <Widget
		widget={props.p.def} container={props.p.container}>
		<ButtonGrid
			on		= { inputs().map(i => i?.pressed) }
			cols	= { props.p.def.val[0] || props.p.def.inputs.length }
			stepx	= { props.p.def.val[1] || 41 }
			stepy	= { props.p.def.val[2] || 41 }
			rx		= { props.p.def.val[3] || 16 }
			ry		= { props.p.def.val[4] || 16 }
			rz		= { props.p.def.val[5] || 0 }
			shape	= { [props.s] }
			line	= { props.p.container.line || 3 }
		/>
	</Widget>
}

export const WButtonGridCircle = (props: WidgetProps): JSXElement => 
	<WButtonGridShape p={props} s={ButtonShape.Circle} />

export const WButtonGridRect = (props: WidgetProps): JSXElement => 
	<WButtonGridShape p={props} s={ButtonShape.Rect} />

export const WButtonGridTriangle = (props: WidgetProps): JSXElement => 
	<WButtonGridShape p={props} s={ButtonShape.TriIso} />

export const WButtonGridN64C = (props: WidgetProps): JSXElement => 
	<WButtonGridShape p={props} s={ButtonShape.N64C} />


export default ButtonGrid;
