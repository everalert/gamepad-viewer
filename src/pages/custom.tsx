import type { Component } from 'solid-js';
import { createSignal, For, Index } from 'solid-js';
import { useSearchParams, useLocation } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad, StickText, TriggerText } from '../components'
import { XBoxButton as XBB } from '../types/xbox'
import { WidgetType, WidgetDef, parseWidgetStr, genWidgetStr } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef, parseContainerStr, genContainerStr } from '../components/WidgetContainer'
import { A } from '@solidjs/router';
import { filterParams } from '../helpers/formatting'


const Custom: Component = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0

	const SETTINGS = params.settings ? params.settings : 'Gw512h144m32l3W0x-172y-24a0a1b10v48v5W0x64y24a2a3b11v48v5W2x0y-48b8b9v32v12W4x-64y24b13b15b14b12v80v28v8W3x172y-24b0b1b2b3v28v16W5x-256y0b6b4v96v256v8W5x256y0b7b5v96v256v8fx'
	const MODE_EDIT		= location.pathname.slice(-5) === '/edit'
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined

	const [container, setContainer] = createSignal<WidgetContainerDef>(parseContainerStr(SETTINGS))
	const [widgets, setWidgets] = createSignal<WidgetDef[]>(parseWidgetStr(SETTINGS))

	return <>
		<Gamepad padIndex={padIndex} onUpdate={setPad} />
		<div
			class={`flex flex-col items-center ${!MODE_EDIT||'bg-gray-950 min-w-full min-h-screen'}`}
			style={`
width:${container().w+container().m*2}px;
padding:${container().m}px;
gap:${container().m/2}px;
`}>
			{ NOTEXT || <div
				class={`flex justify-center gap-4 text-lg ${!MODE_EDIT||'bg-gray-900'}`}
				>
				<For each={widgets().filter(w=>w.type===WidgetType.Stk)}>
					{s => <StickText
						x={pad()?.axes[s.ax[0]]||0}
						y={pad()?.axes[s.ax[1]]||0}
					/>}
				</For>
				<TriggerText
					left={pad()?.buttonValue[XBB.LT]||0}
					right={pad()?.buttonValue[XBB.RT]||0}
				/>
			</div> }
			{ NOIMAGE || <WidgetContainer
				def={container()} widgets={widgets()} pad={pad()}
				class={`${!MODE_EDIT||'bg-gray-900'}`}
			/> }
			{ !MODE_EDIT || <div class='flex flex-col items-baseline gap-2'>
				<div class='mt-3 font-semibold'>global</div>
				<div class='flex gap-3'>
					<Index each={Object.keys(container())}>{c=>{
					return <div>{c()} <input value={container()[c()]}
							onInput={(e)=>{setContainer({...container(),
								[c()]:Number.parseInt(e.target.value)||0})}}
							class='w-14 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
					}}</Index>
				</div>
				<div class='mt-3 font-semibold'>widgets</div>
				<div>x and y offset from center</div>
				<div class='grid grid-cols-[max-content_max-content_max-content_max-content_max-content_max-content_max-content_max-content_max-content] items-baseline gap-y-1 gap-x-2'>
					<div></div>
					<div class='px-1'>x</div>
					<div class='px-1'>y</div>
					<div class='px-1'>axis</div>
					<div class='px-1'>btn</div>
					<div class='px-1'>val</div>
					<div class='px-1'>fx</div>
					<div class='px-1'>fy</div>
					<div></div>
					<Index each={widgets()}>{(w,i) => {
						const setVal = (c:{[key:string]:number|boolean|number[]}) => setWidgets([
							...widgets().slice(0,-widgets().length+i),
							{...w(),...c},
							...widgets().slice(i+1,widgets().length),
						]) 
						return <>
							<div>
								<select
									value={w().type}
									onInput={e=>setVal(
										{type:Number.parseInt(e.currentTarget.value)})}
									class='px-1 py-0.5 font-semibold bg-gray-800 rounded'
									>
									<For each={Object.keys(WidgetType)
										.filter(k=>parseInt(k)<WidgetType.MAX)}>{
											t => <option value={t}>{WidgetType[t]}</option>
									}</For>
								</select>
							</div>
							<div><input value={w().x}
							onInput={(e)=>{setVal({x:Number.parseInt(e.target.value)||0})}}
								class='w-12 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
							<div><input value={w().y}
							onInput={(e)=>{setVal({y:Number.parseInt(e.target.value)||0})}}
								class='w-12 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
							<div><input value={w().ax.join(',')}
							onInput={(e)=>{setVal({ax:e.target.value.split(',').map(n=>Number.parseInt(n)||0)})}}
								class='w-10 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
							<div><input value={w().bt.join(',')}
							onInput={(e)=>{setVal({bt:e.target.value.split(',').map(n=>Number.parseInt(n)||0)})}}
								class='w-28 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
							<div><input value={w().val.join(',')}
							onInput={(e)=>{setVal({val:e.target.value.split(',').map(n=>Number.parseInt(n)||0)})}}
								class='w-20 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
							<div class='relative top-1'>
								<input type='checkbox' checked={w().fx}
								onInput={()=>{setVal({fx:!w().fx})}}
									class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800' />
							</div>
							<div class='relative top-1'>
								<input type='checkbox' checked={w().fy}
								onInput={()=>{setVal({fy:!w().fy})}}
									class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800' />
							</div>
							<div><input
								type='button'
								value='del'
								onClick={()=>setWidgets([
									...widgets().slice(0,-widgets().length+i),
									...widgets().slice(i+1,widgets().length),
								])} 
								class='px-2 py-0.5 font-bold text-red-300 bg-red-950 rounded
								hover:text-red-100 hover:bg-red-900 cursor-pointer'
							/></div>
						</>
					}}</Index>
				</div>
				<div class='mt-3 flex gap-2'>
					<input
						type='button'
						value='add'
						onClick={()=>setWidgets([...widgets(),
							{type:0,x:0,y:0,ax:[],bt:[],val:[],fx:false,fy:false}])}
						class='px-2 py-0.5 font-bold text-blue-300 bg-blue-950 rounded
						hover:text-blue-100 hover:bg-blue-900 cursor-pointer'
					/>
					<input
						type='button'
						value='reset'
						onClick={()=>{
							setContainer(parseContainerStr(SETTINGS))
							setWidgets(parseWidgetStr(SETTINGS))
						}}
						class='px-2 py-0.5 font-bold text-red-300 bg-red-950 rounded
						hover:text-red-100 hover:bg-red-900 cursor-pointer'
					/>
					<A
						href={`/custom${filterParams(
							location.search,
							`settings=${genContainerStr(container())}|${genWidgetStr(widgets())}`
						)}`}
						class='px-2 py-0.5 font-bold text-green-300 bg-green-950 rounded
						hover:text-green-100 hover:bg-green-900'
					>confirm</A>
				</div>
			</div> }
		</div>
	</>
}

export default Custom;
