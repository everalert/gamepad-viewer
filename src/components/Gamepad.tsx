import type { Setter, Accessor } from 'solid-js'
import { onMount, onCleanup } from 'solid-js'
import type { GamepadState } from '../types/gamepad'
import { GamepadInputType, resetPool, resizePool } from '../types/gamepad'


interface GamepadProps {
	onUpdate: Setter<GamepadState>;
	pad: Accessor<GamepadState>;
	padIndex: number;
}


export const Gamepad = ({ onUpdate, pad, padIndex }: GamepadProps) => {
	onMount(() => {
		function loop(t) {
			const gamepads = navigator.getGamepads()

			if (gamepads && gamepads[padIndex]) {
				const gamepad = gamepads[padIndex]
				const state: GamepadState = pad() ?
					{...pad()} : { index:padIndex, inputs:[] }
				resetPool(state.inputs)
				resizePool(state.inputs, gamepad.axes.length+gamepad.buttons.length)
				gamepad.axes.forEach((a,i) => state.inputs.find(p => p.free)
					.init(GamepadInputType.Axis,i,a))
				gamepad.buttons.forEach((b,i) => state.inputs.find(p => p.free)
					.init(GamepadInputType.Button,i,b.value,b.pressed))
				onUpdate(state)
			}
			
			requestAnimationFrame(loop)

			// won't ever run even tho this pattern was stolen from solidjs docs? lol
			//onCleanup(() => cancelAnimationFrame(frame))
		}
		requestAnimationFrame(loop)
	})

	return null
}

export default Gamepad
