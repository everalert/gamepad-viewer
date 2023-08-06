import type { Component } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import DisplayContainer from '../components/DisplayContainer'
import { createSignal } from 'solid-js';
import { Gamepad } from '../components'
import { WidgetDef } from '../components/Widget'
import { WidgetContainerDef } from '../components/WidgetContainer'
import { GCN_DFLT_CONTAINER, GCN_DFLT_WIDGETS } from '../types/gcn'


const GCN: Component = () => {
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const container: WidgetContainerDef = GCN_DFLT_CONTAINER

	const widgets: WidgetDef[] = GCN_DFLT_WIDGETS

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

export default GCN;
