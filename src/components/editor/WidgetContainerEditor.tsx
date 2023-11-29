import type { JSX } from 'solid-js'
import { Dropdown, Slider, Slider2D } from '../ui'
import { ColorList } from '../../types/colors'
import { useInputLayout } from '../InputLayout'


export const WidgetContainerEditor = (): JSX.Element => {
	const [layout, setLayout] = useInputLayout()
	return <div class='flex flex-col gap-4'>
		<Slider2D
			label='size'
			unitX='w'
			valueX={layout.container.w}
			minX={128}
			setValFnX={(n:number)=>{setLayout('container', 'w', n)}}
			unitY='h'
			valueY={layout.container.h}
			minY={32}
			setValFnY={(n:number)=>{setLayout('container', 'h', n)}}
			step={2}
			stepMove={2}
		/>
		<Slider
			label='margin'
			unit='px'
			value={layout.container.m}
			min={0}
			setValFn={(n:number)=>{setLayout('container', 'm', n)}}
		/>
		<Slider
			label='line width'
			unit='px'
			value={layout.container.line}
			min={1}
			max={8}
			stepMove={8}
			setValFn={(n:number)=>{setLayout('container', 'line', n)}}
		/>
		<Dropdown
			list={ColorList}
			value={layout.container.color || 0}
			setValFn={(c)=>{setLayout('container', 'color', c)}}
			label='base color'
		/>
	</div>
}

export default WidgetContainerEditor
