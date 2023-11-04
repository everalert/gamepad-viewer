import type { JSX } from 'solid-js'
import { ButtonShape } from '../inputs/Button'
import { ButtonGrid } from '../inputs/ButtonGrid'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { resolveColor } from '../../types/colors'


export const WButtonGrid = (props: WidgetProps): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const inputs = () => pad()?.getInputMap(props.def.inputs)
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
			color	= { color() }
		/>
	</Widget>
}

const WButtonGridShape = (props: {p:WidgetProps,s:ButtonShape}): JSX.Element => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.p.def, props.p.container)
	const inputs = () => pad()?.getInputMap(props.p.def.inputs)
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
			color	= { color() }
		/>
	</Widget>
}

export const WButtonGridCircle = (props: WidgetProps): JSX.Element => 
	<WButtonGridShape p={props} s={ButtonShape.Circle} />

export const WButtonGridRect = (props: WidgetProps): JSX.Element => 
	<WButtonGridShape p={props} s={ButtonShape.Rect} />

export const WButtonGridTriangle = (props: WidgetProps): JSX.Element => 
	<WButtonGridShape p={props} s={ButtonShape.TriIso} />

export const WButtonGridN64C = (props: WidgetProps): JSX.Element => 
	<WButtonGridShape p={props} s={ButtonShape.N64C} />

export const WButtonGridGCXY = (props: WidgetProps): JSX.Element => 
	<WButtonGridShape p={props} s={ButtonShape.GCXY} />
