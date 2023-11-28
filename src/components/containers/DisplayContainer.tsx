import { type JSX } from 'solid-js';
import { useSearchParams, useParams } from '@solidjs/router'
import { WidgetContainer } from './WidgetContainer'
import { TextContainer } from './TextContainer'
import { useInputLayout } from '../InputLayout'


export interface DisplayContainerProps {
	children?: JSX.Element;
}


export const DisplayContainer = (props: DisplayContainerProps): JSX.Element => {
	const [params] = useSearchParams()
	const [layout] = useInputLayout()
	
	const setNoText = () => params.notext !== undefined
	const setNoImage = () => params.noimage !== undefined
	const setNoGuide = () => params.noguide !== undefined
	const modeEdit = () => useParams().edit !== undefined

	return <div
		class={`flex flex-col gap-4 ${modeEdit() ?
			'min-w-full min-h-screen items-center' : 'items-start'}`}
		>
		<div
			class={`inline-flex flex-col items-center sticky top-0 z-10 overflow-hidden
				${modeEdit() ? 'bg-gray-900 outline outline-4 outline-black' : ''}
				${setNoGuide() || modeEdit() ? '' : 'outline outline-4 outline-red-500'}`}
			style={`padding:${layout.container.m}px; gap:${layout.container.m/2}px;`}
			>
			{ setNoText() || <TextContainer class={`${modeEdit() ? 'bg-gray-950' : ''}`} /> }
			{ setNoImage() || <WidgetContainer class={`${modeEdit() ? 'bg-gray-950' : ''}`} /> }
		</div>
		{props.children}
	</div>
}


export default DisplayContainer
