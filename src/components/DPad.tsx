import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'


interface DPadProps {
	down: boolean;
	right: boolean;
	left: boolean;
	up: boolean;
	length: number;
	thickness: number;
	r: number;
	line: number;
	class?: string;
	style?: string;
}


const genUniqueStr = (b:string, v1:number, v2:number, v3:number) => {
	return `${b}_${v1}_${v2}_${v3}`
}


const DPad = (props: DPadProps) => <svg
	version='1.1' xmlns='http://www.w3.org/2000/svg'
	width={props.length+props.line*2}
	height={props.length+props.line*2}
	class={`inline-block ${props.class||''}`}
	style={`margin-left:-${(props.length)/2+props.line}px;
			margin-top:-${(props.length)/2+props.line}px;
			${props.style||''}`}
	>
	<defs>

		<clipPath id={genUniqueStr('DPadClipU',props.length,props.thickness,props.line)}>
			<rect
				x={(props.length-props.thickness)/2+props.line}
				y={props.line}
				width={props.thickness}
				height={props.length-(props.length+props.thickness)/2}
			/>
		</clipPath>
		<clipPath id={genUniqueStr('DPadClipL',props.length,props.thickness,props.line)}>
			<rect
				x={props.line}
				y={(props.length-props.thickness)/2+props.line}
				width={props.length-(props.length+props.thickness)/2}
				height={props.thickness}
			/>
		</clipPath>
		<clipPath id={genUniqueStr('DPadClipD',props.length,props.thickness,props.line)}>
			<rect
				x={(props.length-props.thickness)/2+props.line}
				y={(props.length+props.thickness)/2+props.line}
				width={props.thickness}
				height={props.length-(props.length+props.thickness)/2}
			/>
		</clipPath>
		<clipPath id={genUniqueStr('DPadClipR',props.length,props.thickness,props.line)}>
			<rect
				x={(props.length+props.thickness)/2+props.line}
				y={(props.length-props.thickness)/2+props.line}
				width={props.length-(props.length+props.thickness)/2}
				height={props.thickness}
			/>
		</clipPath>
		<symbol id={genUniqueStr('DPadBaseShape',props.length,props.thickness,props.line)}>
			<path d={`M ${(props.length-props.thickness)/2+props.r+props.line} ${props.line}
				h ${(props.thickness-props.r*2)}
				q ${props.r} ${0}, ${props.r} ${props.r} 
				v ${((props.length-props.thickness)/2-props.r)}
				h ${((props.length-props.thickness)/2-props.r)}
				q ${props.r} ${0}, ${props.r} ${props.r} 
				v ${(props.thickness-props.r*2)}
				q ${0} ${props.r}, ${-props.r} ${props.r} 
				h ${-((props.length-props.thickness)/2-props.r)}
				v ${((props.length-props.thickness)/2-props.r)}
				q ${0} ${props.r}, ${-props.r} ${props.r} 
				h ${-(props.thickness-props.r*2)}
				q ${-props.r} ${0}, ${-props.r} ${-props.r} 
				v ${-((props.length-props.thickness)/2-props.r)}
				h ${-((props.length-props.thickness)/2-props.r)}
				q ${-props.r} ${0}, ${-props.r} ${-props.r} 
				v ${-(props.thickness-props.r*2)}
				q ${0} ${-props.r}, ${props.r} ${-props.r} 
				h ${((props.length-props.thickness)/2-props.r)}
				v ${-((props.length-props.thickness)/2-props.r)}
				q ${0} ${-props.r}, ${props.r} ${-props.r} 
				Z
			`} />
		</symbol>
		<symbol id={genUniqueStr('DPadBaseShapeThicc',props.length,props.thickness,props.line)}>
			<path d={`M ${props.line+(props.length-props.thickness)/2+props.r} 0
				h ${(props.thickness-props.r*2)}
				q ${props.r+props.line} ${0}, ${props.r+props.line} ${props.r+props.line} 
				v ${((props.length-props.thickness)/2-props.r-props.line)}
				h ${((props.length-props.thickness)/2-props.r-props.line)}
				q ${props.r+props.line} ${0}, ${props.r+props.line} ${props.r+props.line} 
				v ${(props.thickness-props.r*2)}
				q ${0} ${props.r+props.line}, ${-props.r-props.line} ${props.r+props.line} 
				h ${-((props.length-props.thickness)/2-props.r-props.line)}
				v ${((props.length-props.thickness)/2-props.r-props.line)}
				q ${0} ${props.r+props.line}, ${-props.r-props.line} ${props.r+props.line} 
				h ${-(props.thickness-props.r*2)}
				q ${-props.r-props.line} ${0}, ${-props.r-props.line} ${-props.r-props.line} 
				v ${-((props.length-props.thickness)/2-props.r-props.line)}
				h ${-((props.length-props.thickness)/2-props.r-props.line)}
				q ${-props.r-props.line} ${0}, ${-props.r-props.line} ${-props.r-props.line} 
				v ${-(props.thickness-props.r*2)}
				q ${0} ${-props.r-props.line}, ${props.r+props.line} ${-props.r-props.line} 
				h ${((props.length-props.thickness)/2-props.r-props.line)}
				v ${-((props.length-props.thickness)/2-props.r-props.line)}
				q ${0} ${-props.r-props.line}, ${props.r+props.line} ${-props.r-props.line} 
				Z
			`} />
		</symbol>
	</defs>
	
	<use
		class='fill-black/[0.5]'
		href={genUniqueStr('#DPadBaseShapeThicc',props.length,props.thickness,props.line)}
	/>
	<g class='fill-transparent'>
		<use class={props.up?'fill-white':''}
			href={genUniqueStr('#DPadBaseShape',props.length,props.thickness,props.line)}
			clip-path={`url(#${genUniqueStr('DPadClipU',props.length,props.thickness,props.line)})`} />
		<use class={props.down?'fill-white':''}
			href={genUniqueStr('#DPadBaseShape',props.length,props.thickness,props.line)}
			clip-path={`url(#${genUniqueStr('DPadClipD',props.length,props.thickness,props.line)})`} />
		<use class={props.left?'fill-white':''}
			href={genUniqueStr('#DPadBaseShape',props.length,props.thickness,props.line)}
			clip-path={`url(#${genUniqueStr('DPadClipL',props.length,props.thickness,props.line)})`} />
		<use class={props.right?'fill-white':''}
			href={genUniqueStr('#DPadBaseShape',props.length,props.thickness,props.line)}
			clip-path={`url(#${genUniqueStr('DPadClipR',props.length,props.thickness,props.line)})`} />
	</g>
	<use
		class='stroke-gray-300 fill-transparent'
		stroke-width={props.line}
			href={genUniqueStr('#DPadBaseShape',props.length,props.thickness,props.line)}
	/>
</svg>

export const WDPad = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<DPad
		down=		{props.pad?.buttonPress[props.def.bt[0]]||false}
		right=		{props.pad?.buttonPress[props.def.bt[1]]||false}
		left=		{props.pad?.buttonPress[props.def.bt[2]]||false}
		up=			{props.pad?.buttonPress[props.def.bt[3]]||false}
		length=		{props.def.val[0]||80}
		thickness=	{props.def.val[1]||28}
		r=			{props.def.val[2]||8}
		line=		{props.container.line||3}
	/>
</Widget>

export default DPad;
