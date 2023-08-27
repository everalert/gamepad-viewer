import { JSXElement, Show, Component, createSignal, children } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Tooltip as TooltipIcon } from '../icons'


interface TooltipProps {
	text?: string;
	children?: JSXElement;
}


export const Tooltip: Component<TooltipProps> = (props: TooltipProps) => {
	const [hover, setHover] = createSignal<boolean>(false)
	const [rect, setRect] = createSignal<DOMRect>()
	const newChildren = children(()=>props.children)

	const position = () => {
		const x = rect()?.left < window.innerWidth-rect()?.right ?
			`left:${rect()?.left+window.scrollX}px;` :
			`right:${window.innerWidth-rect()?.right-window.scrollX}px;`
		const y = rect()?.top < window.innerHeight-rect()?.bottom ?
			`top:${rect()?.bottom+window.scrollY}px;` :
			`bottom:${window.innerHeight-rect()?.top-window.scrollY}px;`
		return `${x}${y}`
	}

	return <Show when={props.text}>
		<div
			onmouseenter={(e)=>{
				setRect(e.target.getBoundingClientRect())
				setHover(true)
			}}
			onmouseleave={()=>setHover(false)}>
			{ newChildren() ? newChildren() :
				<TooltipIcon class='h-6 w-6 relative top-[0.0625rem]' /> }
			<Portal>
				<div
					class={`absolute m-2 py-2 px-4 select-none rounded-xl z-50
						text-gray-300 bg-gray-800 outline outline-3 outline-black/[0.5]
						${hover() ? 'block' : 'hidden'}`}
					style={position()}
					>
					{props.text}
				</div>
			</Portal>
		</div>
	</Show>
}

export default Tooltip
