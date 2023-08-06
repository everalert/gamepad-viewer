import type { Component } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import type { WidgetContainerDef } from '../components/WidgetContainer'
import DisplayContainer from '../components/DisplayContainer'
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import { Gamepad } from '../components'
import { WidgetDef } from '../components/Widget'
import { XBOX_DFLT_CONTAINER_COMPACT, XBOX_DFLT_CONTAINER,
	XBOX_DFLT_WIDGETS_COMPACT, XBOX_DFLT_WIDGETS } from '../types/xbox'


const XBox: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const MODE_COMPACT = params.compact !== undefined
	
	const container: WidgetContainerDef = MODE_COMPACT ?
		XBOX_DFLT_CONTAINER_COMPACT : XBOX_DFLT_CONTAINER

	const widgets: WidgetDef[] = MODE_COMPACT ?
		XBOX_DFLT_WIDGETS_COMPACT : XBOX_DFLT_WIDGETS

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

export default XBox;
