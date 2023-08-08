import { Component, createSignal } from 'solid-js'
import { Tooltip } from './'


interface CheckboxProps {
	value: boolean;
	onInput: (e:any)=>void;
	label: string;
	tooltip?: string;
	class?: string;
	style?: string;
}


export const Checkbox: Component<CheckboxProps> = (props: CheckboxProps) => {
	const [hover, setHover] = createSignal<boolean>(false)
	const [rect, setRect] = createSignal<DOMRect>()

	return <div
		class={`relative top-0.5 select-none ${props.class}`}
		style={props.style}
		>
		<label 
			class={`inline-flex gap-2 pr-2 items-center ${props.value?
				'text-gray-200 hover:text-gray-100':
				'text-gray-500 hover:text-gray-400'}`}
			onmouseenter={(e)=>{
				setRect(e.target.getBoundingClientRect())
				setHover(true)
			}}
			onmouseleave={()=>setHover(false)}
			>
			<input
				type='checkbox'
				onInput={props.onInput}
				checked={props.value}
				class='w-5 h-5 px-1.5 pt-0.5 bg-gray-800'
			/>
			{props.label}
		</label>
		<Tooltip text={props.tooltip} show={hover()} target={rect()} />
	</div>
}

export default Checkbox
