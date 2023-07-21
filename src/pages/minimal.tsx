import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import type { GamepadState } from '../types/gamepad'
import Gamepad from '../components/Gamepad'


const [pad, setPad] = createSignal<GamepadState>()
const padIndex = 0


const Index: Component = () => {
	return (<>
		<div class='h-8'>
			<For each={pad()?.axes}>{a =>
				<div class='inline-block mr-1 w-9 h-2 bg-gray-800'>
					<div 
						class={`h-full bg-gray-400`}
						style={`width: ${(a+1)*50}%`}
					/>
				</div>
			}</For>
		</div>
		<div class='h-4'>
			<For each={pad()?.buttonValue}>{b =>
				<div class='inline-block mr-1 w-4 h-4 bg-gray-800 relative'>
					<div
						class={`w-full bg-gray-400 absolute bottom-0 left-0`}
						style={`height: ${b*100}%`}
					/>
				</div>
			}</For>
		</div>
		<Gamepad padIndex={padIndex} onUpdate={setPad} />
	</>)
}

export default Index;
