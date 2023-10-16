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

		if (gamepads) {
			if (typeof pad()?.index !== 'number') {
				for (let i = 0; i < gamepads.length; i++) {
					if (gamepads[i]?.timestamp) {
						const state = new GamepadState(i)
						state.update(gamepads[i])
						if (state.firstPressedIndex >= 0) {
							setPad(state)
							break
						}
					}
				}
			} else {
				const gamepad = gamepads[pad().index]
				if (gamepad && (!pad() || pad().timestamp !== gamepad.timestamp)) {
					const state: GamepadState = pad() ?
						Object.assign(Object.create(Object.getPrototypeOf(pad())),pad()) :
						new GamepadState(pad().index)
					state.update(gamepad)
					setPad(state)
				}
			}
		}

		frame = requestAnimationFrame(loop)
	}

	onMount(() => { frame = requestAnimationFrame(loop) })

	onCleanup(() => cancelAnimationFrame(frame))

	return null
}
