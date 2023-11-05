import { type Component, createSignal } from 'solid-js';
import { Stick, Trigger, TriggerSimpleMode } from '../components/inputs'
import { useInputReader } from '../components/InputReader'
import { Slider, Checkbox } from '../components/ui'
import { Color } from '../types/colors'
import { ang, mag, clamp } from '../helpers/math'
import { numf } from '../helpers/formatting'


export const ExperimentPage: Component = () => {
	const [angleMax, setAngleMax] = createSignal<number>(90)
	const [angleMir, setAngleMir] = createSignal<boolean>(false)
	const [dzSt, setDzSt] = createSignal<number>(4)
	const [dzMid, setDzMid] = createSignal<number>(0.05)
	const [dzOut, setDzOut] = createSignal<number>(0.03)

	const [pad] = useInputReader()
	const x = () => pad()?.inputs[0].ascalar ?? 0
	const y = () => pad()?.inputs[1].ascalar ?? 0
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
		const angle = angleMir() ? angle_core()-angle_over() : angle_core()
		const amount = mdz()
		return angle * amount
	}

	return <div
		class='w-screen h-screen flex gap-4 items-center place-content-center bg-black'
		>
		<div class='grid grid-cols-2 auto-cols-min'>
			<span>{numf(a(),true,3)}&deg;</span><span>ang in</span>
			<span>{numf(angle_core())}</span><span>ang out core</span>
			<span>{numf(angle_over())}</span><span>ang out over</span>
			<span>{numf(m())}</span><span>mag in</span>
			<span>{numf(mdz())}</span><span>mag out</span>
			<span>{numf(steer(),true)}</span><span>output</span>
		</div>

		<div
			class='relative'
			style='width:256px;height:224px;'
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
				color	= { Color.Default }
				class	= 'absolute'
				style	= 'left:128; top:96px;'
			/>	
			<Trigger
				trigger	= { steer() / 2 + 0.5 }
				bumper	= { false }
				trigH	= { 96*2 }
				trigR	= { 0 }
				simple	= { TriggerSimpleMode.Split }
				line	= { 6 }
				color	= { Color.Default }
				class	= 'absolute'
				style	= 'left:128px; top:192px; transform: rotate(90deg);'
			/>
		</div>

		<div
			class='flex flex-col gap-2'
			>
			<Checkbox
				label='oversteer mirror'
				tooltip='oversteering brings output back toward neutral'
				value={angleMir()}
				setValFn={setAngleMir}
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
