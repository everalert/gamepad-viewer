import type { Component } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { Stick, NICE_FACTOR, ROUND_FACTOR } from '../inputs/Stick'
import { resolveColor } from '../../types/colors'


export const WStick:Component = (props: WidgetProps) => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
