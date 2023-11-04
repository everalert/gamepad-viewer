import type { JSXElement } from 'solid-js';
import { For, Show } from 'solid-js';
import { type GamepadInputDef, inputDefCmp } from '../../types/gamepad'
import { StickText, TriggerText } from '../inputs'
import { WidgetType } from '../../types/widget'
import { useInputLayout } from '../InputLayout'
import { useInputReader } from '../InputReader'


interface TextContainerProps {
	class?: string;
	style?: string;
}

export const TextContainer = (props: TextContainerProps):JSXElement => {
	const [pad] = useInputReader()
	const [layout] = useInputLayout()

	const sticks = () => {
		if (!layout.widgets) return []
		return layout.widgets
			.filter(w => WidgetType[w.type].includes('Stick'))
			.map(w => w.inputs)
			.reduce((a:GamepadInputDef[][], p:GamepadInputDef[]) => 
				a.find(e => inputDefCmp(e[0],p[0])===0 && inputDefCmp(e[1],p[1])===0) ?
					a : [...a, p], [])
	}
	
	const triggers = () => {
		if (!layout.widgets) return []
		return layout.widgets
			.filter(w => WidgetType[w.type].includes('Trigger'))
			.map(w => w.inputs)
	}
	
	const inputs = (di:GamepadInputDef[]) => pad()?.mapInputs(di)
		|| new Array(di?.length||0).fill(false)

	return <div
		class={`flex justify-center gap-4 text-lg ${props.class}`}
		style={`${props.class}`}
		>
		<For each={sticks()}>{s => {
			return <StickText
				x={inputs(s)[0]?.ascalar||0}
				y={inputs(s)[1]?.ascalar||0}
		/>}}</For>
		<Show when={triggers().length > 0}>
			<TriggerText
				left={inputs(triggers()[0])[0]?.bscalar||0}
				right={inputs(triggers()[1])[0]?.bscalar||0}
			/>
		</Show>
	</div>
}

export default TextContainer
