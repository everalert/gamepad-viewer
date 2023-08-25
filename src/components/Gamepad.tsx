import type { Setter, Accessor } from 'solid-js'
import { onMount, onCleanup } from 'solid-js'
import { GamepadState } from '../types/gamepad'


interface GamepadProps {
	onUpdate: Setter<GamepadState>;
	pad: Accessor<GamepadState>;
	padIndex: number;
}


export const Gamepad = ({ onUpdate, pad, padIndex }: GamepadProps) => {
	let frame

	function loop(t) {
		const gamepads = navigator.getGamepads()

		if (gamepads && gamepads[padIndex]) {
			const gamepad = gamepads[padIndex]
			if (!pad() || pad().timestamp !== gamepad.timestamp) {
				const state: GamepadState = pad() ?
					Object.assign(Object.create(Object.getPrototypeOf(pad())),pad()) :
					new GamepadState(padIndex)
				state.update(gamepad)
				onUpdate(state)
			}
		}

		frame = requestAnimationFrame(loop)
	}

	onMount(() => { frame = requestAnimationFrame(loop) })

	onCleanup(() => cancelAnimationFrame(frame))

	return null
}


export default Gamepad
