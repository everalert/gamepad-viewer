import { type Component, createMemo } from 'solid-js'
import { ButtonShape } from '../../types/inputs'
import { deg2rad, ang, mag, rotVec2x, rotVec2y } from '../../helpers/math'
import { Color, getColorDef } from '../../types/colors'


interface ButtonInlineProps {
	x: number;
	y: number;
	d1: number;
	d2: number;
	d3: number;
	simple?: boolean;
	angle: number;
	w: number;
	on: boolean;
	color?: Color;
}


export const ButtonInlineCircle = (props: ButtonInlineProps) => {
	const color = createMemo(() => getColorDef(props.color))
	return <>
		<circle
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<circle
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
	</>
}

export const ButtonInlineTriEqu = (props: ButtonInlineProps) => {
	const color		= createMemo(() => getColorDef(props.color))
	const points	= createMemo(() => [0,1,2].map((k,i) => { return `
		${props.x+props.d1*Math.cos(deg2rad(120*i+props.angle))}
		${props.y+props.d1*Math.sin(deg2rad(120*i+props.angle))}
		` }).join(' '))
	return <>
		<polygon
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineTriIso = (props: ButtonInlineProps) => {
	const color		= createMemo(() => getColorDef(props.color))
	const a			= createMemo(() => ang(props.d1,props.d2))
	const m			= createMemo(() => mag(props.d1,props.d2))
	const points	= createMemo(() => `
		${props.x+props.d1*Math.cos(deg2rad(props.angle))}
		${props.y+props.d1*Math.sin(deg2rad(props.angle))}
		${props.x+m()*Math.cos(deg2rad(180-a()+props.angle))}
		${props.y+m()*Math.sin(deg2rad(180-a()+props.angle))}
		${props.x+m()*Math.cos(deg2rad(180+a()+props.angle))}
		${props.y+m()*Math.sin(deg2rad(180+a()+props.angle))}
		`)
	return <>
		<polygon
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineRect = (props: ButtonInlineProps) => {
	const color	= createMemo(() => getColorDef(props.color))
	const xx	= (d:number) => d*Math.cos(deg2rad(props.angle))
	const xy	= (d:number) => d*Math.sin(deg2rad(props.angle))
	const yx	= (d:number) => d*Math.cos(deg2rad(props.angle+90))
	const yy	= (d:number) => d*Math.sin(deg2rad(props.angle+90))
	const rm	= createMemo(() => Math.min(props.d1,props.d2) * Math.min(props.d3/5,1))
	const d		= createMemo(() => `M ${props.x+xx(props.d1)} ${props.y+xy(props.d1)}
		l ${yx(props.d2-rm())} ${yy(props.d2-rm())}
		q ${yx(rm())} ${yy(rm())}, ${yx(rm())-xx(rm())} ${yy(rm())-xy(rm())}
		l ${-xx(props.d1-rm())*2} ${-xy(props.d1-rm())*2}
		q ${-xx(rm())} ${-xy(rm())}, ${-yx(rm())-xx(rm())} ${-yy(rm())-xy(rm())}
		l ${-yx(props.d2-rm())*2} ${-yy(props.d2-rm())*2}
		q ${-yx(rm())} ${-yy(rm())}, ${-yx(rm())+xx(rm())} ${-yy(rm())+xy(rm())}
		l ${xx(props.d1-rm())*2} ${xy(props.d1-rm())*2}
		q ${xx(rm())} ${xy(rm())}, ${yx(rm())+xx(rm())} ${yy(rm())+xy(rm())}
	Z`)
	return <>
		<path
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			d={d()}
		/>
		<path
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			d={d()}
		/>
	</>
}

const N64C_TRISIZE = 0.65
const N64C_TRISTROKE = 0.65

export const ButtonInlineN64C = (props: ButtonInlineProps) => {
	const color		= createMemo(() => getColorDef(props.color))
	const points	= createMemo(() => [0,1,2].map((k,i) => { return `
		${props.x+props.d1*N64C_TRISIZE*Math.cos(deg2rad(120*i+props.angle))}
		${props.y+props.d1*N64C_TRISIZE*Math.sin(deg2rad(120*i+props.angle))}
		` }).join(' '))
	return <>
		<circle
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<circle
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<polygon
			class={`opacity-50 ${props.simple ? color().sDetail : color().detail} fill-transparent`}
			stroke-width={props.w*N64C_TRISTROKE} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineGCXY = (props: ButtonInlineProps) => {
	// d1 = main radius
	// d2 = angle spread
	// d3 = thickness (i.e. cap radius)
	const color = createMemo(() => getColorDef(props.color))
	const x		= createMemo(() => props.x+props.d1*Math.cos(deg2rad(180+props.angle)))
	const y		= createMemo(() => props.y+props.d1*Math.sin(deg2rad(180+props.angle)))
	const rv2x	= (x:number, y:number) => rotVec2x(x,y,90+props.angle)
	const rv2y	= (x:number, y:number) => rotVec2y(x,y,90+props.angle)
	const ox	= createMemo(() =>
		-(props.d1+props.d3)+(props.d1+props.d3)*(1-Math.cos(deg2rad(props.d2/2))))
	const oy	= createMemo(() =>
		-(props.d1+props.d3)+(props.d1+props.d3)*(1-Math.sin(deg2rad(props.d2/2))))
	const ix	= createMemo(() =>
		-(props.d1-props.d3)+(props.d1-props.d3)*(1-Math.cos(deg2rad(props.d2/2))))
	const iy	= createMemo(() =>
		-(props.d1-props.d3)+(props.d1-props.d3)*(1-Math.sin(deg2rad(props.d2/2))))
	const d		= createMemo(() => `M ${x()+rv2x(ox(),oy())} ${y()+rv2y(ox(),oy())}
	A ${props.d1+props.d3} ${props.d1+props.d3} 0 0 1 ${x()+rv2x(ox(),-oy())} ${y()+rv2y(ox(),-oy())}
	A ${props.d3} ${props.d3} 0 0 1 ${x()+rv2x(ix(),-iy())} ${y()+rv2y(ix(),-iy())}
	A ${props.d1-props.d3} ${props.d1-props.d3} 0 0 0 ${x()+rv2x(ix(),iy())} ${y()+rv2y(ix(),iy())}
	A ${props.d3} ${props.d3} 0 0 1 ${x()+rv2x(ox(),oy())} ${y()+rv2y(ox(),oy())}
	Z`)
	return <>
		<path
			class={`opacity-50 ${props.simple ?
				`${color().sBg} ${color().sBgOl}` : `${color().bg} ${color().bgOl}`}`}
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			d={d()}
		/>
		<path
			class={`${color().ol} ${props.on ? color().hl : 'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			d={d()}
		/>
	</>
}


export const ButtonInlineMap:{[key:number]:Component<ButtonInlineProps>} = {
	[ButtonShape.Circle]: ButtonInlineCircle,
	[ButtonShape.TriIso]: ButtonInlineTriIso,
	[ButtonShape.TriEqu]: ButtonInlineTriEqu,
	[ButtonShape.Rect]: ButtonInlineRect,
	[ButtonShape.N64C]: ButtonInlineN64C,
	[ButtonShape.GCXY]: ButtonInlineGCXY,
}
