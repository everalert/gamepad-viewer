import { ButtonInline } from './Button'


interface Button4Props {
	down: boolean;
	right: boolean;
	left: boolean;
	up: boolean;
	r1: number;
	r2: number;
	line: number;
	class?: string;
	style?: string;
}


const Button4 = (props: Button4Props) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={(props.r1+props.r2+props.line)*2}
	height={(props.r1+props.r2+props.line)*2}
	class={`inline-block ${props.class||''}`}
	style={`margin-left:-${(props.r1+props.r2+props.line)}px;
			margin-top:-${(props.r1+props.r2+props.line)}px;
			${props.style||''}`}
	>
	<ButtonInline
		x={props.r1+props.r2+props.line}
		y={props.r1*2+props.r2+props.line}
		r={props.r2}
		on={props.down}
		w={props.line}
	/>
	<ButtonInline
		x={props.r1*2+props.r2+props.line}
		y={props.r1+props.r2+props.line}
		r={props.r2}
		on={props.right}
		w={props.line}
	/>
	<ButtonInline
		x={props.r2+props.line}
		y={props.r1+props.r2+props.line}
		r={props.r2}
		on={props.left}
		w={props.line}
	/>
	<ButtonInline
		x={props.r1+props.r2+props.line}
		y={props.r2+props.line}
		r={props.r2}
		on={props.up}
		w={props.line}
	/>
</svg>

export default Button4;
