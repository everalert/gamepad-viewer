import { useSearchParams } from '@solidjs/router'
import { ang, mag } from '../helpers/math'
import { numf } from '../helpers/formatting'


interface StickTextProps {
	x: number;
	y: number;
	label?: string;
}

const deadzone = 0.05


export const StickText = (props: StickTextProps) => {
	const [params] = useSearchParams();
	const MODE_COMPACT = params.compact !== undefined || params.lesstext !== undefined

	return <div class={`grid ${ MODE_COMPACT ? 'grid-cols-1 w-[6.3rem]' : 'grid-cols-2 w-[10.75rem]' } leading-[1.0125rem] px-3 py-2 pb-1 bg-black/[0.65] rounded-md`}>

		{ props.label ? <div class='col-span-full font-bold text-sm'>
			{props.label}
		</div> : null }

		<div class='font-medium'>
			{numf(props.x,true)}<span class='ml-0.5 text-sm font-normal'>X</span>
		</div>
		{ MODE_COMPACT || <div class='text-right text-sm'>
			{numf(mag(props.y, props.x)>deadzone?ang(-props.y, props.x):0,true,2)}&deg;
		</div> }
		<div class='font-medium'>
			{numf(props.y,true)}<span class='ml-0.5 text-sm font-normal'>Y</span>
		</div>
		{ MODE_COMPACT || <div class='text-right text-sm'>
			<div class='mr-0.5 inline-block relative -top-[0.05rem]'>||</div>
			{numf(mag(-props.y, props.x))}
			<div class='ml-0.5 inline-block relative -top-[0.05rem]'>||</div>
		</div> }

	</div>
}

export default StickText;
