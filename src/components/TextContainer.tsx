import type { JSXElement } from 'solid-js';
import { For, Show } from 'solid-js';
import type { GamepadState, GamepadInputDef } from '../types/gamepad'
import { getInputMap } from '../types/gamepad'
import { StickText, TriggerText } from '../components'
import { WidgetType, WidgetDef } from '../components/Widget'


export interface TextContainerProps {
	widgets: WidgetDef[];
	pad: GamepadState
	class?: string;
	style?: string;
}


export const TextContainer = (props: TextContainerProps):JSXElement => {
	const sticks = () => props.widgets.filter(w=> w.type===WidgetType.Stick
		|| w.type===WidgetType.StickCircle
		|| w.type===WidgetType.StickSquare
		|| w.type===WidgetType.StickGC
		|| w.type===WidgetType.StickN64
		|| w.type===WidgetType.StickHori
		|| w.type===WidgetType.StickRound
	)
	const triggers = () => props.widgets.filter(w => w.type===WidgetType.Trigger
		|| w.type===WidgetType.TriggerCurved
		|| w.type===WidgetType.TriggerFlat
	)
	const inputs = (di:GamepadInputDef[]) => getInputMap(props.pad?.inputs, di)

	return <div
		class={`flex justify-center gap-4 text-lg ${props.class}`}
		style={`${props.class}`}
		>
		<For each={sticks()}>{s => {
			return <StickText
				x={inputs(s.inputs)[0]?.ascalar||0}
				y={inputs(s.inputs)[1]?.ascalar||0}
		/>}}</For>
		<Show when={triggers().length > 0}>
			<TriggerText
				left={inputs(triggers()[0]?.inputs)[0]?.bscalar||0}
				right={inputs(triggers()[1]?.inputs)[0]?.bscalar||0}
			/>
		</Show>
	</div>
}

export default TextContainer
