import type { JSX } from 'solid-js'
import { ButtonShape } from '../../types/inputs'
import { ButtonRing } from '../inputs/ButtonRing'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { resolveColor } from '../../types/colors'
import { GamepadState, GamepadInput } from '../../types/gamepad'


export const WButtonRing = (props: WidgetProps): JSX.Element => {
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () =>  GamepadState.getInputMap(props.def.inputs, pad, setPad)
	return <Widget
		widget={props.def} container={props.container}>
		<ButtonRing
			on		= { inputs().map(i => GamepadInput.pressed(i)) }
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

const WButtonRingShape = (props: {p:WidgetProps,s:ButtonShape}): JSX.Element => {
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.p.def, props.p.container)
	const inputs = () =>  GamepadState.getInputMap(props.p.def.inputs, pad, setPad)
	return <Widget
		widget={props.p.def} container={props.p.container}>
		<ButtonRing
			on		= { inputs().map(i => GamepadInput.pressed(i)) }
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

export const WButtonRingCircle = (props: WidgetProps): JSX.Element => 
	<WButtonRingShape p={props} s={ButtonShape.Circle} />

export const WButtonRingRect = (props: WidgetProps): JSX.Element => 
	<WButtonRingShape p={props} s={ButtonShape.Rect} />

export const WButtonRingTriangle = (props: WidgetProps): JSX.Element => 
	<WButtonRingShape p={props} s={ButtonShape.TriIso} />

export const WButtonRingN64C = (props: WidgetProps): JSX.Element => 
	<WButtonRingShape p={props} s={ButtonShape.N64C} />

export const WButtonRingGCXY = (props: WidgetProps): JSX.Element => 
	<WButtonRingShape p={props} s={ButtonShape.GCXY} />
