import { createMemo } from 'solid-js'
import { AbC2a, AbC2h } from '../../helpers/math'
import { Color, getColorDef } from '../../types/colors'


interface StickProps {
	x: number;
	y: number;
	button?: boolean;
	r: number;
	a: number;
	ar: number;
	line: number;
	simple?: boolean;
	color?: Color;
	class?: string;
	style?: string;
}

export const DOT_RSCALE	= 1.25	// radius
export const DOT_LSCALE	= 0.6	// line
export const NICE_FACTOR	= 5		// for preset 'straight' lines that aren't harsh
export const ROUND_FACTOR	= 1.5	// for 'rounded octagon'


export const Stick = (props: StickProps) => {
	const color	= createMemo(() => getColorDef(props.color))
	const dotR	= createMemo(() => props.line*DOT_RSCALE+props.line*DOT_LSCALE)
	const m		= createMemo(() => props.line+dotR())
	const angH	= createMemo(() => AbC2h(45,props.r,props.a))
	const angW	= createMemo(() => Math.sqrt((AbC2a(45,props.r,props.a)**2)-(angH()**2)))
	const pathARnode = (a:string, x:number, y:number) => 
		`${a} ${props.ar} ${props.ar} 0 0 1 ${x} ${y}`
	const pathAR = createMemo(() => `
		M ${m()+props.r} ${m()}
		${pathARnode('a',angH(),angW())}
		${pathARnode('A',m()+props.r*2,m()+props.r)}
		${pathARnode('a',-angW(),angH())}
		${pathARnode('A',m()+props.r,m()+props.r*2)}
		${pathARnode('a',-angH(),-angW())}
		${pathARnode('A',m(),m()+props.r)}
		${pathARnode('a',angW(),-angH())}
		${pathARnode('A',m()+props.r,m())}
		Z`)
	const pathLine = createMemo(() => `
		M ${m()+props.r} ${m()}
		l ${angH()} ${angW()}
		L ${m()+props.r*2} ${m()+props.r}
		l ${-angW()} ${angH()}
		L ${m()+props.r} ${m()+props.r*2}
		l ${-angH()} ${-angW()}
		L ${m()} ${m()+props.r}
		l ${angW()} ${-angH()}
		Z`)
	const path = createMemo(() => props.ar > 0 ? pathAR() : pathLine())

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={(props.r+m())*2}
		height={(props.r+m())*2}
		class={`${props.class||''}`}
		style={`margin-left:-${(props.r+m())}px;
			margin-top:-${(props.r+m())}px;
			${props.style||''}`}
		>
		<path
			// bg
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.line*2}
			d={path()}
		/>

		<line
			// bg line v
			class={color().bgOl}
			stroke-width={props.simple?0:props.line/2}
			x1={props.r+m()}
			x2={props.r+m()}
			y1={m()}
			y2={props.r*2+m()}
		/>
		<line
			// bg line h
			class={color().bgOl}
			stroke-width={props.simple?0:props.line/2}
			y1={props.r+m()}
			y2={props.r+m()}
			x1={m()}
			x2={props.r*2+m()}
		/>

		<path
			// outline / button input
			class={`fill-transparent ${props.button ? color().lineOn : color().lineOff}`}
			stroke-width={props.simple ? 0 : props.line}
			d={path()}
		/>

		<line
			// input line
			class={color().detail} // 500 before
			stroke-width={props.line}
			stroke-linecap='round'
			x1={props.r+m()}
			y1={props.r+m()}
			x2={(props.x+1)*props.r+m()}
			y2={(props.y+1)*props.r+m()}
		/>
		<circle
			// input dot
			class={`${color().hl} ${props.simple ? color().hlOl : color().bgOl}`}
			stroke-width={props.simple ? (props.button ? props.line*2*DOT_LSCALE : 0) :
				props.line*DOT_LSCALE}
			cx={(props.x+1)*props.r+m()}
			cy={(props.y+1)*props.r+m()}
			r={dotR()}
		/>
	</svg>
}

export default Stick
