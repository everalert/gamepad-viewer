import type { Component } from 'solid-js'
import type { GamepadState } from '../types/gamepad'
import { Show, createSignal } from 'solid-js'
import { useSearchParams, useLocation } from '@solidjs/router'
import {
	DisplayContainer, WidgetContainerDef,
	parseContainerStr, genContainerStr
} from '../components/containers'
import { WidgetDef, parseWidgetStr, genWidgetStr } from '../components/Widget'
import { Gamepad } from '../components/Gamepad'
import { LayoutEditor } from '../components/editor'


export const Custom: Component = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0

	const MODE_EDIT	= location.pathname.slice(-5) === '/edit'

	const SETTINGS_CONTAINER	= parseContainerStr(params?.settings) ?? null
	const SETTINGS_WIDGETS	= parseWidgetStr(params?.settings) ?? null
	const [container, setContainer] = createSignal<WidgetContainerDef>(SETTINGS_CONTAINER)
	const [widgets, setWidgets] = createSignal<WidgetDef[]>(SETTINGS_WIDGETS)

	return <>
		<Gamepad
			padIndex={padIndex}
			pad={pad}
			onUpdate={setPad}
		/>
		<DisplayContainer
			container={container()}
			widgets={widgets()}
			pad={pad}
			>
			<Show when={MODE_EDIT}>
				<LayoutEditor
					pad={pad}
					container={container}
					setContainer={setContainer}
					widgets={widgets}
					setWidgets={setWidgets}
					baseSettings={`${genContainerStr(SETTINGS_CONTAINER)}|${genWidgetStr(SETTINGS_WIDGETS)}`}
				/>
			</Show>
		</DisplayContainer>
	</>
}

export default Custom;
