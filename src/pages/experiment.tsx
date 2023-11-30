import { type Component, createSignal } from 'solid-js';
import { Stick, Trigger } from '../components/inputs'
import { useInputReader } from '../components/InputReader'
import { Slider, Checkbox } from '../components/ui'
import { GamepadState, GamepadInput } from '../types/gamepad'
import { Color } from '../types/colors'
import { TriggerSimpleMode } from '../types/inputs'
import { ang, mag, clamp } from '../helpers/math'
import { numf } from '../helpers/formatting'


const WIDGET_COLOR = Color.Blue


export const ExperimentPage: Component = () => {
	const [angleMax, setAngleMax] = createSignal<number>(135)
	const [angleOver, setAngleOver] = createSignal<boolean>(true)
	const [dzSt, setDzSt] = createSignal<number>(4)
	const [dzMid, setDzMid] = createSignal<number>(0.05)
	const [dzOut, setDzOut] = createSignal<number>(0.03)

	const [pad] = useInputReader()
	const x = () => GamepadInput.ascalar(pad.inputs[0] || null)
	const y = () => GamepadInput.ascalar(pad.inputs[1] || null)
	const a = () => ang(-y(), x())
	const as = () => Math.sign(a())
	const m = () => mag(x(), y())
	const mdz = () => (clamp(m(),dzMid(),1-dzOut())-dzMid()) / (1-dzMid()-dzOut())

	const angle_core = () => as() *
		((clamp(a()*as(),dzSt(),angleMax()-dzSt())-dzSt()) /
			(angleMax()-dzSt()*2))
	const angle_over = () => as() *
		((clamp(a()*as()-angleMax(),dzSt(),angleMax()-dzSt())-dzSt()) /
			(angleMax()-dzSt()*2))
	const steer = () => {
		const angle = angleOver() ? angle_core() : angle_core()-angle_over()
		const amount = mdz()
		return angle * amount
	}

	return <div
		class='w-screen h-screen grid grid-auto-cols auto-col-min gap-16 items-center place-content-center'
		>
		<div
			class='relative col-span-2 grid grid-cols-2'
			>
			<span class='col-span-2 text-center font-bold'>output</span>
			<div class='col-span-2 relative left-[50%] top-[24px] h-[48px]'>
				<Trigger
					trigger	= { steer() / 2 + 0.5 }
					bumper	= { false }
					trigH	= { 96*4 }
					trigR	= { 0 }
					simple	= { TriggerSimpleMode.Split }
					line	= { 12 }
					color	= { WIDGET_COLOR }
					style	= 'transform: rotate(90deg);'
				/>
			</div>
			<span class={`${steer()<0?'':'opacity-10'} px-2 text-right`}>
				{steer()<0 ? numf(steer()) : '0.0000'}
			</span>
			<span class={`${steer()>0?'':'opacity-10'} px-2`}>
				{steer()>0 ? numf(steer()) : '0.0000'}
			</span>
		</div>

		<div class='flex flex-col gap-8 items-center'>
			<div
				class='relative w-[128px] h-[128px]'
				>
				<Stick
					x		= { x() }
					y		= { y() }
					button	= { false }
					r		= { 64 }
					a		= { 67.5 }
					ar		= { 64 }
					simple	= { false }
					line	= { 3 }
					color	= { WIDGET_COLOR }
					class	= 'absolute left-[64px] top-[64px]'
				/>	
			</div>
			<div class='grid grid-cols-[4.75rem_max-content] gap-x-4'>
				<span class='text-right'>{numf(a(),true,3)}&deg;</span><span>ang in</span>
				<span class='text-right'>{numf(angle_core())}</span><span>ang out core</span>
				<span class='text-right'>{numf(angle_over())}</span><span>ang out over</span>
				<span class='text-right'>{numf(m())}</span><span>mag in</span>
				<span class='text-right'>{numf(mdz())}</span><span>mag out</span>
			</div>
		</div>

		<div
			class='flex flex-col gap-2'
			>
			<Checkbox
				label='oversteer'
				tooltip='steering beyond full-steer angle maintains max steering'
				value={angleOver()}
				setValFn={setAngleOver}
			/>
			<Slider
				label='full-steer angle'
				unit='&deg;'
				value={angleMax()}
				min={0}
				max={180}
				stepMove={2}
				setValFn={setAngleMax}
				width='w-[3.5rem]'
			/> 
			<Slider
				label='steering deadzone'
				unit='&deg;'
				value={dzSt()}
				min={0}
				max={180}
				stepMove={2}
				setValFn={setDzSt}
				width='w-[3.5rem]'
			/> 
			<Slider
				label='inner deadzone'
				value={dzMid()}
				min={0}
				max={1}
				step={0.01}
				stepMove={4}
				setValFn={setDzMid}
				fprecision={2}
				width='w-[3.5rem]'
			/> 
			<Slider
				label='outer deadzone'
				value={dzOut()}
				min={0}
				max={1}
				step={0.01}
				stepMove={4}
				setValFn={setDzOut}
				fprecision={2}
				width='w-[3.5rem]'
			/> 
		</div>
	</div>
}

export default ExperimentPage;
