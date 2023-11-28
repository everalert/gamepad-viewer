import type { JSX } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { DPad } from '../inputs/DPad'
import { resolveColor } from '../../types/colors'
import { GamepadState, GamepadInput } from '../../types/gamepad'


export const WDPad = (props: WidgetProps): JSX.Element => {
	const [pad, setPad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () =>  GamepadState.getInputMap(props.def.inputs, pad, setPad)
	return <Widget
		widget={props.def} container={props.container}>
		<DPad
			on			= { inputs().map(i => GamepadInput.pressed(i)) }
			length		= { props.def.val[0] || 80 }
			thickness	= { props.def.val[1] || 28 }
			simple		= { props.def.val[2]>0 || false }
			line		= { props.container.line || 3 }
			color		= { color() }
		/>
	</Widget>
}
