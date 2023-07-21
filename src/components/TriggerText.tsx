import { numf } from '../helpers/formatting'


interface TriggerTextProps {
	right: number;
	left: number;
}


const TriggerText = (props: TriggerTextProps) => {
	return (
		<div class='grid grid-cols-1 leading-[1.0125rem] px-3 py-2 pb-1 bg-black/[0.65] rounded-md'>
			<div class='font-medium'>
				{numf(props.left)}<span class='ml-1 text-sm font-normal'>LT</span>
			</div>
			<div class='font-medium'>
				{numf(props.right)}<span class='ml-1 text-sm'>RT</span>
			</div>
		</div>
	)
}

export default TriggerText;
