import { Index } from 'solid-js'
import { A } from '@solidjs/router'
import { WidgetEditor, WidgetContainerEditor } from './'
import { Add, Reset, Confirm } from '../icons'
import { filterParams } from '../../helpers/formatting'
import { WidgetContainerDef,
	parseContainerStr, genContainerStr } from '../containers'
import { WidgetDef, WIDGET_DFLT, 
	parseWidgetStr, genWidgetStr } from '../Widget'
import { useInputLayout } from '../InputLayout'


export const LayoutEditor = () => {
	const [layout, setLayout] = useInputLayout()
	const setContainer = (c:WidgetContainerDef) => setLayout({ container:c })
	const setWidgets = (w:WidgetDef[]) => setLayout({ widgets:w })
	const baseSettings = () =>
		`${genContainerStr(layout.container)}|${genWidgetStr(layout.widgets)}`

	return <div class='relative flex flex-col items-baseline'>
		<div class='mt-3 mb-1 font-semibold'>global</div>
		<WidgetContainerEditor />

		<div class='mt-4 font-semibold'>widgets</div>
		<div class='flex flex-col gap-y-2'>
			<Index each={layout.widgets}>{(w,i) => {
				const setWidget = (w:WidgetDef) => setWidgets([
					...layout.widgets.slice(0,-layout.widgets.length+i),
					w,
					...layout.widgets.slice(i+1,layout.widgets.length),
				]) 
				const deleteWidget = () => setWidgets([
					...layout.widgets.slice(0,-layout.widgets.length+i),
					...layout.widgets.slice(i+1,layout.widgets.length),
				])
				const copyWidget = () => setWidgets([
					...layout.widgets.slice(0,-layout.widgets.length+i),
					w(), {...w()},
					...layout.widgets.slice(i+1,layout.widgets.length),
				])
				return <WidgetEditor 
					widget={w}
					setWidgetFn={setWidget}
					delFn={deleteWidget}
					copyFn={copyWidget}
				/>
			}}</Index>
		</div>

		<div class='w-full py-1 flex gap-2 sticky bottom-0 z-10 bg-black'>
			<div
				class='flex items-center font-bold text-blue-800
				hover:text-blue-400 cursor-pointer group'
				onClick={()=>setWidgets([...layout.widgets,
					JSON.parse(JSON.stringify(WIDGET_DFLT))])}
				>
				<Add class='h-9 w-9 p-1' />add
			</div>

			<div
				class='flex items-center font-bold text-red-800 rounded
				hover:text-red-400 cursor-pointer group'
				onClick={()=>{
					setContainer(parseContainerStr(baseSettings()))
					setWidgets(parseWidgetStr(baseSettings()))
				}}
				>
				<Reset class='h-9 w-9 p-1' /> reset
			</div>

			<A
				href={`/custom${filterParams(location.search,
				`settings=${genContainerStr(layout.container)}|${genWidgetStr(layout.widgets)}`
				)}`}
				class='flex items-center font-bold text-green-800 rounded
				hover:text-green-400 group'
				><Confirm class='h-9 w-9 p-1' />confirm</A>
		</div>
	</div>
}

export default LayoutEditor
