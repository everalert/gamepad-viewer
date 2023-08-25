import type { Accessor, Setter, JSXElement } from 'solid-js'
import type { WidgetContainerDef } from '../containers'
import { Slider, Slider2D } from '../ui'


interface WidgetContainerProps {
	container: Accessor<WidgetContainerDef>;
	setContainer: Setter<WidgetContainerDef>;
}


export const WidgetContainerEditor = (props: WidgetContainerProps): JSXElement => {
	return <div class='flex gap-4'>
		<Slider2D
			label='size'
			unitX='w'
			valueX={props.container().w}
			minX={128}
			setValFnX={(n:number)=>{props.setContainer({...props.container(),w:n})}}
			unitY='h'
			valueY={props.container().h}
			minY={32}
			setValFnY={(n:number)=>{props.setContainer({...props.container(),h:n})}}
			step={2}
			stepMove={2}
		/>
		<Slider
			label='margin'
			unit='px'
			value={props.container().m}
			min={0}
			setValFn={(n:number)=>{props.setContainer({...props.container(),m:n})}}
		/>
		<Slider
			label='line-width'
			unit='px'
			value={props.container().line}
			min={1}
			max={8}
			stepMove={8}
			setValFn={(n:number)=>{props.setContainer({...props.container(),line:n})}}
		/>
	</div>
}

export default WidgetContainerEditor
