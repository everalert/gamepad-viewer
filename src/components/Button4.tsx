import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'
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


export const Button4 = (props: Button4Props) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={(props.r1+props.r2+props.line)*2}
	height={(props.r1+props.r2+props.line)*2}
	class={`${props.class||''}`}
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

export const WButton4 = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<Button4
		down=	{props.pad?.buttonPress[props.def.bt[0]]||false}
		right=	{props.pad?.buttonPress[props.def.bt[1]]||false}
		left=	{props.pad?.buttonPress[props.def.bt[2]]||false}
		up=		{props.pad?.buttonPress[props.def.bt[3]]||false}
		r1=		{props.def.val[0]||28}
		r2=		{props.def.val[1]||16}
		line=	{props.container.line||3}
	/>
</Widget>

export default Button4;
