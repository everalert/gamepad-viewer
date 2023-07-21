import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';


const stupidLinkGen = (uri:string, notext:boolean, noimage:boolean, compact:boolean, lesstext:boolean) => `${uri}?${notext?'notext':''}&${noimage?'noimage':''}&${compact?'compact':''}&${lesstext?'lesstext':''}`


const Index: Component = () => {
	const [notext, setNotext] = createSignal<boolean>(false)
	const [noimage, setNoimage] = createSignal<boolean>(false)
	const [compact, setCompact] = createSignal<boolean>(false)
	const [lesstext, setLesstext] = createSignal<boolean>(false)
	return <div class='p-[32px] min-h-screen select-none bg-black'>
		<div class='mb-4 flex gap-4 justify-center'>
			<label class={ notext() ? 'text-gray-200' : 'text-gray-400'}>
				<input type='checkbox' checked={notext()}
					onclick={()=>{setNotext(!notext())}} /> notext</label>
			<label class={ noimage() ? 'text-gray-200' : 'text-gray-400'}>
				<input type='checkbox' checked={noimage()}
					onclick={()=>{setNoimage(!noimage())}} /> noimage</label>
			<label class={ compact() ? 'text-gray-200' : 'text-gray-400'}>
				<input type='checkbox' checked={compact()}
					onclick={()=>{setCompact(!compact())}} /> compact</label>
			<label class={ lesstext() ? 'text-gray-200' : 'text-gray-400'}>
				<input type='checkbox' checked={lesstext()}
					onclick={()=>{setLesstext(!lesstext())}} /> lesstext</label>
		</div>
		<div class='flex gap-4 justify-center font-bold'>
			<A class='px-2 text-blue-300 bg-blue-950 hover:text-blue-100 hover:bg-blue-900 rounded'
				href={stupidLinkGen('/xbox',notext(),noimage(),compact(),lesstext())}>XBox</A>
			<A class='px-2 text-blue-300 bg-blue-950 hover:text-blue-100 hover:bg-blue-900 rounded'
				href={stupidLinkGen('/psx',notext(),noimage(),compact(),lesstext())}>PSx</A>
			<A class='px-2 text-blue-300 bg-blue-950 hover:text-blue-100 hover:bg-blue-900 rounded'
				href={stupidLinkGen('/wiiu',notext(),noimage(),compact(),lesstext())}>WiiU</A>
		</div>
	</div>
}

export default Index;
