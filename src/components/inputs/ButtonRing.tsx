import type { JSXElement } from 'solid-js'
import { Index } from 'solid-js'
import { ButtonShape, ButtonInlineMap } from './'
import { Widget, WidgetProps } from '../Widget'
import type { InputPickerDef, ValuePickerDef } from '../ui'
import { Slider, Checkbox, Dropdown } from '../ui'
import { deg2rad } from '../../helpers/math'
import { Color, resolveColor } from '../../types/colors'


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
	color?: Color;
}

export const ButtonRingInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['right button','clockwise'],
}

const ButtonShapeList = Object.keys(ButtonShape)
.filter(k => Number.isInteger(parseInt(k)) && parseInt(k)<ButtonShape.MAX)
.map(k => {
	return { value:parseInt(k), label:ButtonShape[k], faded:parseInt(k)===ButtonShape.NONE }})

export const ButtonRingValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
		{ celement:Checkbox, cprops:{ label:'rotate' }, isBool:true },
		{ celement:Dropdown, cprops:{ list:ButtonShapeList, width:'w-[6.35rem]' }, label:'shape' },
	],
	repeatLast: true,
}

export const ButtonRingShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonRingCircleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonRingRectValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'rounding' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonRingTriangleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonRingN64CValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonRingGCXYValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'curvature' },
		{ celement:Slider, cprops:{ min:0 }, label:'angle range' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
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
				color={props.color}
			/> : null
		}}</Index>
	</svg>
}


export const WButtonRing = (props: WidgetProps): JSXElement => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<ButtonRing
			on		= { inputs().map(i => i?.pressed) }
			r		= { props.def.val[0] || 28 }
			rx		= { props.def.val[1] || 16 }
			ry		= { props.def.val[2] || 16 }
			rz		= { props.def.val[3] || 0 }
			simple	= { props.def.val[4]>0 || false }
			rotate	= { props.def.val[5]>0 || false }
			shape	= { props.def.val.slice(6) }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

const WButtonRingShape = (props: {p:WidgetProps,s:ButtonShape}): JSXElement => {
	const color = () => resolveColor(props.p.def, props.p.container)
	const inputs = () => props.p.pad?.mapInputs(props.p.def.inputs)
		|| new Array(props.p.def.inputs.length).fill(false)
	return <Widget
		widget={props.p.def} container={props.p.container}>
		<ButtonRing
			on		= { inputs().map(i => i?.pressed) }
			r  		= { props.p.def.val[0] || 28 }
			rx 		= { props.p.def.val[1] || 16 }
			ry 		= { props.p.def.val[2] || 16 }
			rz 		= { props.p.def.val[3] || 0 }
			simple	= { props.p.def.val[4]>0 || false }
			rotate	= { true }
			shape	= { [props.s] }
			line	= { props.p.container.line || 3 }
			color	= { color() }
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
