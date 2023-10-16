import type { Component } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { useSearchParams, useLocation } from '@solidjs/router'
import { WidgetDef, parseWidgetStr, genWidgetStr } from '../components/Widget'
import { LayoutEditor } from '../components/editor'
import {
	DisplayContainer, WidgetContainerDef,
	parseContainerStr, genContainerStr
} from '../components/containers'


export const Custom: Component = () => {
	const [params] = useSearchParams();
	const location = useLocation();

	const MODE_EDIT	= location.pathname.slice(-5) === '/edit'

	const SETTINGS_CONTAINER =
		parseContainerStr(params?.settings) ?? null
	const SETTINGS_WIDGETS =
		parseWidgetStr(params?.settings) ?? null
	const SETTINGS_BASE =
		`${genContainerStr(SETTINGS_CONTAINER)}|${genWidgetStr(SETTINGS_WIDGETS)}`

	const [container, setContainer] = createSignal<WidgetContainerDef>(SETTINGS_CONTAINER)
	const [widgets, setWidgets] = createSignal<WidgetDef[]>(SETTINGS_WIDGETS)

	return <>
		<DisplayContainer
			container={container()}
			widgets={widgets()}
			>
			<Show when={MODE_EDIT}>
				<LayoutEditor
					container={container}
					setContainer={setContainer}
					widgets={widgets}
					setWidgets={setWidgets}
					baseSettings={SETTINGS_BASE}
				/>
			</Show>
		</DisplayContainer>
	</>
}

export default Custom;
