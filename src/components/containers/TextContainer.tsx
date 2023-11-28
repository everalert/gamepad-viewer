import type { JSXElement } from 'solid-js';
import { For, Show } from 'solid-js';
import { type GamepadInputDef, GamepadState, GamepadInput, inputDefCmp } from '../../types/gamepad'
import { StickText, TriggerText } from '../inputs'
import { WidgetType } from '../../types/widget'
import { useInputLayout } from '../InputLayout'
import { useInputReader } from '../InputReader'


interface TextContainerProps {
	class?: string;
	style?: string;
}

export const TextContainer = (props: TextContainerProps):JSXElement => {
	const [pad, setPad] = useInputReader()
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
	
	const inputs = (di:GamepadInputDef[]) =>  GamepadState.getInputMap(di, pad, setPad)

	return <div
		class={`flex justify-center gap-4 text-lg ${props.class}`}
		style={`${props.class}`}
		>
		<For each={sticks()}>{s => {
			return <StickText
				x={GamepadInput.ascalar(inputs(s)[0])}
				y={GamepadInput.ascalar(inputs(s)[1])}
		/>}}</For>
		<Show when={triggers().length > 0}>
			<TriggerText
				left={GamepadInput.bscalar(inputs(triggers()[0])[0])}
				right={GamepadInput.bscalar(inputs(triggers()[1])[0])}
			/>
		</Show>
	</div>
}

export default TextContainer
