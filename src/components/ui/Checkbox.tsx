import { Component } from 'solid-js'
import { Tooltip } from './'


interface CheckboxProps {
	value: boolean;
	setValFn: (v:boolean)=>void;
	label: string;
	tooltip?: string;
	class?: string;
	style?: string;
}


export const Checkbox: Component<CheckboxProps> = (props: CheckboxProps) => {
	return <div
		class={`inline-flex text-gray-600 select-none ${props.class}`}
		style={props.style}
		>
		<label 
			class={`inline-flex gap-2 pr-2 items-center ${props.value?
				'text-gray-200 hover:text-gray-100':
				'text-gray-500 hover:text-gray-400'}`}
			>
			<input
				type='checkbox'
				onInput={()=>props.setValFn(!props.value)}
				checked={props.value}
				class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800'
			/>
			{props.label}
		</label>
		<Tooltip text={props.tooltip} />
	</div>
}

export default Checkbox
