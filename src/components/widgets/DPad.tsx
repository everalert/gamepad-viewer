import type { JSX } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { DPad } from '../inputs/DPad'
import { resolveColor } from '../../types/colors'


export const WDPad = (props: WidgetProps): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	return <Widget
		widget={props.def} container={props.container}>
		<DPad
			on			= { inputs().map(i => i?.pressed) }
			length		= { props.def.val[0] || 80 }
			thickness	= { props.def.val[1] || 28 }
			simple		= { props.def.val[2]>0 || false }
			line		= { props.container.line || 3 }
			color	= { color() }
		/>
	</Widget>
}
