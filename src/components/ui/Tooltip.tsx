import { Show, Component } from 'solid-js'
import { Portal } from 'solid-js/web'


interface TooltipProps {
	text?: string;
	show: boolean;
	target: DOMRect;
}


export const Tooltip: Component<TooltipProps> = (props: TooltipProps) => {
	const position = () => {
		const x = props.target?.left < window.innerWidth-props.target?.right ?
			`left:${props.target?.left+window.scrollX}px;` :
			`right:${window.innerWidth-props.target?.right-window.scrollX}px;`
		const y = props.target?.top < window.innerHeight-props.target?.bottom ?
			`top:${props.target?.bottom+window.scrollY}px;` :
			`bottom:${window.innerHeight-props.target?.top-window.scrollY}px;`
		return `${x}${y}`
	}

	return <Show when={props.text}>
		<Portal>
			<div
				class={`absolute m-2 py-2 px-4 select-none rounded-xl
					text-gray-300 bg-gray-800 outline outline-3 outline-black/[0.5]
					${props.show ? 'block' : 'hidden'}`}
				style={position()}
				>
				{props.text}
			</div>
		</Portal>
	</Show>
}

export default Tooltip
