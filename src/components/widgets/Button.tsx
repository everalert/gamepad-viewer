import { Show } from 'solid-js'
import { useInputReader } from '../InputReader'
import { Widget, WidgetProps } from '../Widget'
import { ButtonInlineMap } from '../inputs/Button'
import { resolveColor } from '../../types/colors'


export const WButton = (props: WidgetProps) => {
	const [pad] = useInputReader()
	const color = () => resolveColor(props.def, props.container)
	const d1 = () => props.def.val[1] || 16
	const d2 = () => props.def.val[2] || 16
	const m = () => props.container.line*2
	const w = () => (m()+Math.max(d1(),d2())*2)*2
	const inputs = () => pad()?.getInputMap(props.def.inputs)
		|| new Array(props.def.inputs.length).fill(false)
	const Btn = ButtonInlineMap[props.def.val[0]] || null
	return <Widget
		widget={props.def} container={props.container}>
		<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
			width={w()}
			height={w()}
			style={`margin-left:-${w()/2}px; margin-top:-${w()/2}px;`}
			>
			<Show when={Btn}>
				<Btn
					x		= { w()/2 }
					y		= { w()/2 }
					on		= { inputs()[0]?.pressed || false }
					d1		= { d1() }
					d2		= { d2() }
					d3		= { props.def.val[3] || 0 }
					angle	= { props.def.val[4] || 0 }
					simple	= { props.def.val[5]>0 || false }
					w		= { props.container.line || 3 }
					color	= { color() }
				/>
			</Show>
		</svg>
	</Widget>
}
