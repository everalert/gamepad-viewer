import type { Accessor, JSX } from 'solid-js'
import type { GamepadInputDef } from '../../types/gamepad'
import type { WidgetDef } from '../../types/widget'
import { WidgetInputDefMap } from '../../types/widgetmap'
import { Index, Show, createSignal, createEffect, createMemo, onMount } from 'solid-js'
import { GamepadInput, GamepadInputType } from '../../types/gamepad'
import { clamp } from '../../helpers/math'
import { Dropdown, Tooltip } from './'
import { useInputReader } from '../InputReader'


export type InputPickerDef = {
	min?: number;
	max?: number;
	labels?: string[];
}

interface InputPickerProps {
	widget: Accessor<WidgetDef>;
	setValFn: (w:GamepadInputDef[]) => void;
}

export const InputPicker = (props: InputPickerProps): JSX.Element => {
	const [pad] = useInputReader();
	const d = createMemo(()=>WidgetInputDefMap[props.widget().type])
	const v = () => props.widget().inputs
	const max = () => d().max || Number.MAX_SAFE_INTEGER
	const min = () => d().min > 0 ? d().min : 1
	const label = (i:number) => d()?.labels[i]

	const inputList = () => {
		const inputs = pad()?.inputs.map((k,i) => { return {
			value: {type:k.type, index:k.index},
			label: `${GamepadInputType[k.type]} ${k.index}`,
		} } )
		return [
			...Object.keys(GamepadInputType)
			.filter(k => parseInt(k) < 0)
			.map(k => { return {
				value: {type:parseInt(k),index:0},
				label: GamepadInputType[k].toLowerCase(),
				faded: true,
			} } ),
			...inputs?inputs:[]
		]
	}

	const setVal = (input:GamepadInputDef, i:number) => {
		const newDefs = [...v().slice(0,i), input,
			...v().slice(i+1,v().length)].filter(d => d.type>GamepadInputType.NONE)
		while (newDefs.length < min()) newDefs.push({type:GamepadInputType.BLANK,index:0})
		while (newDefs.length > max()) newDefs.pop()
		props.setValFn(newDefs)
	}

	const clearVal = (i:number) => setVal({ type: v()[i].type>=0 ?
		GamepadInputType.BLANK : GamepadInputType.NONE, index:0 }, i)

	const cmpVal = (v1:GamepadInputDef, v2:GamepadInputDef) =>
		v1.type===v2.type && (v1.type<0 ? true : v1.index===v2.index)

	const [padReady, setPadReady] = createSignal<boolean>(false)

	const checkPadReady = (i:number) => {
		const p = pad().firstPressedIndex
		if (!padReady() && p<0) {
			setPadReady(true)
		} else if (padReady() && p>=0) {
			const b:GamepadInput = pad().firstPressed
			setVal({ type:b.type, index:b.index }, i)
			setPadReady(false)
		}
	}

	onMount(()=>{
		const newDefs:GamepadInputDef[] = [...v()]
		let newDefNo = clamp(newDefs.length,min(),max())
		while (newDefs.length < newDefNo) newDefs.push({type:GamepadInputType.BLANK,index:0})
		while (newDefs.length > newDefNo) newDefs.pop()
		props.setValFn(newDefs)
	})

	createEffect(() => {
		if (v().length < min() || v().length > max()) {
			const newDefs:GamepadInputDef[] = [...v()]
			let newDefNo = clamp(newDefs.length,min(),max())
			while (newDefs.length < newDefNo) newDefs.push({type:GamepadInputType.BLANK,index:0})
			while (newDefs.length > newDefNo) newDefs.pop()
			props.setValFn(newDefs)
		}
	})

	return <div class='w-[16.65rem] flex flex-col gap-1'>
		<div class='flex gap-1 px-1 text-gray-300'>
			inputs
			<Tooltip text='set an input by pressing it on your controller' />
		</div>

		<Show
			when={pad()?.inputs}
			fallback={<div class='text-sm text-gray-500 leading-4'>
				activate a controller<br/>to set inputs</div>}
			>
			<Index each={v()}>{(input,i) => {
				return <div class='flex gap-2 items-center'>
					<div class='w-[10.65rem]'>
						<Dropdown
							list={inputList()}
							value={input()}
							setValFn={(e)=>setVal(e,i)}
							clearFn={()=>clearVal(i)}
							cmpFn={cmpVal}
							focusActionFn={()=>checkPadReady(i)}
							focusActionEv='pad:newFirstPressed'
							focusBtn={true}
						/>
					</div>
					<div class='px-1 text-sm text-gray-500'>{label(i)}</div>
				</div>
			}}</Index>

			<Show when={v().length<max()}>
				<div class='flex gap-2 items-center opacity-75'>
					<div class='w-[10.65rem]'>
						<Dropdown
							list={inputList()}
							value={{type:GamepadInputType.NONE,index:0}}
							setValFn={(e)=>setVal(e,v().length)}
							cmpFn={cmpVal}
							focusActionFn={()=>checkPadReady(v().length)}
							focusActionEv='pad:newFirstPressed'
							focusBtn={true}
						/>
					</div>
					<div class='px-1 text-sm text-gray-500'>{label(v().length)}</div>
				</div>
			</Show>
		</Show>
	</div>
}


export default InputPicker
