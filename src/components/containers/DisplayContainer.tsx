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
			class={`flex flex-col items-center
				${MODE_EDIT ? 'bg-black min-w-full min-h-screen' :
				(NOGUIDE ? '' : 'outline outline-[4px] outline-red-500')}`}
			style={`
				width:${props.container.w+props.container.m*2}px;
				padding:${props.container.m}px;
				gap:${props.container.m/2}px;
				`}>
		{ NOTEXT || <TextContainer
			widgets={props.widgets} pad={props.pad()}
			style={`width:${props.container.w}px;`}
			class={`${!MODE_EDIT||'outline outline-[4px] outline-gray-800'}`}/>
		}
		{ NOIMAGE || <WidgetContainer
			def={props.container}
			widgets={props.widgets}
			pad={props.pad()}
			class={`${!MODE_EDIT||'outline outline-[4px] outline-gray-800'}`}
		/> }
		{props.children}
	</div>
}

export default DisplayContainer
