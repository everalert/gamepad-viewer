import type { JSXElement } from 'solid-js'
import { For, Show, createSignal, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'


export type DropdownItem = {
	value: any;
	label: JSXElement;
	faded?: boolean;
	accent?: string; // border color
}


interface DropdownProps {
	list: DropdownItem[];
	value: any;
	setValFn: (v:any) => void;
	clearFn?: (e:MouseEvent) => void;
	cmpFn?: (v1:any, v2:any) => boolean;
	focusActionFn?: (e:Event) => void;
	focusActionEv?: string;
	focusBtn?: boolean;
	label?: string;
	width?: string;
}


export const Dropdown = (props: DropdownProps): JSXElement => {
	let field, menu
	const [showlist, setShowlist] = createSignal<boolean>(false)

	const [rect, setRect] = createSignal<DOMRect>()
	const listpos = () => {
		const x = rect()?.left < window.innerWidth-rect()?.right ?
			`left:${rect()?.left+window.scrollX}px;` :
			`right:${window.innerWidth-rect()?.right-window.scrollX}px;`
		const y = rect()?.top < window.innerHeight-rect()?.bottom ?
			`top:${rect()?.bottom+window.scrollY}px;` :
			`bottom:${window.innerHeight-rect()?.top-window.scrollY}px;`
		return `${x}${y}`
	}

	const valueListItem = () => props.list.find(val => props.cmpFn ?
		props.cmpFn(val.value, props.value) : val.value===props.value)

	const handleOpenMenuClick = (event:MouseEvent) => {
		const x = event.clientX, y = event.clientY
		const rm = menu.getBoundingClientRect()
		if (x<rm.left || x>rm.right || y<rm.top || y>rm.bottom) {
			const rf = field.getBoundingClientRect()
			closeMenu(x<rf.left || x>rf.right || y<rf.top || y>rf.bottom)
			event.stopPropagation()
		}
	}

	const openMenu = () => {
		document.addEventListener('click', handleOpenMenuClick, true)
		setRect(field.getBoundingClientRect())
		field.blur()
		setShowlist(true)
	}

	const closeMenu = (blur:boolean=false) => {
		document.removeEventListener('click', handleOpenMenuClick, true)
		setShowlist(false)
		field.focus()
		if (blur) field.blur() // to make sure doc cursor isnt in the portal
	}

	const clickMenu = () => showlist() ? closeMenu() : openMenu()

	const handleFocus = (event:FocusEvent) => {
		field.addEventListener('blur', handleBlur, true)
		if (props.focusActionFn) {
			props.focusActionFn(event)
			document.addEventListener(props.focusActionEv, props.focusActionFn, true)
		}
	}

	const handleBlur = (event:FocusEvent) => {
		field.removeEventListener('blur', handleBlur, true)
		if (props.focusActionFn) {
			//setReady(false) // TODO: decide if there needs to be a cleanup function
			document.removeEventListener(props.focusActionEv, props.focusActionFn, true)
		}
	}

	const handleMenuSelect = (event:MouseEvent, val:any) => {
		props.setValFn(val)
		closeMenu()
	}

	onCleanup(()=>{
		document.removeEventListener('click', handleOpenMenuClick, true)
		field.removeEventListener('blur', handleBlur, true)
		if (props.focusActionFn)
			document.removeEventListener(props.focusActionEv, props.focusActionFn, true)
	})

	return <div
		class={`flex flex-col items-start`}
		>
		<Show when={props?.label}>
			<div class='px-1 text-gray-300'>{props.label}</div>
		</Show>
		<div class='inline-flex gap-[1px] rounded-md overflow-hidden'>
			<div
				ref={field}
				class={`${props.width||'w-28'} h-7 px-2 py-0.5 flex gap-1 justify-between
					border-l-4 ${valueListItem()?.accent || 'border-transparent'}
					select-none cursor-pointer outline-none
					bg-gray-800 hover:bg-gray-600 focus:bg-gray-700
					${valueListItem()?.faded ? 'text-gray-500 hover:text-gray-300' : ''}`}
				tabindex={0}
				onclick={clickMenu}
				onfocus={handleFocus}
				>
				<div>{ valueListItem()?.label }</div>
				<div>▾</div>
			</div>

			<Show when={props.focusBtn}>
				<div
					class={`w-7 h-7 pl-[0.45rem] pt-[0.175rem]
						text-gray-400 hover:text-gray-200
						select-none cursor-pointer bg-gray-800
						hover:bg-gray-600 active:bg-gray-700`}
					onclick={()=>field.focus()}
					>
					◉
				</div>
			</Show>

			<Show when={props.clearFn}>
				<div
					class={`w-7 h-7
						text-xl text-center text-gray-400 hover:text-gray-200
						select-none cursor-pointer bg-gray-800
						hover:bg-gray-600 active:bg-gray-700`}
					onclick={props.clearFn}
					>
					×
				</div>
			</Show>
		</div>

		<Portal>
			<div
				ref={menu}
				class={`absolute flex flex-col gap-[1px] w-28 h-36 my-1 select-none rounded z-50
					bg-gray-950 overflow-y-scroll scrollbar-thin
					scrollbar-track-gray-900 scrollbar-thumb-gray-700
					hover:scrollbar-thumb-gray-500
					outline outline-2 outline-black/[0.5]
					${showlist() ? 'block' : 'hidden'}`}
				style={listpos()}
				>
				<For each={props.list}>{p => {
					return <div
						class={`py-0.5 px-2 select-none cursor-pointer
							border-l-4 ${p.accent || 'border-transparent'}
							bg-gray-800 hover:bg-gray-600
							${p.faded ? 'text-gray-400 hover:text-gray-200' :
								'text-gray-300 hover:text-white'}`}
						onclick={(e)=>handleMenuSelect(e,p.value)}>
						{p.label}
					</div>
				}}</For>
			</div>
		</Portal>
	</div>
}


export default Dropdown
