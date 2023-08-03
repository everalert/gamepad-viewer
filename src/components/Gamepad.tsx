import type { Setter, Accessor } from 'solid-js'
import { onMount, onCleanup } from 'solid-js'
import type { GamepadState } from '../types/gamepad'
import { GamepadInput, GamepadInputType } from '../types/gamepad'


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
				state.inputs = [
					...gamepad.axes.map((a,i) => 
						new GamepadInput(GamepadInputType.Axis,i,a)),
					...gamepad.buttons.map((b,i) => 
						new GamepadInput(GamepadInputType.Button,i,b.value,b.pressed))
				]
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
