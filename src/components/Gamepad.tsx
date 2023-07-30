import type { Setter } from 'solid-js'
import { onMount, onCleanup } from 'solid-js'
import type { GamepadState } from '../types/gamepad'


interface GamepadProps {
	onUpdate: Setter<GamepadState>;
	padIndex: number;
}


export const Gamepad = ({ onUpdate, padIndex }: GamepadProps) => {
	onMount(() => {
		function loop(t) {
			const gamepads = navigator.getGamepads()

			if (gamepads && gamepads[padIndex]) {
				const gamepad = gamepads[padIndex]
				const state: GamepadState = {
					index:			padIndex,
					axes:			gamepad.axes.map(a => a),
					buttonValue:	gamepad.buttons.map(b => b.value),
					buttonPress:	gamepad.buttons.map(b => b.pressed),
				}
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
