import type { JSXElement } from 'solid-js'
import { Index } from 'solid-js'
import { ButtonShape, ButtonInlineMap } from './'
import { Widget, WidgetProps } from '../Widget'
import type { InputPickerDef, ValuePickerDef } from '../ui'
import { Slider, Checkbox, Dropdown } from '../ui'


interface ButtonGridProps {
	cols: number;
	stepx: number;
	stepy: number;
	rx: number;
	ry: number;
	rz: number;
	simple?: boolean;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	class?: string;
	style?: string;
}

export const ButtonGridInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['from top-left by row'],
}

const ButtonShapeList = Object.keys(ButtonShape)
.filter(k => Number.isInteger(parseInt(k)) && parseInt(k)<ButtonShape.MAX)
.map(k => {
	return { value:parseInt(k), label:ButtonShape[k], faded:parseInt(k)===ButtonShape.NONE }})

export const ButtonGridValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
		{ celement:Dropdown, cprops:{ list:ButtonShapeList, width:'w-[6.35rem]' }, label:'shape' },
	],
	repeatLast: true,
}

export const ButtonGridShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonGridCircleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonGridRectValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonGridTriangleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonGridN64CValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const ButtonGridGCXYValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'curvature' },
		{ celement:Slider, cprops:{ min:0 }, label:'angle range' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}


export const ButtonGrid = (props: ButtonGridProps): JSXElement => {
	const wi = () => (props.cols-1)*props.stepx
	const hi = () => (Math.ceil(props.on.length/props.cols)-1)*props.stepy
	const m = () => props.line*2
	const w = () => (m()+props.rx+props.ry)*2+wi()
	const h = () => (m()+props.rx+props.ry)*2+hi()
	const mi = () => (w()-wi())*0.5

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={h()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${h()/2}px;
			${props.style||''}`}
		>
		<Index each={props.on}>{(on,i) => {
			const Btn = ButtonInlineMap[props.shape[i%props.shape.length]]
			return Btn ? <Btn
				x={mi()+props.stepx*(i%props.cols)}
				y={mi()+props.stepy*(Math.floor(i/props.cols))}
				d1={props.rx}
				d2={props.ry}
				d3={props.rz}
				simple={props.simple}
				angle={0}
				on={on()}
				w={props.line}
			/> : null
		}}</Index>
	</svg>
}


export const WButtonGrid = (props: WidgetProps): JSXElement => {
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
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
			simple	= { props.def.val[6]>0 || false }
			shape	= { props.def.val.slice(7) }
			line	= { props.container.line || 3 }
		/>
	</Widget>
}

const WButtonGridShape = (props: {p:WidgetProps,s:ButtonShape}): JSXElement => {
	const inputs = () => props.p.pad?.mapInputs(props.p.def.inputs)
		|| new Array(props.p.def.inputs.length).fill(false)
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
			simple	= { props.p.def.val[6]>0 || false }
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

export const WButtonGridGCXY = (props: WidgetProps): JSXElement => 
	<WButtonGridShape p={props} s={ButtonShape.GCXY} />


export default ButtonGrid;
