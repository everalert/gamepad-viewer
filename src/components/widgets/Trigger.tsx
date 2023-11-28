import type { JSX } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { Trigger, TriggerSimpleMode } from '../inputs/Trigger'
import { resolveColor } from '../../types/colors'
import { GamepadState, GamepadInput } from '../../types/gamepad'

const filterTriggerInput = (i:GamepadInput, mode:number) => 
	!isNaN(GamepadInput.bscalar(i)) ? GamepadInput.bscalar(i) :
		(TriggerSimpleMode[mode]?.includes('Split') ? 0.5 : 0) 

export const WTrigger = (props: WidgetProps): JSX.Element => {
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () =>  GamepadState.getInputMap(props.def.inputs, pad, setPad)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { filterTriggerInput(inputs()[0] || null, props.def.val[2]) }
			bumper	= { GamepadInput.pressed(inputs()[1] || null) }
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
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () =>  GamepadState.getInputMap(props.def.inputs, pad, setPad)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { filterTriggerInput(inputs()[0] || null, props.def.val[2]) }
			bumper	= { GamepadInput.pressed(inputs()[1] || null) }
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
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () =>  GamepadState.getInputMap(props.def.inputs, pad, setPad)
	return <Widget
		widget={props.def} container={props.container}>
		<Trigger
			trigger	= { filterTriggerInput(inputs()[0] || null, props.def.val[2]) }
			bumper	= { GamepadInput.pressed(inputs()[1] || null) }
			trigH	= { props.def.val[0]>=0 ? props.def.val[0] : 64 }
			trigR	= { 0 }
			simple	= { TriggerSimpleMode[props.def.val[2]] ?
				props.def.val[2] : TriggerSimpleMode.NONE }
			line	= { props.container.line || 3 }
			color	= { color() }
		/>	
	</Widget>
}
