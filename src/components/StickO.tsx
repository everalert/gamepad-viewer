import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'
import { AbC2a, AbC2h } from '../helpers/math'

interface StickOProps {
	x: number;
	y: number;
	button?: boolean;
	r: number;
	a: number;
	ar: number;
	line: number;
	class?: string;
	style?: string;
}

const DOT_RSCALE = 1.25	// radius
const DOT_LSCALE = 0.6	// line
const OCT_N = 'StickOct'

const StickO = (props: StickOProps) => {
	const octname = () => `${OCT_N}_${props.r}_${props.a}_${props.ar}`
	const dotR = () => props.line*DOT_RSCALE+props.line*DOT_LSCALE
	const m = () => props.line+dotR()
	const angH = () => AbC2h(45,props.r,props.a)
	const angW = () => Math.sqrt((AbC2a(45,props.r,props.a)**2)-(angH()**2))
	const pathAR = (a:string, x:number, y:number) => 
		`${a} ${props.ar} ${props.ar} 0 0 1 ${x} ${y}`
	
	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={(props.r+m())*2}
		height={(props.r+m())*2}
		class={`${props.class||''}`}
		style={`margin-left:-${(props.r+m())}px;
margin-top:-${(props.r+m())}px;
${props.style||''}`}
		>
		<defs>
			<symbol id={octname()}>
				<path
					// outline
					d={ props.ar > 0 ? `
						M ${m()+props.r} ${m()}
						${pathAR('a',angH(),angW())}
						${pathAR('A',m()+props.r*2,m()+props.r)}
						${pathAR('a',-angW(),angH())}
						${pathAR('A',m()+props.r,m()+props.r*2)}
						${pathAR('a',-angH(),-angW())}
						${pathAR('A',m(),m()+props.r)}
						${pathAR('a',angW(),-angH())}
						${pathAR('A',m()+props.r,m())}
						Z
					` : `
						M ${m()+props.r} ${m()}
						l ${angH()} ${angW()}
						L ${m()+props.r*2} ${m()+props.r}
						l ${-angW()} ${angH()}
						L ${m()+props.r} ${m()+props.r*2}
						l ${-angH()} ${-angW()}
						L ${m()} ${m()+props.r}
						l ${angW()} ${-angH()}
						Z
					`}
				/>
			</symbol>
		</defs>

		<use
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.line*2}
			href={`#${octname()}`}
		/>
		<line
			class='stroke-gray-900'
			stroke-width={props.line/2}
			x1={props.r+m()}
			x2={props.r+m()}
			y1={m()}
			y2={props.r*2+m()}
		/>
		<line
			class='stroke-gray-900'
			stroke-width={props.line/2}
			y1={props.r+m()}
			y2={props.r+m()}
			x1={m()}
			x2={props.r*2+m()}
		/>
		<use
			class={`fill-transparent ${props.button?'stroke-gray-300':'stroke-gray-800'}`}
			stroke-width={props.line}
			href={`#${octname()}`}
		/>

		<circle
			class='fill-gray-500'
			cx={props.r+m()}
			cy={props.r+m()}
			r={props.line/2}
		/>
		<line
			class={`stroke-gray-500`}
			stroke-width={props.line}
			x1={props.r+m()}
			y1={props.r+m()}
			x2={(props.x+1)*props.r+m()}
			y2={(props.y+1)*props.r+m()}
		/>
		<circle
			class='fill-white stroke-black'
			stroke-width={props.line*DOT_LSCALE}
			cx={(props.x+1)*props.r+m()}
			cy={(props.y+1)*props.r+m()}
			r={dotR()}
		/>
	</svg>
}

export const WStickO = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<StickO
		x={props.pad?.axes[props.def.ax[0]]||0}
		y={props.pad?.axes[props.def.ax[1]]||0}
		button={props.pad?.buttonPress[props.def.bt[0]]||false}
		r={props.def.val[0]>0?props.def.val[0]:48}
		a={props.def.val[1]>0?props.def.val[1]:67.5} // N64=75, Hori=73 (TODO: confirm from notes)
		ar={props.def.val[2]>0?props.def.val[2]:0}
		line={props.container.line||3}
	/>	
</Widget>

export default StickO;