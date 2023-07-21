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
		<clipPath id='DPadClipU'>
			<rect
				x={(props.length-props.thickness)/2+props.line}
				y={props.line}
				width={props.thickness}
				height={props.length-(props.length+props.thickness)/2}
			/>
		</clipPath>
		<clipPath id='DPadClipL'>
			<rect
				x={props.line}
				y={(props.length-props.thickness)/2+props.line}
				width={props.length-(props.length+props.thickness)/2}
				height={props.thickness}
			/>
		</clipPath>
		<clipPath id='DPadClipD'>
			<rect
				x={(props.length-props.thickness)/2+props.line}
				y={(props.length+props.thickness)/2+props.line}
				width={props.thickness}
				height={props.length-(props.length+props.thickness)/2}
			/>
		</clipPath>
		<clipPath id='DPadClipR'>
			<rect
				x={(props.length+props.thickness)/2+props.line}
				y={(props.length-props.thickness)/2+props.line}
				width={props.length-(props.length+props.thickness)/2}
				height={props.thickness}
			/>
		</clipPath>
		<symbol id='DPadBaseShape'>
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
		<symbol id='DPadBaseShapeThicc'>
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
		href='#DPadBaseShapeThicc'
	/>
	<g class='fill-transparent'>
		<use class={props.up?'fill-white':''}
			href='#DPadBaseShape' clip-path='url(#DPadClipU)' />
		<use class={props.down?'fill-white':''}
			href='#DPadBaseShape' clip-path='url(#DPadClipD)' />
		<use class={props.left?'fill-white':''}
			href='#DPadBaseShape' clip-path='url(#DPadClipL)' />
		<use class={props.right?'fill-white':''}
			href='#DPadBaseShape' clip-path='url(#DPadClipR)' />
	</g>
	<use
		class='stroke-gray-300 fill-transparent'
		stroke-width={props.line}
		href='#DPadBaseShape'
	/>
</svg>

export default DPad;
