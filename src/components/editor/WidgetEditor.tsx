import type { Accessor, JSXElement } from 'solid-js'
import type { WidgetContainerDef } from '../containers'
import type { GamepadState } from '../../types/gamepad'
import type { WidgetDef } from '../Widget'
import { For, Show } from 'solid-js'
import { Dropdown, Slider, Slider2D, Checkbox, InputPicker, ValuePicker } from '../ui'
import { WidgetType } from '../Widget'
import { Copy, Delete } from '../icons'
import { ColorList } from '../../types/colors'


interface WidgetEditorProps {
	pad: Accessor<GamepadState>;
	container: Accessor<WidgetContainerDef>;
	widget: Accessor<WidgetDef>;
	setWidgetFn: (w:WidgetDef) => WidgetDef[];
	delFn?: () => WidgetDef[];
	copyFn?: () => WidgetDef[];
}


export const WidgetEditor = (props: WidgetEditorProps): JSXElement => {
	const xmin = () => -props.container().w/2
	const ymin = () => -props.container().h/2
	const xmax = () => props.container().w/2
	const ymax = () => props.container().h/2
	const setVal = (c:{[key:string]:any}) => props.setWidgetFn({...props.widget(),...c}) 

	return <div class='flex flex-col gap-2 p-3 bg-gray-900 rounded-md'>
		<div class='mb-2 flex justify-between gap-4'>
			<div class='flex gap-4 items-center'>
				<select onInput={e=>setVal({type:Number.parseInt(e.currentTarget.value)})}
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
					setValFn={(v)=>{setVal({hide:v})}}
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
				pad={props.pad}
				widget={props.widget}
				setValFn={(e)=>{setVal({inputs:e})}}
			/>

			<div class={`flex flex-col gap-2 ${props.widget().hide?'opacity-25':''}`}>
				<ValuePicker
					widget={props.widget}
					setVals={(e)=>{setVal({val:e})}}
				/>
			</div>

			<div class={`flex flex-col gap-2 ${props.widget().hide?'opacity-25':''}`}>
				<Slider2D
					label='position'
					unitX='x'
					valueX={props.widget().x}
					minX={xmin()}
					maxX={xmax()}
					setValFnX={(n:number)=>{setVal({x:n})}}
					unitY='y'
					valueY={props.widget().y}
					minY={ymin()}
					maxY={ymax()}
					setValFnY={(n:number)=>{setVal({y:n})}}
				/>
				<Slider
					label='rotation'
					unit='&deg;'
					value={props.widget()?.rot}
					min={0}
					max={360}
					wrap={true}
					setValFn={(n:number)=>{setVal({rot:n})}}
					width='w-[3.5rem]'
				/> 
				<Dropdown
					list={ColorList}
					value={props.widget().color || 0}
					setValFn={(v)=>{setVal({color:v})}}
					label='color'
				/>
				<div class='flex gap-2'>
					<Checkbox
						label='flip x'
						value={props.widget().fx}
						setValFn={(v)=>{setVal({fx:v})}}
					/>
					<Checkbox
						label='flip y'
						value={props.widget().fy}
						setValFn={(v)=>{setVal({fy:v})}}
					/>
				</div>
			</div>
		</div>
	</div>
}

export default WidgetEditor
