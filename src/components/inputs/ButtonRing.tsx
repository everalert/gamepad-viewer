import { type JSX, createMemo } from 'solid-js'
import { Index } from 'solid-js'
import { ButtonInlineMap } from './'
import { ButtonShape } from '../../types/inputs'
import { deg2rad } from '../../helpers/math'
import { Color } from '../../types/colors'


interface ButtonRingProps {
	r: number;
	rx: number;
	ry: number;
	rz: number;
	line: number;
	on: boolean[];
	shape: ButtonShape[];
	rotate?: boolean;
	simple?: boolean;
	class?: string;
	style?: string;
	color?: Color;
}


export const ButtonRing = (props: ButtonRingProps): JSX.Element => {
	const angle		= createMemo(() => deg2rad(360/props.on.length))
	const m			= createMemo(() => props.line*2)
	const w			= createMemo(() => (m()+props.r+props.rx)*2)
	const lenMult	= createMemo(() => props.on.length!==1?1:0)

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={w()}
		height={w()}
		class={`${props.class||''}`}
		style={`margin-left:-${w()/2}px;
			margin-top:-${w()/2}px;
			${props.style||''}`}
		>
		<Index each={props.on}>{(on,i) => {
			const Btn = ButtonInlineMap[props.shape[i%props.shape.length]]
			return Btn ? <Btn
				x={w()/2+props.r*Math.cos(angle()*i)*lenMult()}
				y={w()/2+props.r*Math.sin(angle()*i)*lenMult()}
				d1={props.rx}
				d2={props.ry}
				d3={props.rz}
				simple={props.simple}
				angle={props.rotate?(360/props.on.length)*i:0}
				on={on()}
				w={props.line}
				color={props.color}
			/> : null
		}}</Index>
	</svg>
}


export default ButtonRing
