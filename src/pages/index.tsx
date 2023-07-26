import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';


const PAGES: string[] = ['xbox', 'psx', 'wiiu', 'custom/edit']
const PARAMS: string[] = ['notext', 'noimage', 'compact', 'lesstext']

const urigen = (uri:string, params:{[key:string]:boolean}) => {
	const active: string[] = Object.keys(params).filter(k => params[k] === true)
	return `${uri}${ active.length > 0 ? `?${active.join('&')}` : '' }`
}


const Index: Component = () => {
	const [params, setParams] = createSignal<{[key:string]:boolean}>(
		PARAMS.reduce((a:any, p:string) => { return {...a, [p]:false}}, {}))

	return <div class='flex gap-8 justify-center p-[32px] min-h-screen select-none bg-black'>
		<div class='flex flex-col gap-1 justify-start'>
			<div class='font-semibold'>options</div>
			<For each={Object.keys(params())}>{p => <div>
				<label class={ params()[p] ? 'text-gray-200' : 'text-gray-400'}>
					<input type='checkbox' checked={params()[p]}
						onclick={()=>{setParams({...params(),[p]:!params()[p]})}} /> {p}</label>
			</div>}</For>
		</div>
		<div class='flex flex-col gap-1 justify-start'>
			<div class='font-semibold'>layouts</div>
			<For each={PAGES}>{p => <div>
				<A
					class='px-2 py-0.5 font-bold text-blue-300 bg-blue-950 rounded
					hover:text-blue-100 hover:bg-blue-900'
					href={urigen(`/${p}`, params())}
				>{p}</A>
			</div>}</For>
		</div>
	</div>
}

export default Index;
