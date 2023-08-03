import type { JSXElement } from 'solid-js';
import type { WidgetContainerDef } from './WidgetContainer'
import { useSearchParams, useLocation } from '@solidjs/router'

export interface DisplayContainerProps {
	container: WidgetContainerDef;
	children: JSXElement;
}

export const DisplayContainer = (props: DisplayContainerProps): JSXElement => {
	const [params] = useSearchParams();
	const location = useLocation();
	const NOGUIDE		= params.noguide !== undefined
	const MODE_EDIT		= location.pathname.slice(-5) === '/edit'
	return <div
			class={`flex flex-col items-center
				${MODE_EDIT ? 'bg-black min-w-full min-h-screen' : (NOGUIDE ? '' : 'outline outline-[4px] outline-red-500')}`}
			style={`
width:${props.container.w+props.container.m*2}px;
padding:${props.container.m}px;
gap:${props.container.m/2}px;
`}>
		{props.children}
	</div>
}
