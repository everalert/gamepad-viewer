import type { JSXElement, Component, Accessor } from 'solid-js'
import type { WidgetDef } from '../Widget'
import { For, Index, Show, createSignal, createEffect, createMemo } from 'solid-js'
import { WidgetValueDefMap } from '../Widget'
import { clamp } from '../../helpers/math'


type BCElem = Component<{value:any;setValFn:(v:boolean)=>void;[key:string]:any}>;
type NCElem = Component<{value:any;setValFn:(v:number)=>void;[key:string]:any}>;

export type ValuePickerDef = {
	defs: {
		label?: string;
		celement: BCElem|NCElem;
		cprops?: {[key:string]:any};
		isBool?: boolean;
	}[];
	repeatLast?: boolean;
}

interface ValuePickerProps {
	widget: Accessor<WidgetDef>;
	setVals: (w:number[]) => void;
}

export const ValuePicker = (props: ValuePickerProps): JSXElement => {
	const d = createMemo(() => WidgetValueDefMap[props.widget().type])
	const ddefs = () => d().defs
	const drepeat = () => d().repeatLast
	const dbool = (i:number) => ddefs()[Math.min(i,min()-1)].isBool

	const v = () => props.widget().val
	const vlen = () => v().length
	const vslice = (i1:number, i2:number) => v().slice(i1,i2)
	const [vclean, setVclean] = createSignal<boolean>(true)
	
	const max = () => drepeat() ? Number.MAX_SAFE_INTEGER : ddefs().length
	const min = () => ddefs().length

	const setVal = (value:number, i:number) => {
		props.setVals([...vslice(0,i), value, ...vslice(i+1,vlen())])
		setVclean(false)
	}
	
	const clearVal = (i:number) => setVal(v()[i]>0 || i<min() ? 0 : -1, i)
	
	createEffect(() => { if (ddefs()) setVclean(false) })

	createEffect(() => {
		if (!vclean()){
			const newVals = [...v()]
			while (newVals.length < min()) newVals.push(0)
			while (newVals.length > max()) newVals.pop()
			props.setVals(newVals
				.filter((val,i) => !(val<0 && i>=min()))
				.map((val,i) => {
					const def = ddefs()[Math.min(min()-1,i)]
					if (!def.celement) return 0
					if (def.isBool) return val>0 ? 1 : 0
					return clamp(val, def.cprops?.min||0, def.cprops?.max||Number.MAX_SAFE_INTEGER)
			}))
			setVclean(true)
		}
	})


	return <div class='flex flex-col gap-1 w-60'>
		<div class='px-1 text-gray-300'>values</div>
		{ (() => {
			ddefs() // literally just to get the list to proc on widget change lol
			return <Index each={v()}>{(v,i) => {
				const P = ddefs()[Math.min(i,min()-1)].cprops
				const E = ddefs()[Math.min(i,min()-1)].celement
				const L = ddefs()[Math.min(i,min()-1)].label
				return E ? <div class='flex gap-2 items-center'>
					<div class='w-[8.125rem]'>
						<E
							value={v()}
							setValFn={(e)=>setVal(dbool(i)?(e?1:0):e,i)}
							clearFn={()=>clearVal(i)}
							{...P}
						/>
					</div>
					<div class='w-24 px-1 text-sm text-gray-500'>{L}</div>
				</div> : null
			}}</Index>
		})() }
		<Show when={drepeat()}>{(() => {
			const P = ddefs()[min()-1].cprops
			const E = ddefs()[min()-1].celement
			return E ? <div class='opacity-75'><E
				value={0}
				setValFn={(e)=>setVal(dbool(vlen())?(e?1:0):e,vlen())}
				{...P}
			/></div> : null
		})()}</Show>
	</div>
}
