import type { Component } from 'solid-js';
import { createSignal, For, Index } from 'solid-js';
import { A } from '@solidjs/router';
import { filterParams } from '../helpers/formatting'
import {
	XBOX_DFLT_STR, XBOX_DFLT_STR_COMPACT,
	PSX_DFLT_STR, PSX_DFLT_STR_COMPACT,
	WIIU_DFLT_STR, WIIU_DFLT_STR_COMPACT, 
	GCN_DFLT_STR,
	MINIMAL_DFLT_STR, 
	RACING_DFLT_STR
} from '../types/layouts'
import { Edit } from '../components/icons'
import { Checkbox } from '../components/ui'


type PageDef = {
	name:string;
	layout:string;
	compact?:string;
}

const PAGES: PageDef[] = [
	{
		name:'xbox',
		layout:XBOX_DFLT_STR,
		compact:XBOX_DFLT_STR_COMPACT,
	},
	{
		name:'psx',
		layout:PSX_DFLT_STR,
		compact:PSX_DFLT_STR_COMPACT,
	},
	{
		name:'wiiu',
		layout:WIIU_DFLT_STR,
		compact:WIIU_DFLT_STR_COMPACT,
	},
	{
		name:'gcn',
		layout:GCN_DFLT_STR,
	},
	{
		name:'racing',
		layout:RACING_DFLT_STR,
	},
	{
		name:'minimal',
		layout:MINIMAL_DFLT_STR,
	},
]

type ParamDef = {
	name:string;
	tooltip?:string;
}

const PARAMS: ParamDef[] = [
	{
		name:'compact', 
		tooltip:'layouts are smaller and more minimal'
	}, 
	{
		name:'lesstext', 
		tooltip:'value readout only has essentials'
	}, 
	{
		name:'notext', 
		tooltip:'value readout off'
	}, 
	{
		name:'noimage', 
		tooltip:'visualization off'
	}, 
	{
		name:'noguide',
		tooltip:'obs cropping guide off'
	},
]


export const Main: Component = () => {
	const [params, setParams] = createSignal<{[key:string]:boolean}>(
		PARAMS.reduce((a:any, p:ParamDef) => { return {...a, [p.name]:false}}, {}))
	
	const paramstr = () => {
		const active: string[] = Object.keys(params()).filter(k => params()[k]===true)
		return active.length > 0 ? `?${active.join('&')}` : ''
	}

	return <div class='flex gap-8 justify-center p-[32px] min-h-screen select-none bg-black'>
		<div class='flex flex-col justify-start'>
			<div class='mb-2'>
				<div class='text-gray-400'>select</div>
				<div class='-mt-2 font-semibold'>options</div>
			</div>
			<Index each={PARAMS}>{(p,i) => 
				<Checkbox
					label={p().name}
					tooltip={p().tooltip}
					value={params()[p().name]}
					onInput={()=>{setParams({...params(),[p().name]:!params()[p().name]})}}
				/>
			}</Index>
		</div>
		<div class='flex flex-col gap-1 justify-start'>
			<div>
				<div class='text-gray-400'>then</div>
				<div class='-mt-2 font-semibold'>layout</div>
			</div>
			<div class='grid grid-cols-[1fr_min-content] gap-x-1 gap-y-1.5'>
				<For each={PAGES}>{p => <>
					<A
						class='px-2 py-0.5 text-center font-bold text-blue-300 bg-blue-950 rounded
						hover:text-blue-100 hover:bg-blue-900'
						href={`/${p.name}${paramstr()}`}
						>
						{p.name}
					</A>
					<A
						class='w-5 h-5 m-1 text-blue-800 rounded
						hover:text-blue-400'
						href={`/custom/edit${filterParams(paramstr(),
						`?settings=${ p.compact && params()['compact']===true ?
							p.compact : p.layout }`)}`}
						>
						<Edit />
					</A>
				</>}</For>
			</div>
		</div>
	</div>
}

export default Main;
