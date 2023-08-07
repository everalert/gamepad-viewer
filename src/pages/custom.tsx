import type { Component } from 'solid-js';
import type { GamepadState, GamepadInputDef } from '../types/gamepad'
import { For, Index, createSignal } from 'solid-js';
import { A, useSearchParams, useLocation } from '@solidjs/router'
import { DisplayContainer, WidgetContainerDef,
	parseContainerStr, genContainerStr } from '../components/containers'
import { WidgetType, WidgetDef, WIDGET_DFLT, 
	parseWidgetStr, genWidgetStr } from '../components/Widget'
import { Gamepad } from '../components/Gamepad'
import { AddIcon, DeleteIcon, ResetIcon, ConfirmIcon } from '../components/icons'
import { GamepadInputType } from '../types/gamepad'
import { XBOX_DFLT_CONTAINER, XBOX_DFLT_WIDGETS } from '../types/layouts'
import { filterParams } from '../helpers/formatting'


export const Custom: Component = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0

	const MODE_EDIT	= location.pathname.slice(-5) === '/edit'

	const SETTINGS	= params.settings ? params.settings :
		`${genContainerStr(XBOX_DFLT_CONTAINER)}|${genWidgetStr(XBOX_DFLT_WIDGETS)}`
	const [container, setContainer] = createSignal<WidgetContainerDef>(parseContainerStr(SETTINGS))
	const [widgets, setWidgets] = createSignal<WidgetDef[]>(parseWidgetStr(SETTINGS))

	return <>
		<Gamepad
			padIndex={padIndex}
			pad={pad}
			onUpdate={setPad}
		/>
		<DisplayContainer
			container={container()}
			widgets={widgets()}
			pad={pad}
		>

			{ !MODE_EDIT || <div class='flex flex-col items-baseline'>
				<div class='mt-3 mb-1 font-semibold'>global</div>
				<div class='flex gap-3'>
					<Index each={Object.keys(container())}>{c=>{
					return <div>{c()} <input value={container()[c()]}
							onInput={(e)=>{setContainer({...container(),
								[c()]:Number.parseInt(e.target.value)||0})}}
							class='w-14 px-1.5 pt-0.5 bg-gray-800 rounded' /></div>
					}}</Index>
				</div>

				<div class='mt-4 font-semibold'>widgets</div>
				<div class='grid grid-cols-[max-content_max-content_max-content_max-content_max-content_max-content_max-content_max-content_max-content_max-content] items-baseline gap-y-1 gap-x-2'>
					<div></div>
					<div class='px-1'>x</div>
					<div class='px-1'>y</div>
					<div class='px-1'>rot</div>
					<div class='px-1'>fx</div>
					<div class='px-1'>fy</div>
					<div class='px-1'>h</div>
					<div class='px-1'>input</div>
					<div class='px-1'>val</div>
					<div></div>

					<Index each={widgets()}>{(w,i) => {
						const setVal = (c:{[key:string]:number|boolean|number[]|GamepadInputDef[]}) => setWidgets([
							...widgets().slice(0,-widgets().length+i),
							{...w(),...c},
							...widgets().slice(i+1,widgets().length),
						]) 
						return <>
							<div>
								<select onInput={e=>setVal({type:Number.parseInt(e.currentTarget.value)})}
									value={w().type}
									class='px-1 py-0.5 font-semibold bg-gray-800 rounded'
									>
									<For each={Object.keys(WidgetType)
										.filter(k=>parseInt(k)<WidgetType.MAX)
										.sort((a,b)=>WidgetType[a]>WidgetType[b]?1:(WidgetType[a]<WidgetType[b]?-1:0))}>{
											t => <option value={t}>{WidgetType[t]}</option>
									}</For>
								</select>
							</div>

							<div>
								<input onInput={(e)=>{setVal({x:Number.parseInt(e.target.value)||0})}}
									value={w().x}
									class='w-12 px-1.5 pt-0.5 bg-gray-800 rounded'
								/>
							</div>

							<div>
								<input onInput={(e)=>{setVal({y:Number.parseInt(e.target.value)||0})}}
									value={w().y}
									class='w-12 px-1.5 pt-0.5 bg-gray-800 rounded'
								/>
							</div>

							<div>
								<input onInput={(e)=>{setVal({rot:Number.parseInt(e.target.value)||0})}}
									value={w()?.rot||0}
									class='w-12 px-1.5 pt-0.5 bg-gray-800 rounded'
								/>
							</div>

							<div class='relative top-1'>
								<input onInput={()=>{setVal({fx:!w().fx})}}
								type='checkbox' checked={w().fx}
									class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800'
								/>
							</div>

							<div class='relative top-1'>
								<input onInput={()=>{setVal({fy:!w().fy})}}
								type='checkbox' checked={w().fy}
									class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800'
								/>
							</div>

							<div class='relative top-1'>
								<input onInput={()=>{setVal({hide:!w().hide})}}
								type='checkbox' checked={w().hide}
									class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800'
								/>
							</div>

							<div>
								<input onInput={(e)=>{setVal({
									inputs:e.target.value.split(',').map(i => {
										return {
											type:(i.charAt(0)==='a'?GamepadInputType.Axis:GamepadInputType.Button),
											index:Number.parseInt(i.slice(1))||0
										} as GamepadInputDef 
									})
									})}}
									value={w().inputs.map(i=>`${i.type===GamepadInputType.Axis?'a':'b'}${i.index.toString()}`).join(',')}
									class='w-40 px-1.5 pt-0.5 bg-gray-800 rounded'
								/>
							</div>

							<div>
								<input onInput={(e)=>{setVal({val:e.target.value.split(',').map(n=>Number.parseInt(n)||0)})}}
									value={w().val.join(',')}
									class='w-20 px-1.5 pt-0.5 bg-gray-800 rounded'
								/>
							</div>

							<div
								class='h-7 w-7 -my-2 text-red-800 relative top-2
								hover:text-red-400 cursor-pointer'
								onClick={()=>setWidgets([
									...widgets().slice(0,-widgets().length+i),
									...widgets().slice(i+1,widgets().length),
								])} 
								>
								<DeleteIcon />
							</div>
						</>
					}}</Index>
				</div>
				<div class='mt-2 text-gray-400'>x and y offset from center</div>

				<div class='mt-3 flex gap-2'>
					<div
						class='flex items-center font-bold text-blue-800
						hover:text-blue-400 cursor-pointer group'
						onClick={()=>setWidgets([...widgets(),
							JSON.parse(JSON.stringify(WIDGET_DFLT))])}
						>
						<AddIcon class='h-9 w-9 p-1' />add
					</div>

					<div
						class='flex items-center font-bold text-red-800 rounded
						hover:text-red-400 cursor-pointer group'
						onClick={()=>{
							setContainer(parseContainerStr(SETTINGS))
							setWidgets(parseWidgetStr(SETTINGS))
						}}
						>
						<ResetIcon class='h-9 w-9 p-1' /> reset
					</div>

					<A
						href={`/custom${filterParams(
location.search,
`settings=${genContainerStr(container())}|${genWidgetStr(widgets())}`
						)}`}
						class='flex items-center font-bold text-green-800 rounded
						hover:text-green-400 group'
						><ConfirmIcon class='h-9 w-9 p-1' />confirm</A>
				</div>
			</div> }
		</DisplayContainer>
	</>
}

export default Custom;
