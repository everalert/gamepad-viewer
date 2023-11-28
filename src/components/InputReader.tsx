import {
	type Setter,
	type Accessor,
	createContext,
	createSignal,
	useContext,
	onMount,
	onCleanup,
	JSX,
} from "solid-js"
import { createStore, SetStoreFunction } from 'solid-js/store'
import { GamepadState } from '../types/gamepad'


export const InputReaderContext = createContext<[GamepadState, SetStoreFunction<GamepadState>]>()

export const useInputReader = () => useContext(InputReaderContext)

export interface InputReaderProps {
	children: JSX.Element;
}

export const InputReader = (props: InputReaderProps) => {
	const [pad, setPad] = createStore<GamepadState>(new GamepadState())

	let frame

	function loop(t) {
		frame = requestAnimationFrame(loop)
		const gamepads = navigator.getGamepads()

		if (gamepads) {
			if (pad.index < 0) {
				for (let i = 0; i < gamepads.length; i++) {
					if (gamepads[i]?.timestamp) {
						GamepadState.update(gamepads[i], pad, setPad)
						if (GamepadState.firstPressedIndex(pad, setPad) >= 0) {
							setPad('inputToRemap', true)
							break
						}
						setPad('index', null)
					}
				}
			} else {
				const gamepad = gamepads[pad.index]
				if (gamepad) {
					GamepadState.update(gamepad, pad, setPad)
				}
			}
		}
	}

	onMount(() => { frame = requestAnimationFrame(loop) })

	onCleanup(() => cancelAnimationFrame(frame))

	return <InputReaderContext.Provider value={[pad, setPad]}>
		{ props.children }
	</InputReaderContext.Provider>
}
