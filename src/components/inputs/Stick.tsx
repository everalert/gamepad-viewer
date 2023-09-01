import type { Component } from 'solid-js'
import { Widget, WidgetProps } from '../Widget'
import type { InputPickerDef, ValuePickerDef } from '../ui'
import { Slider, Checkbox } from '../ui'
import { AbC2a, AbC2h } from '../../helpers/math'
import { Color, getColorDef, resolveColor } from '../../types/colors'


interface StickProps {
	x: number;
	y: number;
	button?: boolean;
	r: number;
	a: number;
	ar: number;
	line: number;
	simple?: boolean;
	color?: Color;
	class?: string;
	style?: string;
}

export const StickInputGroupDef: InputPickerDef = {
	min: 3,
	max: 3,
	labels: [
		'x-axis',
		'y-axis',
		'button',
	],
}

export const StickValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:Slider, cprops:{ min:0, max:90 }, label:'seg angle' },
		{ celement:Slider, cprops:{ min:0 }, label:'seg radius' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

export const StickShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
}

const DOT_RSCALE	= 1.25	// radius
const DOT_LSCALE	= 0.6	// line
const NICE_FACTOR	= 5		// for preset 'straight' lines that aren't harsh
const ROUND_FACTOR	= 1.5	// for 'rounded octagon'


export const Stick = (props: StickProps) => {
	const color = () => getColorDef(props.color)
	const dotR = () => props.line*DOT_RSCALE+props.line*DOT_LSCALE
	const m = () => props.line+dotR()
	const angH = () => AbC2h(45,props.r,props.a)
	const angW = () => Math.sqrt((AbC2a(45,props.r,props.a)**2)-(angH()**2))
	const pathARnode = (a:string, x:number, y:number) => 
		`${a} ${props.ar} ${props.ar} 0 0 1 ${x} ${y}`
	const pathAR = () => `
		M ${m()+props.r} ${m()}
		${pathARnode('a',angH(),angW())}
		${pathARnode('A',m()+props.r*2,m()+props.r)}
		${pathARnode('a',-angW(),angH())}
		${pathARnode('A',m()+props.r,m()+props.r*2)}
		${pathARnode('a',-angH(),-angW())}
		${pathARnode('A',m(),m()+props.r)}
		${pathARnode('a',angW(),-angH())}
		${pathARnode('A',m()+props.r,m())}
		Z`
	const pathLine = () => `
		M ${m()+props.r} ${m()}
		l ${angH()} ${angW()}
		L ${m()+props.r*2} ${m()+props.r}
		l ${-angW()} ${angH()}
		L ${m()+props.r} ${m()+props.r*2}
		l ${-angH()} ${-angW()}
		L ${m()} ${m()+props.r}
		l ${angW()} ${-angH()}
		Z`
	const path = () => props.ar > 0 ? pathAR() : pathLine()

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={(props.r+m())*2}
		height={(props.r+m())*2}
		class={`${props.class||''}`}
		style={`margin-left:-${(props.r+m())}px;
			margin-top:-${(props.r+m())}px;
			${props.style||''}`}
		>
		<path
			// bg
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.line*2}
			d={path()}
		/>

		<line
			// bg line v
			class={color().bgOl}
			stroke-width={props.simple?0:props.line/2}
			x1={props.r+m()}
			x2={props.r+m()}
			y1={m()}
			y2={props.r*2+m()}
		/>
		<line
			// bg line h
			class={color().bgOl}
			stroke-width={props.simple?0:props.line/2}
			y1={props.r+m()}
			y2={props.r+m()}
			x1={m()}
			x2={props.r*2+m()}
		/>

		<path
			// outline / button input
			class={`fill-transparent ${props.button ? color().lineOn : color().lineOff}`}
			stroke-width={props.simple ? 0 : props.line}
			d={path()}
		/>

		<line
			// input line
			class={color().detail} // 500 before
			stroke-width={props.line}
			stroke-linecap='round'
			x1={props.r+m()}
			y1={props.r+m()}
			x2={(props.x+1)*props.r+m()}
			y2={(props.y+1)*props.r+m()}
		/>
		<circle
			// input dot
			class={`${color().hl} ${props.simple ? color().hlOl : color().bgOl}`}
			stroke-width={props.simple ? (props.button ? props.line*2*DOT_LSCALE : 0) :
				props.line*DOT_LSCALE}
			cx={(props.x+1)*props.r+m()}
			cy={(props.y+1)*props.r+m()}
			r={dotR()}
		/>
	</svg>
}

export const WStick:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { props.def.val[1]>0 ? props.def.val[1] : 67.5 }
			ar		= { props.def.val[2]>=0 ? props.def.val[2] : 64 }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}

export const WStickCircle:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 67.5 }
			ar		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}

export const WStickSquare:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 90 }
			ar		= { 0 }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}

export const WStickN64:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 75 } //TODO: confirm from notes
			ar		= { props.def.val[0]>0 ? props.def.val[0]*NICE_FACTOR : 48*NICE_FACTOR}
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

export const WStickHori:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 73 } //TODO: confirm from notes
			ar		= { props.def.val[0]>0 ? props.def.val[0]*NICE_FACTOR : 48*NICE_FACTOR }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

export const WStickGC:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 67.5 }
			ar		= { props.def.val[0]>0 ? props.def.val[0]*NICE_FACTOR : 48*NICE_FACTOR }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

export const WStickRound:Component = (props: WidgetProps) => {
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => props.pad?.mapInputs(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Stick
			x		= { inputs()[0]?.ascalar || 0 }
			y		= { inputs()[1]?.ascalar || 0 }
			button	= { inputs()[2]?.pressed || false }
			r		= { props.def.val[0]>0 ? props.def.val[0] : 48 }
			a		= { 67.5 }
			ar		= { props.def.val[0]>0 ? props.def.val[0]*ROUND_FACTOR : 48*ROUND_FACTOR }
			simple	= { props.def.val[3]>0 || false }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}

export default Stick;
