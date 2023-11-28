import {
	type Component,
	Show,
	createMemo,
	onMount,
	onCleanup,
} from 'solid-js';
import { createStore } from 'solid-js/store'
import { useInputReader } from '../components/InputReader'
import { damp } from '../helpers/math'
import { GamepadInput } from '../types/gamepad'
import { useLocation } from '@solidjs/router'


const MOTION_RATE = 0.995
const MOTION_AMOUNT = 15 // percent screen
const MAIN_INFLUENCE = 0.70
const SUB_INFLUENCE = 1 - MAIN_INFLUENCE
const MIN_HL = 0.2
const ADD_HL = 0.1


export const Background: Component = () => {
	const location = useLocation()
	const notEmbeddable = createMemo(() => {
		const path = location.pathname.split('/')
		return path[1] === '' || path[1] === 'secret' || path[2] === 'edit'
	})

	let frame
	let last_t = 0, dt
	const [pad] = useInputReader()
	const [bg, setBg] = createStore({
		x1: 0, y1: 0, h1: 0,
		x2: 0, y2: 0, h2: 0,
	})

	function loop(t) {
		dt = t - last_t
		last_t = t
		frame = requestAnimationFrame(loop)
		setBg((bg) => ({
			x1: damp(bg.x1, GamepadInput.ascalar(pad.inputs[0] || null), MOTION_RATE, dt),
			y1: damp(bg.y1, GamepadInput.ascalar(pad.inputs[1] || null), MOTION_RATE, dt),
			h1: damp(bg.h1, GamepadInput.bscalar(pad.inputs[10] || null), MOTION_RATE, dt),
			x2: damp(bg.x2, GamepadInput.ascalar(pad.inputs[2] || null), MOTION_RATE, dt),
			y2: damp(bg.y2, GamepadInput.ascalar(pad.inputs[3] || null), MOTION_RATE, dt),
			h2: damp(bg.h2, GamepadInput.bscalar(pad.inputs[11] || null), MOTION_RATE, dt),
		}))
	}
	onMount(() => { frame = requestAnimationFrame(loop) })
	onCleanup(() => cancelAnimationFrame(frame))


	return <Show when={notEmbeddable()}>
		<div class='w-screen h-screen bg-slate-950 overflow-hidden select-none -z-50 fixed'>
			<div
				class='w-[36rem] aspect-square -ml-[18rem] -mt-[18rem]
				bg-blue-700 blur-[8rem] rounded-full
				absolute inline-block'
				style={{
					top: `${(bg.y1*MAIN_INFLUENCE+bg.y2*SUB_INFLUENCE)*MOTION_AMOUNT+30}%`,
					left: `${(bg.x1*MAIN_INFLUENCE+bg.x2*SUB_INFLUENCE)*MOTION_AMOUNT+40}%`,
					opacity: MIN_HL + ADD_HL * bg.h1,
				}}
			/>
			<div
				class='w-[24rem] aspect-square -ml-[12rem] -mt-[12rem]
				bg-indigo-700 blur-[8rem] rounded-full
				absolute inline-block'
				style={{
					top: `${(bg.y1*SUB_INFLUENCE+bg.y2*MAIN_INFLUENCE)*MOTION_AMOUNT+70}%`,
					left: `${(bg.x1*SUB_INFLUENCE+bg.x2*MAIN_INFLUENCE)*MOTION_AMOUNT+60}%`,
					opacity: MIN_HL + ADD_HL * bg.h2,
				}}
			/>
		</div>
	</Show>
}
