import type { Component } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import { DisplayContainer, WidgetContainerDef } from '../components/containers'
import { Gamepad } from '../components/Gamepad'
import { WidgetDef } from '../components/Widget'
import { WIIU_DFLT_CONTAINER_COMPACT, WIIU_DFLT_CONTAINER,
	WIIU_DFLT_WIDGETS_COMPACT, WIIU_DFLT_WIDGETS } from '../types/layouts'


export const WiiU: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const MODE_COMPACT = params.compact !== undefined
	
	const container: WidgetContainerDef = MODE_COMPACT ?
		WIIU_DFLT_CONTAINER_COMPACT : WIIU_DFLT_CONTAINER

	const widgets: WidgetDef[] = MODE_COMPACT ?
		WIIU_DFLT_WIDGETS_COMPACT : WIIU_DFLT_WIDGETS

	return <>
		<Gamepad
			padIndex={padIndex}
			pad={pad}
			onUpdate={setPad}
		/>
		<DisplayContainer
			container={container}
			widgets={widgets}
			pad={pad}
		/>
	</>
}

export default WiiU;
