import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad } from '../components'
import { WidgetDef } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef } from '../components/WidgetContainer'
import { TextContainer } from '../components/TextContainer'
import { DisplayContainer } from '../components/DisplayContainer'
import { GCN_DFLT_CONTAINER, GCN_DFLT_WIDGETS } from '../types/gcn'

const GCN: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	
	const container: WidgetContainerDef = GCN_DFLT_CONTAINER

	const widgets: WidgetDef[] = GCN_DFLT_WIDGETS

	return <>
		<Gamepad padIndex={padIndex} pad={pad} onUpdate={setPad} />
		<DisplayContainer container={container}>
			{ NOTEXT || <TextContainer
				widgets={widgets} pad={pad()}
				style={`width:${container.w}px;`} />
			}
			{ NOIMAGE || <WidgetContainer def={container} widgets={widgets} pad={pad()} /> }
		</DisplayContainer>
	</>
}

export default GCN;
