import type { JSXElement } from 'solid-js';
import { For, Show } from 'solid-js';
import type { GamepadState, GamepadInputDef } from '../../types/gamepad'
import { inputDefCmp, getInputMap } from '../../types/gamepad'
import { StickText, TriggerText } from '../inputs'
import { WidgetType, WidgetDef } from '../Widget'


export interface TextContainerProps {
	widgets: WidgetDef[];
	pad: GamepadState
	class?: string;
	style?: string;
}


export const TextContainer = (props: TextContainerProps):JSXElement => {
	const sticks = () => props.widgets
		.filter(w => WidgetType[w.type].includes('Stick'))
		.map(w => w.inputs)
		.reduce((a:GamepadInputDef[][], p:GamepadInputDef[]) => { return a.find(e =>
			inputDefCmp(e[0],p[0])===0 && inputDefCmp(e[1],p[1])===0)
			? a : [...a, p] }, [])
	
	const triggers = () => props.widgets
		.filter(w => WidgetType[w.type].includes('Trigger'))
		.map(w => w.inputs)
	
	const inputs = (di:GamepadInputDef[]) => getInputMap(props.pad?.inputs, di)

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
