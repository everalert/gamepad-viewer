import { Show, Component, createSignal } from 'solid-js'
import { clamp, wrap } from '../../helpers/math'


interface SliderProps {
	value: number;
	setVal: (n:number)=>void;
	label?: string;
	unit?: string;
	min?: number;
	max?: number;
	wrap?: boolean;
	step?: number;
	stepMove?: number;
	stepMin?: number;
	width?: string;
}

interface DragState {
	dragging: boolean;
	editable?: boolean;
	bigstep?: boolean;
	startVal?: number;
	startPosX?: number;
	startPosY?: number;
}

const MOVE_MIN = 16


export const Slider: Component<SliderProps> = (props: SliderProps) => {
	let input, slide
	const [dragging, setDragging] = createSignal<DragState>({dragging:false})
	const [editing, setEditing] = createSignal<boolean>(false)
	const min = () => isNaN(props.min) ? Number.MIN_SAFE_INTEGER : props.min
	const max = () => isNaN(props.max) ? Number.MAX_SAFE_INTEGER : props.max
	const range = () => max()-min()
	const userange = () => props.min !== undefined && props.max !== undefined
	const percent = () => clamp((1-(-min()+props.value)/range())*100,0,100)
	const step = (e:KeyboardEvent|MouseEvent) => (props.step||1)*(e.shiftKey?10:1)

	const realSetVal = (n:number) =>
		props.setVal(props?.wrap ?
			wrap(n,min(),range()) : Math.max(min(),Math.min(max(),n)))

	const inc = (e:KeyboardEvent|MouseEvent) =>  {
		realSetVal(props.value + step(e))
		e.preventDefault()
	}

	const dec = (e:KeyboardEvent|MouseEvent) =>  {
		realSetVal(props.value - step(e))
		e.preventDefault()
	}

	const startEditing = () => {
		setEditing(true)
		input.focus()
		input.select()
	}

	const endEditing = () => {
		setEditing(false)
		slide.focus()
	}

	const startDragging = (e:MouseEvent) => {
		setDragging({
			dragging: true,
			editable: false,
			startVal: props.value,
			startPosX: e.clientX,
			startPosY: e.clientY,
			bigstep: false,
		})
		window.addEventListener('mousemove', whileDragging, true)
		window.addEventListener('mouseup', endDragging, true)
	}

	const whileDragging = (e:MouseEvent) => {
		if (dragging().dragging) {
			if (dragging().bigstep !== e.shiftKey) setDragging({
				...dragging(),
				bigstep:e.shiftKey,
				startVal:props.value,
				startPosX:e.clientX-e.movementX,
				startPosY:e.clientY-e.movementY,
			})
			const difX = e.clientX-dragging().startPosX
			const difY = e.clientY-dragging().startPosY

			if (!dragging().editable && (
				Math.abs(difX)>=MOVE_MIN ||
				Math.abs(difY)>=MOVE_MIN ||
				e.ctrlKey ||
				e.altKey)
			) setDragging({ ...dragging(), editable:true })

			if (dragging().editable) {
				realSetVal(dragging().startVal+Math.round(difX/(props.stepMove||1))*step(e))
			}
		}
	}

	const endDragging = (e:MouseEvent) => {
		if (dragging().dragging) {
			if (!dragging().editable) startEditing()

			setDragging({ dragging:false })
			slide.blur()
			window.removeEventListener('mousemove', whileDragging, true)
			window.removeEventListener('mouseup', endDragging, true)
		}
	}

	const slideKeyDown = (e:KeyboardEvent) => {
		if (e.code === 'Enter') startEditing()
		if (e.code === 'ArrowUp' || e.code === 'ArrowRight') inc(e)
		if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') dec(e)
	}

	const inputKeyDown = (e:KeyboardEvent) => {
		if (e.code === 'Enter') endEditing()
		if (e.code === 'ArrowUp') inc(e)
		if (e.code === 'ArrowDown') dec(e)
	}

	return <div
		class={`flex flex-col items-start`}
		>
		<Show when={props.label}>
			<div class='flex gap-1'>{props.label}</div>
		</Show>
		<div class='flex gap-[1px] overflow-hidden rounded-md'>
			<div
				class={`w-7 h-7 text-xl text-center text-gray-400 hover:text-gray-200
					select-none cursor-pointer bg-gray-800
					hover:bg-gray-600 active:bg-gray-700`}
				onclick={(e)=>dec(e)}
				>
				−
			</div>

			<div
				ref={slide}
				class={`h-7 py-0.5 text-center select-none cursor-ew-resize outline-none
					${userange() ? `bg-gradient-to-r bg-[length:200%_100%]
					from-gray-700 from-50% to-gray-800 to-50%
					hover:from-gray-500 hover:from-50% hover:to-gray-600 hover:to-50%
					focus:from-gray-600 focus:from-50% focus:to-gray-700 focus:to-50%` :
					'bg-gray-800 hover:bg-gray-600 focus:bg-gray-700'}
					${props.width||'w-[4.5rem]'} 
					${editing()?'hidden':''}`}
				style={{'background-position-x':`${percent()}%`}}
				onmousedown={startDragging}
				onkeydown={slideKeyDown}
				tabindex={0}
				>
				{`${props.value||0}${props.unit||''}`}
			</div>

			<input
				ref={input}
				type='text'
				value={props.value}
				class={`h-7 py-0.5 text-center outline-none
					${userange() ? `bg-gradient-to-r bg-[length:200%_100%]
					from-gray-900 from-50% to-gray-950 to-50%` :
					'bg-gray-800/[0.5]'}
					${props.width||'w-[4.5rem]'}
					${editing()?'':'hidden'}`}
				style={{'background-position-x':`${percent()}%`}}
				oninput={(e)=>{
					if (!isNaN(Number.parseInt(e.target.value)))
						realSetVal(Number.parseInt(e.target.value))
				}}
				onfocusout={()=>setEditing(false)}
				onkeydown={inputKeyDown}
			/>

			<div
				class={`w-7 h-7 text-xl text-center text-gray-400 hover:text-gray-200
					select-none cursor-pointer bg-gray-800
					hover:bg-gray-600 active:bg-gray-700`}
				onclick={(e)=>inc(e)}
				>
				+
			</div>
		</div>
	</div>
}

export default Slider
