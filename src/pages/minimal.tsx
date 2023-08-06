import type { Component } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import DisplayContainer from '../components/DisplayContainer'
import { createSignal } from 'solid-js';
import { Gamepad } from '../components'
import { WidgetDef } from '../components/Widget'
import { WidgetContainerDef } from '../components/WidgetContainer'
import { MINIMAL_DFLT_CONTAINER, MINIMAL_DFLT_WIDGETS } from '../types/minimal'


const Minimal: Component = () => {
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0

	const container: WidgetContainerDef =  MINIMAL_DFLT_CONTAINER
	const widgets: WidgetDef[] = MINIMAL_DFLT_WIDGETS

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

export default Minimal;
