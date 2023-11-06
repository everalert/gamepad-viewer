import { Index } from 'solid-js'
import { A } from '@solidjs/router'
import { WidgetEditor, WidgetContainerEditor } from './'
import { Add, Reset, Confirm } from '../icons'
import { filterParams } from '../../helpers/formatting'
import { parseContainerStr, genContainerStr } from '../containers'
import { WIDGET_DFLT, parseWidgetStr, genWidgetStr } from '../Widget'
import { WidgetContainerDef, WidgetDef } from '../../types/widget'
import { useInputLayout } from '../InputLayout'


export const LayoutEditor = () => {
	const [layout, setLayout] = useInputLayout()
	const setContainer = (c:WidgetContainerDef) => setLayout('container', c)
	const setWidgets = (w:WidgetDef[]) => setLayout('widgets', w)
	const baseSettings = () =>
		`${genContainerStr(layout.container)}|${genWidgetStr(layout.widgets)}`

	return <div class='relative flex flex-col items-baseline'>
		<div class='mt-3 mb-1 font-semibold'>global</div>
		<WidgetContainerEditor />

		<div class='mt-4 font-semibold'>widgets</div>
		<div class='flex flex-col gap-y-2'>
			<Index each={layout.widgets}>{(w,i) => {
				const setWidgetVal = (key:keyof WidgetDef, v:any) =>
					setLayout('widgets', i, key, v)
				const deleteWidget = () => setLayout('widgets', p =>
					[...p.slice(0,-p.length+i), ...p.slice(i+1,p.length)])
				const copyWidget = () => setLayout('widgets', p => [...p, {...p[i]}])
				return <WidgetEditor 
					widget={w}
					setValFn={setWidgetVal}
					delFn={deleteWidget}
					copyFn={copyWidget}
				/>
			}}</Index>
		</div>

		<div class='w-full py-1 flex gap-2 sticky bottom-0 z-10 bg-black'>
			<div
				class='flex items-center font-bold text-blue-800
				hover:text-blue-400 cursor-pointer group'
				onClick={()=>setLayout('widgets', p => [...p, {...WIDGET_DFLT}])}
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
