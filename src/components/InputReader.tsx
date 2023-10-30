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
import { GamepadState } from '../types/gamepad'


export const InputReaderContext = createContext<[Accessor<GamepadState>, Setter<GamepadState>]>()

export const useInputReader = () => useContext(InputReaderContext)

export interface InputReaderProps {
	children: JSX.Element;
}

export const InputReader = (props: InputReaderProps) => {
	const [pad, setPad] = createSignal<GamepadState>()

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

	return <InputReaderContext.Provider value={[pad, setPad]}>
		{ props.children }
	</InputReaderContext.Provider>
}
