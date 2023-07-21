interface ButtonInlineProps {
	x: number;
	y: number;
	r: number;
	w: number;
	on: boolean;
}

export const ButtonInline = (props: ButtonInlineProps) => <>
	<circle
		class='fill-black/[0.5]'
		cx={props.x}
		cy={props.y}
		r={props.r+props.w}
	/>
	<circle
		class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
		stroke-width={props.w}
		cx={props.x}
		cy={props.y}
		r={props.r}
	/>
</>


interface ButtonProps {
	r: number;
	line: number;
	on: boolean;
	class?: string;
	style?: string;
}

const Button = (props: ButtonProps) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={(props.r+props.line)*2}
	height={(props.r+props.line)*2}
	class={`inline-block ${props.class||''}`}
	style={`margin-left:-${(props.r+props.line)}px;
			margin-top:-${(props.r+props.line)}px;
			${props.style||''}`}
	>
	<ButtonInline 
		x={props.r+props.line}
		y={props.r+props.line}
		r={props.r}
		on={props.on}
		w={props.line}
	/>
</svg>

export default Button;
