import { Accessor, Setter, Index, For } from 'solid-js'
import { A } from '@solidjs/router'
import { WidgetEditor, WidgetContainerEditor } from './'
import { Add, Reset, Confirm } from '../icons'
import { filterParams } from '../../helpers/formatting'
import { WidgetContainerDef,
	parseContainerStr, genContainerStr } from '../containers'
import { WidgetDef, WIDGET_DFLT, 
	parseWidgetStr, genWidgetStr } from '../Widget'
import type { GamepadState } from '../../types/gamepad'


interface LayoutEditorProps {
	pad: Accessor<GamepadState>;
	container: Accessor<WidgetContainerDef>;
	setContainer: Setter<WidgetContainerDef>;
	widgets: Accessor<WidgetDef[]>;
	setWidgets: Setter<WidgetDef[]>;
	baseSettings: string;
}


export const LayoutEditor = (props: LayoutEditorProps) => {
	return <div class='relative flex flex-col items-baseline'>
		<div class='mt-3 mb-1 font-semibold'>global</div>
		<WidgetContainerEditor
			container={props.container}
			setContainer={props.setContainer}
		/>

		<div class='mt-4 font-semibold'>widgets</div>
		<div class='flex flex-col gap-y-2'>
			<Index each={props.widgets()}>{(w,i) => {
				const setWidget = (w:WidgetDef) => props.setWidgets([
					...props.widgets().slice(0,-props.widgets().length+i),
					w,
					...props.widgets().slice(i+1,props.widgets().length),
				]) 
				const deleteWidget = () => props.setWidgets([
					...props.widgets().slice(0,-props.widgets().length+i),
					...props.widgets().slice(i+1,props.widgets().length),
				])
				return <WidgetEditor 
					pad={props.pad}
					container={props.container}
					widget={w}
					setWidget={setWidget}
					deleteWidget={deleteWidget}
				/>
			}}</Index>
		</div>

		<div class='w-full py-1 flex gap-2 sticky bottom-0 z-10 bg-black'>
			<div
				class='flex items-center font-bold text-blue-800
				hover:text-blue-400 cursor-pointer group'
				onClick={()=>props.setWidgets([...props.widgets(),
					JSON.parse(JSON.stringify(WIDGET_DFLT))])}
				>
				<Add class='h-9 w-9 p-1' />add
			</div>

			<div
				class='flex items-center font-bold text-red-800 rounded
				hover:text-red-400 cursor-pointer group'
				onClick={()=>{
					props.setContainer(parseContainerStr(props.baseSettings))
					props.setWidgets(parseWidgetStr(props.baseSettings))
				}}
				>
				<Reset class='h-9 w-9 p-1' /> reset
			</div>

			<A
				href={`/custom${filterParams(location.search,
				`settings=${genContainerStr(props.container())}|${genWidgetStr(props.widgets())}`
				)}`}
				class='flex items-center font-bold text-green-800 rounded
				hover:text-green-400 group'
				><Confirm class='h-9 w-9 p-1' />confirm</A>
		</div>
	</div>
}

export default LayoutEditor
