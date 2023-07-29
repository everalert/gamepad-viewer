import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'




interface ButtonInlineProps {
	x: number;
	y: number;
	r: number;
	w: number;
	on: boolean;
	scale: number;
	orientation: number;
}

export const ButtonInline = (props: ButtonInlineProps): JSXElement => {

	const calculateTrianglePoints = (): string => {
	  const { x, y, r, scale, orientation } = props;
	  const vertices = [];
		
	  for (let i = 0; i < 3; i++) {
		const angle = i * ((2 * Math.PI) / 3) + ((orientation * Math.PI) / 180);
		vertices.push(
			`${x + r * scale * Math.cos(angle)},
			${y + r * scale * Math.sin(angle)}`
		);
	  }
		
	  return vertices.join(' ');
	};

  
	const trianglePoints = calculateTrianglePoints();

	return (
	  <>
		<circle
		  class='fill-black/[0.5]'
		  cx={props.x}
		  cy={props.y}
		  r={props.r + props.w}
		/>
		<circle
		  class={`stroke-gray-300 ${props.on ? 'fill-white' : 'fill-transparent'}`}
		  stroke-width={props.w}
		  cx={props.x}
		  cy={props.y}
		  r={props.r}
		/>
		<polygon
		  points={trianglePoints}
		  class={`stroke-gray-300 ${props.on ? 'fill-white' : 'fill-transparent'}`}
		  stroke-width={props.w/1.1}
      	/>
	  </>
	);
  }




interface Button4Props {
	down: boolean;
	right: boolean;
	left: boolean;
	up: boolean;
	r1: number;
	r2: number;
	line: number;
	scale: number;
	class?: string;
	style?: string;
}


const CButton4 = (props: Button4Props) => <svg
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
		scale={props.scale/10}
		orientation={90}
	/>
	<ButtonInline
		x={props.r1*2+props.r2+props.line}
		y={props.r1+props.r2+props.line}
		r={props.r2}
		on={props.right}
		w={props.line}
		scale={props.scale/10}
		orientation={0}
	/>
	<ButtonInline
		x={props.r2+props.line}
		y={props.r1+props.r2+props.line}
		r={props.r2}
		on={props.left}
		w={props.line}
		scale={props.scale/10}
		orientation={180}
	/>
	<ButtonInline
		x={props.r1+props.r2+props.line}
		y={props.r2+props.line}
		r={props.r2}
		on={props.up}
		w={props.line}
		scale={props.scale/10}
		orientation={270}
	/>
</svg>

export const WCButton4 = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<CButton4
		down=	{props.pad?.buttonPress[props.def.bt[0]]||false}
		right=	{props.pad?.buttonPress[props.def.bt[1]]||false}
		left=	{props.pad?.buttonPress[props.def.bt[2]]||false}
		up=		{props.pad?.buttonPress[props.def.bt[3]]||false}
		r1=		{props.def.val[0]||28}
		r2=		{props.def.val[1]||16}
		line=	{props.container.line||3}
		scale = {props.def.val[2]||5}
	/>
</Widget>

export default CButton4;
