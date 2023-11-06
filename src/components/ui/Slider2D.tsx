import { Show, Component, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Slider } from './'
import { InlineViewfinderIcon } from '../icons/shapes'
import { wrap } from '../../helpers/math'


interface Slider2DProps {
	valueX: number;
	valueY: number;
	setValFnX: (n:number)=>void;
	setValFnY: (n:number)=>void;
	label?: string;
	unitX?: string;
	unitY?: string;
	minX?: number;
	maxX?: number;
	minY?: number;
	maxY?: number;
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
	startValX?: number;
	startValY?: number;
	startPosX?: number;
	startPosY?: number;
}

const MOVE_MIN = 16


export const Slider2D: Component<Slider2DProps> = (props: Slider2DProps) => {
	let slide
	const [dragging, setDragging] = createStore<DragState>({dragging:false})
	const minx = createMemo(() => isNaN(props.minX) ? Number.MIN_SAFE_INTEGER : props.minX)
	const maxx = createMemo(() => isNaN(props.maxX) ? Number.MAX_SAFE_INTEGER : props.maxX)
	const miny = createMemo(() => isNaN(props.minY) ? Number.MIN_SAFE_INTEGER : props.minY)
	const maxy = createMemo(() => isNaN(props.maxY) ? Number.MAX_SAFE_INTEGER : props.maxY)
	const rangex = createMemo(() => maxx()-minx())
	const rangey = createMemo(() => maxy()-miny())
	const step = (e:KeyboardEvent|MouseEvent) => (props.step||1)*(e.shiftKey?10:1)
	const stepMove = () => props.stepMove || 1

	const realSetVal = (x:number, y:number) => {
		props.setValFnX(props?.wrap ?
			wrap(x,minx(),rangex()) : Math.max(minx(),Math.min(maxx(),x)))
		props.setValFnY(props?.wrap ?
			wrap(y,miny(),rangey()) : Math.max(miny(),Math.min(maxy(),y)))
	}

	const startDragging = (e:MouseEvent) => {
		requestAnimationFrame(() => {
			setDragging({
				dragging: true,
				editable: false,
				startValX: props.valueX,
				startValY: props.valueY,
				startPosX: e.clientX,
				startPosY: e.clientY,
				bigstep: false,
			})
			window.addEventListener('mousemove', whileDragging, true)
			window.addEventListener('mouseup', endDragging, true)
		})
	}

	const whileDragging = (e:MouseEvent) => {
		requestAnimationFrame(() => {
			const d = dragging
			if (d.dragging) {
				if (d.bigstep !== e.shiftKey) setDragging({
					bigstep:e.shiftKey,
					startValX:props.valueX,
					startValY:props.valueY,
					startPosX:e.clientX-e.movementX,
					startPosY:e.clientY-e.movementY,
				})
				const difX = e.clientX-d.startPosX
				const difY = e.clientY-d.startPosY

				if (!d.editable &&
					(Math.abs(difX)>=MOVE_MIN || Math.abs(difY)>=MOVE_MIN || e.ctrlKey || e.altKey)
				) setDragging('editable', true)

				if (d.editable) {
					const amountX = Math.round(difX/stepMove())
					const amountY = Math.round(difY/stepMove())
					if (amountX !== 0 || amountY !== 0) {
						realSetVal(d.startValX+amountX*step(e),
							d.startValY+amountY*step(e))
					setDragging({
							startPosX:d.startPosX+amountX*stepMove(),
							startPosY:d.startPosY+amountY*stepMove(),
							startValX:props?.wrap ?
								wrap(d.startValX+amountX*step(e),minx(),rangex()) :
								Math.max(minx(),Math.min(maxx(),d.startValX+amountX*step(e))),
							startValY:props?.wrap ?
								wrap(d.startValY+amountY*step(e),miny(),rangey()) :
								Math.max(miny(),Math.min(maxy(),d.startValY+amountY*step(e))),
						})
					}
				}
			}
		})
	}

	const endDragging = (e:MouseEvent) => {
		requestAnimationFrame(() => {
			if (dragging.dragging) {
				setDragging('dragging', false)
				window.removeEventListener('mousemove', whileDragging, true)
				window.removeEventListener('mouseup', endDragging, true)
			}
		})
	}

	return <div class={`flex flex-col gap-0 items-start`}>
		<Show when={props.label}>
			<div class='px-1 text-gray-300'>{props.label}</div>
		</Show>
		<div
			class={`flex gap-2 items-center`}
			>
			<div
				ref={slide}
				class={`flex-none h-14 w-14 p-3 select-none cursor-move rounded-xl
text-gray-400 bg-gray-800 hover:bg-gray-600
${dragging.dragging ?
'text-gray-300 hover:text-gray-300 bg-gray-700 hover:bg-gray-700' :
'hover:text-gray-200 bg-gray-800 hover:bg-gray-600' }`}
				onmousedown={startDragging}
				>
				<InlineViewfinderIcon />
			</div>

			<div class='flex flex-col gap-1'>
				<Slider
					unit={props.unitX}
					value={props.valueX}
					min={props.minX}
					max={props.maxX}
					wrap={props.wrap}
					setValFn={props.setValFnX}
					step={props.step}
					stepMove={props.stepMove}
					stepMin={props.stepMin}
					width={props.width}
				/> 
				<Slider
					unit={props.unitY}
					value={props.valueY}
					min={props.minY}
					max={props.maxY}
					wrap={props.wrap}
					setValFn={props.setValFnY}
					step={props.step}
					stepMove={props.stepMove}
					stepMin={props.stepMin}
					width={props.width}
				/> 
			</div>
		</div>
	</div>
}

export default Slider2D
