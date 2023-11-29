import { type JSX, createMemo } from 'solid-js'
import { Index } from 'solid-js'
import { ButtonInlineMap } from './'
import { ButtonShape } from '../../types/inputs'
import { Color } from '../../types/colors'


interface ButtonGridProps {
	cols: number;
	stepx: number;
	stepy: number;
	rx: number;
	ry: number;
	rz: number;
	simple?: boolean;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	class?: string;
	style?: string;
	color?: Color;
}


export const ButtonGrid = (props: ButtonGridProps): JSX.Element => {
	const wi	= createMemo(() => (props.cols-1)*props.stepx)
	const hi	= createMemo(() => (Math.ceil(props.on.length/props.cols)-1)*props.stepy)
	const m		= createMemo(() => props.line*2)
	const w		= createMemo(() => (m()+props.rx+props.ry)*2+wi())
	const h		= createMemo(() => (m()+props.rx+props.ry)*2+hi())
	const mi	= createMemo(() => (w()-wi())*0.5)

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={h()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${h()/2}px;
			${props.style||''}`}
		>
		<Index each={props.on}>{(on,i) => {
			const Btn = ButtonInlineMap[props.shape[i%props.shape.length]]
			return Btn ? <Btn
				x={mi()+props.stepx*(i%props.cols)}
				y={mi()+props.stepy*(Math.floor(i/props.cols))}
				d1={props.rx}
				d2={props.ry}
				d3={props.rz}
				simple={props.simple}
				angle={0}
				on={on()}
				w={props.line}
				color={props.color}
			/> : null
		}}</Index>
	</svg>
}

export default ButtonGrid
