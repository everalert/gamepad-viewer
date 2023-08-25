import type { JSXElement, Accessor } from 'solid-js';
import type { WidgetContainerDef } from './WidgetContainer'
import type { GamepadState } from '../../types/gamepad'
import { useSearchParams, useLocation } from '@solidjs/router'
import { WidgetContainer } from './WidgetContainer'
import { TextContainer } from './TextContainer'
import { WidgetDef } from '../Widget'


export interface DisplayContainerProps {
	container: WidgetContainerDef;
	widgets: WidgetDef[];
	pad: Accessor<GamepadState>;
	children?: JSXElement;
}


export const DisplayContainer = (props: DisplayContainerProps): JSXElement => {
	const [params] = useSearchParams();
	const location = useLocation();
	
	const NOTEXT	= params.notext !== undefined
	const NOIMAGE	= params.noimage !== undefined
	const NOGUIDE	= params.noguide !== undefined
	const MODE_EDIT	= location.pathname === '/custom/edit'

	return <div
		class={`flex flex-col gap-4 ${MODE_EDIT ?
			'bg-black min-w-full min-h-screen items-center' : 'items-start'}`}
		>
		<div
			class={`inline-flex flex-col items-center sticky top-0 z-10
				${MODE_EDIT ? 'bg-gray-900 outline outline-4 outline-black' : ''}
				${NOGUIDE || MODE_EDIT ? '' : 'outline outline-4 outline-red-500'}
			`}
			style={`padding:${props.container.m}px; gap:${props.container.m/2}px;`}
			>
			{ NOTEXT || <TextContainer
				widgets={props.widgets} pad={props.pad()}
				class={`${MODE_EDIT ? 'bg-gray-950' : ''}`}
			/> }
			{ NOIMAGE || <WidgetContainer
				def={props.container}
				widgets={props.widgets}
				pad={props.pad()}
				class={`${MODE_EDIT ? 'bg-gray-950' : ''}`}
			/> }
		</div>
		{props.children}
	</div>
}

export default DisplayContainer
