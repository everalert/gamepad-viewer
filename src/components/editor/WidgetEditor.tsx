import type { Accessor, JSX } from 'solid-js'
import { For, Show } from 'solid-js'
import { Dropdown, Slider, Slider2D, Checkbox, InputPicker, ValuePicker } from '../ui'
import { type WidgetDef, WidgetType } from '../../types/widget'
import { Copy, Delete } from '../icons'
import { ColorList } from '../../types/colors'
import { useInputLayout } from '../InputLayout'


interface WidgetEditorProps {
	widget: Accessor<WidgetDef>;
	setValFn: (key:keyof WidgetDef, v:any) => void;
	delFn?: () => void;
	copyFn?: () => void;
}


export const WidgetEditor = (props: WidgetEditorProps): JSX.Element => {
	const [layout] = useInputLayout()
	const xmin = () => -layout.container.w/2
	const ymin = () => -layout.container.h/2
	const xmax = () => layout.container.w/2
	const ymax = () => layout.container.h/2

	return <div class='flex flex-col gap-2 p-3 bg-gray-900 rounded-md'>
		<div class='mb-2 flex justify-between gap-4'>
			<div class='flex gap-4 items-center'>
				<select
					onInput={e=>props.setValFn('type', Number.parseInt(e.currentTarget.value))}
					value={props.widget().type}
					class='px-1 py-0.5 font-semibold bg-gray-800 rounded'
					>
					<For each={Object.keys(WidgetType)
						.filter(k=>parseInt(k)<WidgetType.MAX)
						.sort((a,b) => WidgetType[a]>WidgetType[b] ? 1 : 
							(WidgetType[a]<WidgetType[b]?-1:0)
						)}>{
						t => <option value={t}>{WidgetType[t]}</option>
					}</For>
				</select>
				<Checkbox
					label='hide'
					tooltip='only use widget for value readout'
					value={props.widget().hide}
					setValFn={(v)=>{props.setValFn('hide', v)}}
				/>
			</div>
			<div class='flex gap-2 items-center'>
				<Show when={props.copyFn}>
					<div
						class='h-7 w-7 text-sky-800 relative
						hover:text-sky-400 cursor-pointer'
						onClick={props.copyFn} 
						>
						<Copy />
					</div>
				</Show>
				<Show when={props.delFn}>
					<div
						class='h-7 w-7 text-red-800 relative
						hover:text-red-400 cursor-pointer'
						onClick={props.delFn} 
						>
						<Delete />
					</div>
				</Show>
			</div>
		</div>

		<div class='mb-2 flex justify-between gap-4'>
			<InputPicker
				widget={props.widget}
				setValFn={(e)=>{props.setValFn('inputs', e)}}
			/>

			<div class={`flex flex-col gap-2 ${props.widget().hide?'opacity-25':''}`}>
				<ValuePicker
					widget={props.widget}
					setVals={(e)=>{props.setValFn('val', e)}}
				/>
			</div>

			<div class={`flex flex-col gap-2 ${props.widget().hide?'opacity-25':''}`}>
				<Slider2D
					label='position'
					unitX='x'
					valueX={props.widget().x}
					minX={xmin()}
					maxX={xmax()}
					setValFnX={(n:number)=>{props.setValFn('x', n)}}
					unitY='y'
					valueY={props.widget().y}
					minY={ymin()}
					maxY={ymax()}
					setValFnY={(n:number)=>{props.setValFn('y', n)}}
				/>
				<Slider
					label='rotation'
					unit='&deg;'
					value={props.widget()?.rot || 0}
					min={0}
					max={360}
					wrap={true}
					setValFn={(n:number)=>{props.setValFn('rot', n)}}
					width='w-[3.5rem]'
				/> 
				<Dropdown
					list={ColorList}
					value={props.widget().color || 0}
					setValFn={(v)=>{props.setValFn('color', v)}}
					label='color'
				/>
				<div class='flex gap-2'>
					<Checkbox
						label='flip x'
						value={props.widget().fx}
						setValFn={(v)=>{props.setValFn('fx', v)}}
					/>
					<Checkbox
						label='flip y'
						value={props.widget().fy}
						setValFn={(v)=>{props.setValFn('fy', v)}}
					/>
				</div>
			</div>
		</div>
	</div>
}

export default WidgetEditor
