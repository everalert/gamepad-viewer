import { ButtonInline } from './Button'


interface Button2Props {
	right: boolean;
	left: boolean;
	r1: number;
	r2: number;
	line: number;
	class?: string;
	style?: string;
}


const Button2 = (props: Button2Props) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={(props.r1+props.r2+props.line)*2}
	height={(props.r2+props.line)*2}
	class={`inline-block ${props.class||''}`}
	style={`margin-left:-${props.r1+props.r2+props.line}px;
			margin-top:-${props.r2+props.line}px;
			${props.style||''}`}
	>
	<ButtonInline
		x={props.r1*2+props.r2+props.line}
		y={props.r2+props.line}
		r={props.r2}
		on={props.right}
		w={props.line}
	/>
	<ButtonInline
		x={props.r2+props.line}
		y={props.r2+props.line}
		r={props.r2}
		on={props.left}
		w={props.line}
	/>
</svg>

export default Button2;
