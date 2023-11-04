import type { JSX } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { Trigger, TriggerSimpleMode } from '../inputs/Trigger'
import { resolveColor } from '../../types/colors'


export const WTrigger = (props: WidgetProps): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { !isNaN(inputs()[0]?.bscalar) ? inputs()[0].bscalar :
				(TriggerSimpleMode[props.def.val[2]]?.includes('Split') ? 0.5 : 0) }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { props.def.val[1]>=0 ? props.def.val[1] : 256 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.NONE }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}

export const WTriggerCurved = (props: WidgetProps): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { !isNaN(inputs()[0]?.bscalar) ? inputs()[0].bscalar :
				(TriggerSimpleMode[props.def.val[2]]?.includes('Split') ? 0.5 : 0) }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { props.def.val[1]>=0 ? props.def.val[1] : 256 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.NONE }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}

export const WTriggerFlat = (props: WidgetProps): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { !isNaN(inputs()[0]?.bscalar) ? inputs()[0].bscalar :
				(TriggerSimpleMode[props.def.val[2]]?.includes('Split') ? 0.5 : 0) }
			bumper	= { inputs()[1]?.pressed || false }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { 0 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.NONE }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}
