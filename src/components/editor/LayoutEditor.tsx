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

	return <div
		class='grid grid-flow-col auto-cols-min gap-4'
		>
		<div
			class='sticky top-4 flex flex-col'
			>
			<div class='pb-2 font-semibold'>global</div>
			<WidgetContainerEditor />
		</div>

		<div
			class='row-span-2'
			>
			<div class='pb-2 font-semibold'>widgets</div>
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
		</div>

		<div
			class='sticky top-4 pt-10 flex flex-col gap-2 z-10'
			>
			<div
				class='flex items-center font-bold text-blue-800
				hover:text-blue-400 cursor-pointer group'
				onClick={()=>setLayout('widgets', p => [...p, {...WIDGET_DFLT}])}
				>
				<Add class='h-7 w-7' />
			</div>

			<div
				class='flex items-center font-bold text-red-800 rounded
				hover:text-red-400 cursor-pointer group'
				onClick={()=>{
					setContainer(parseContainerStr(baseSettings()))
					setWidgets(parseWidgetStr(baseSettings()))
				}}
				>
				<Reset class='h-7 w-7' />
			</div>

			<A
				href={`/custom${filterParams(location.search,
`settings=${genContainerStr(layout.container)}|${genWidgetStr(layout.widgets)}`
				)}`}
				class='flex items-center font-bold text-green-800 rounded
				hover:text-green-400 group'
				>
				<Confirm class='h-7 w-7' />
			</A>
		</div>
	</div>
}

export default LayoutEditor
