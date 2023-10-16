import type { Setter, Accessor } from 'solid-js'
import { createContext, useContext } from "solid-js"
import { onMount, onCleanup } from 'solid-js'
import { GamepadState } from '../types/gamepad'


export const InputReaderContext =
	createContext<[Accessor<GamepadState>, Setter<GamepadState>]>()


export const useInputReaderContext = () => {
	const hook = useContext(InputReaderContext)
	if (hook === undefined)
		throw new Error("useInputReaderContext must be user within InputReaderContext.Provider")
	return hook
}


export const InputReader = () => {
	const [pad, setPad] = useInputReaderContext()

	let frame

	function loop(t) {
		const gamepads = navigator.getGamepads()

		const index = 0 //pad().index ?? 0
		if (gamepads && gamepads[index]) {
			const gamepad = gamepads[index]
			if (gamepad && (!pad() || pad().timestamp !== gamepad.timestamp)) {
				const state: GamepadState = pad() ?
					Object.assign(Object.create(Object.getPrototypeOf(pad())),pad()) :
					new GamepadState(index)
				state.update(gamepad)
				setPad(state)
			}
		}

		frame = requestAnimationFrame(loop)
	}

	onMount(() => { frame = requestAnimationFrame(loop) })

	onCleanup(() => cancelAnimationFrame(frame))

	return null
}
