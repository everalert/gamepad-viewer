import { type Component, createSignal } from 'solid-js';
import { Stick, Trigger } from '../components/inputs'
import { useInputReader } from '../components/InputReader'
import { Slider, Checkbox } from '../components/ui'
import { GamepadInput } from '../types/gamepad'
import { Color } from '../types/colors'
import { TriggerSimpleMode } from '../types/inputs'
import { ang, mag, clamp, lerp, easeIn2, easeOut2 } from '../helpers/math'
import { numf } from '../helpers/formatting'


const WIDGET_COLOR = Color.Blue


export const ExperimentPage: Component = () => {
	const [angleMax, setAngleMax] = createSignal<number>(135)
	const [angleOver, setAngleOver] = createSignal<boolean>(true)
	const [angleInv, setAngleInv] = createSignal<boolean>(false)
	const [segNo, setSegNo] = createSignal<number>(8)
	const [angleSeg, setAngleSeg] = createSignal<boolean>(false)
	const [angleSegMix, setAngleSegMix] = createSignal<boolean>(false)
	const [angleEase, setAngleEase] = createSignal<boolean>(false)
	const [magSeg, setMagSeg] = createSignal<boolean>(false)
	const [magEase, setMagEase] = createSignal<boolean>(false)
	const [dzSt, setDzSt] = createSignal<number>(4)
	const [dzMid, setDzMid] = createSignal<number>(0.05)
	const [dzOut, setDzOut] = createSignal<number>(0.03)

	const [pad] = useInputReader()
	const x = () => GamepadInput.ascalar(pad.inputs[0] || null)
	const y = () => GamepadInput.ascalar(pad.inputs[1] || null)
	const a = () => ang(angleInv() ? y() : -y(), x())
	const as = () => Math.sign(a())
	const m = () => mag(x(), y())
	const mdz = () => (clamp(m(),dzMid(),1-dzOut())-dzMid()) / (1-dzMid()-dzOut())
	const seg = (n:number, s:number) => Math.round(n * s) / s 

	const angle_core = () => as() *
		((clamp(a()*as(),dzSt(),angleMax()-dzSt())-dzSt()) /
			(angleMax()-dzSt()*2))
	const angle_over = () => as() *
		((clamp(a()*as()-angleMax(),dzSt(),angleMax()-dzSt())-dzSt()) /
			(angleMax()-dzSt()*2))

	// NOTE: just set angle deadzone to 0 if the different segment end zone sizes bother you
	const steer = () => {
		let amt = mdz()
		if (magSeg()) amt = seg(amt, segNo())
		if (magEase()) amt = easeIn2(amt)

		let ang_base = angleOver() ? angle_core() : angle_core()-angle_over()
		let ang_seg = seg(ang_base, segNo())
		let ang = angleSeg() ? (angleSegMix() ? lerp(ang_base,ang_seg,amt) : ang_seg) : ang_base
		if (angleEase()) ang *= easeIn2(as()*ang)

		return ang * amt
	}

	return <div
		class='w-screen h-screen grid grid-auto-cols auto-col-min gap-16 items-start place-content-center'
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
			<span class='col-span-2 text-center font-bold'>input</span>
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
				<span class='text-right'>{numf(x(),false)}</span><span>x</span>
				<span class='text-right'>{numf(y(),false)}</span><span>y</span>
				<span class='text-right'>{numf(a(),true,3)}&deg;</span><span>angle</span>
				<span class='text-right'>{numf(angle_core())}</span><span>⇒ output core</span>
				<span class='text-right'>{numf(angle_over())}</span><span>⇒  output over</span>
				<span class='text-right'>{numf(m())}</span><span>magnitude</span>
				<span class='text-right'>{numf(mdz())}</span><span>⇒  output</span>
			</div>
		</div>

		<div
			class='flex flex-col gap-8'
			>
			<span class='col-span-2 text-center font-bold'>settings</span>
			<div
				class='flex flex-col gap-2'
				>
				<div class='flex flex-row-reverse items-center self-start gap-2'>
					<span>full-steer angle</span>
					<Slider
						unit='&deg;'
						value={angleMax()}
						min={0}
						max={180}
						stepMove={2}
						setValFn={setAngleMax}
						width='w-[3.5rem]'
					/> 
				</div>
				<Checkbox
					label='angle segmenting'
					tooltip='steering angle is shaped into set blocks rather than a smooth transition'
					value={angleSeg()}
					setValFn={setAngleSeg}
				/>
				<Checkbox
					label='angle segment blending'
					tooltip='inputs close to the middle are fully analog, and gradually become more segmented as they reach the outside'
					value={angleSegMix()}
					setValFn={setAngleSegMix}
				/>
				<Checkbox
					label='angle easing'
					tooltip='angle has more granularity toward the center'
					value={angleEase()}
					setValFn={setAngleEase}
				/>

				<Checkbox
					label='magnitude segmenting'
					tooltip='steering amount is shaped into set blocks rather than a smooth transition'
					value={magSeg()}
					setValFn={setMagSeg}
				/>
				<Checkbox
					label='magnitude easing'
					tooltip='magnitude has more granularity toward the center'
					value={magEase()}
					setValFn={setMagEase}
				/>
				<div class='flex flex-row-reverse items-center self-start gap-2'>
					<span>segments</span>
					<Slider
						value={segNo()}
						min={1}
						max={32}
						stepMove={2}
					setValFn={setSegNo}
						width='w-[3.5rem]'
					/> 
				</div>

				<div class='flex flex-row-reverse items-center self-start gap-2'>
					<span>steering deadzone</span>
					<Slider
						unit='&deg;'
						value={dzSt()}
						min={0}
						max={180}
						stepMove={2}
						setValFn={setDzSt}
						width='w-[3.5rem]'
					/> 
				</div>
				<div class='flex flex-row-reverse items-center self-start gap-2'>
					<span>inner deadzone</span>
					<Slider
						value={dzMid()}
						min={0}
						max={1}
						step={0.01}
						stepMove={4}
					setValFn={setDzMid}
						fprecision={2}
						width='w-[3.5rem]'
					/> 
				</div>
				<div class='flex flex-row-reverse items-center self-start gap-2'>
					<span>outer deadzone</span>
					<Slider
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

				<Checkbox
					label='oversteer'
					tooltip='steering beyond full-steer angle maintains max steering'
					value={angleOver()}
					setValFn={setAngleOver}
				/>
				<Checkbox
					label='invert'
					tooltip='no-steer starts at the bottom'
					value={angleInv()}
					setValFn={setAngleInv}
				/>
			</div>
		</div>
	</div>
}

export default ExperimentPage;
