import type { JSXElement } from 'solid-js';
import { For, Show } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import { StickText, TriggerText } from '../components'
import { WidgetType, WidgetDef } from '../components/Widget'


export interface TextContainerProps {
	widgets: WidgetDef[];
	pad: GamepadState
	class?: string;
	style?: string;
}


export const TextContainer = (props: TextContainerProps):JSXElement => {
	const triggers = () => props.widgets.filter(w=>w.type===WidgetType.Trigger)
	return <div
		class={`flex justify-center gap-4 text-lg ${props.class}`}
		style={`${props.class}`}
		>
		<For each={props.widgets.filter(w=> w.type===WidgetType.Stick
				|| w.type===WidgetType.StickCircle
				|| w.type===WidgetType.StickSquare
				|| w.type===WidgetType.StickGC
				|| w.type===WidgetType.StickN64
				|| w.type===WidgetType.StickHori
				|| w.type===WidgetType.StickRound
			)}>
			{s => <StickText
				x={props.pad?.axes[s.ax[0]]||0}
				y={props.pad?.axes[s.ax[1]]||0}
			/>}
		</For>
		<Show when={triggers().length > 0}>
			<TriggerText
				left={props.pad?.buttonValue[triggers()[0]?.bt[0]]||0}
				right={props.pad?.buttonValue[triggers()[1]?.bt[0]]||0}
			/>
		</Show>
	</div>
}

export default TextContainer
