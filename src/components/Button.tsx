import type { Component } from 'solid-js'
import { Widget, WidgetProps } from './Widget'
import { deg2rad, ang, mag, rotVec2x, rotVec2y } from '../helpers/math'
import { getInputMap } from '../types/gamepad'


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
}

//NOTE: same deal as with widget types,
//don't change values so that codes keep working across revisions
export enum ButtonShape {
	NONE	= 0,
	Circle	= 1,
	TriIso	= 2,
	TriEqu	= 3,
	Rect	= 4,
	//Trapezium,
	N64C	= 5,
	GCXY	= 6,
}


export const ButtonInlineCircle = (props: ButtonInlineProps) => <>
	<circle
		class='opacity-50 fill-black stroke-black'
		stroke-width={props.simple?0:props.w*2}
		cx={props.x}
		cy={props.y}
		r={props.d1}
	/>
	<circle
		class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
		stroke-width={props.simple?0:props.w}
		cx={props.x}
		cy={props.y}
		r={props.d1}
	/>
</>

export const ButtonInlineTriEqu = (props: ButtonInlineProps) => {
	const points = () => [0,1,2].map((k,i) => { return `
		${props.x+props.d1*Math.cos(deg2rad(120*i+props.angle))}
		${props.y+props.d1*Math.sin(deg2rad(120*i+props.angle))}
		` }).join(' ')
	return <>
		<polygon
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineTriIso = (props: ButtonInlineProps) => {
	const a = () => ang(props.d1,props.d2)
	const m = () => mag(props.d1,props.d2)
	const points = () => `
		${props.x+props.d1*Math.cos(deg2rad(props.angle))}
		${props.y+props.d1*Math.sin(deg2rad(props.angle))}
		${props.x+m()*Math.cos(deg2rad(180-a()+props.angle))}
		${props.y+m()*Math.sin(deg2rad(180-a()+props.angle))}
		${props.x+m()*Math.cos(deg2rad(180+a()+props.angle))}
		${props.y+m()*Math.sin(deg2rad(180+a()+props.angle))}
		`
	return <>
		<polygon
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineRect = (props: ButtonInlineProps) => {
	const xx = (d:number) => d*Math.cos(deg2rad(props.angle))
	const xy = (d:number) => d*Math.sin(deg2rad(props.angle))
	const yx = (d:number) => d*Math.cos(deg2rad(props.angle+90))
	const yy = (d:number) => d*Math.sin(deg2rad(props.angle+90))
	const rm = () => Math.min(props.d1,props.d2) * Math.min(props.d3/5,1)
	const d = () => `M ${props.x+xx(props.d1)} ${props.y+xy(props.d1)}
		l ${yx(props.d2-rm())} ${yy(props.d2-rm())}
		q ${yx(rm())} ${yy(rm())}, ${yx(rm())-xx(rm())} ${yy(rm())-xy(rm())}
		l ${-xx(props.d1-rm())*2} ${-xy(props.d1-rm())*2}
		q ${-xx(rm())} ${-xy(rm())}, ${-yx(rm())-xx(rm())} ${-yy(rm())-xy(rm())}
		l ${-yx(props.d2-rm())*2} ${-yy(props.d2-rm())*2}
		q ${-yx(rm())} ${-yy(rm())}, ${-yx(rm())+xx(rm())} ${-yy(rm())+xy(rm())}
		l ${xx(props.d1-rm())*2} ${xy(props.d1-rm())*2}
		q ${xx(rm())} ${xy(rm())}, ${yx(rm())+xx(rm())} ${yy(rm())+xy(rm())}
	Z`
	return <>
		<path
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			d={d()}
		/>
		<path
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.simple?0:props.w} stroke-linejoin='round'
			d={d()}
		/>
	</>
}

const N64C_TRISIZE = 0.65
const N64C_TRISTROKE = 0.65

export const ButtonInlineN64C = (props: ButtonInlineProps) => {
	const points = () => [0,1,2].map((k,i) => { return `
		${props.x+props.d1*N64C_TRISIZE*Math.cos(deg2rad(120*i+props.angle))}
		${props.y+props.d1*N64C_TRISIZE*Math.sin(deg2rad(120*i+props.angle))}
		` }).join(' ')
	return <>
		<circle
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.simple?0:props.w*2}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<circle
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.simple?0:props.w}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<polygon
			class={`${props.simple?'stroke-gray-800':'stroke-gray-300'}
				${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.w*N64C_TRISTROKE} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineGCXY = (props: ButtonInlineProps) => {
	// d1 = main radius
	// d2 = angle spread
	// d3 = thickness (i.e. cap radius)
	const x = () => props.x+props.d1*Math.cos(deg2rad(180+props.angle))
	const y = () => props.y+props.d1*Math.sin(deg2rad(180+props.angle))
	const rv2x = (x:number, y:number) => rotVec2x(x,y,90+props.angle)
	const rv2y = (x:number, y:number) => rotVec2y(x,y,90+props.angle)
	const ox = () => -(props.d1+props.d3)+(props.d1+props.d3)*(1-Math.cos(deg2rad(props.d2/2)))
	const oy = () => -(props.d1+props.d3)+(props.d1+props.d3)*(1-Math.sin(deg2rad(props.d2/2)))
	const ix = () => -(props.d1-props.d3)+(props.d1-props.d3)*(1-Math.cos(deg2rad(props.d2/2)))
	const iy = () => -(props.d1-props.d3)+(props.d1-props.d3)*(1-Math.sin(deg2rad(props.d2/2)))
	const d = () => `M ${x()+rv2x(ox(),oy())} ${y()+rv2y(ox(),oy())}
	A ${props.d1+props.d3} ${props.d1+props.d3} 0 0 1 ${x()+rv2x(ox(),-oy())} ${y()+rv2y(ox(),-oy())}
	A ${props.d3} ${props.d3} 0 0 1 ${x()+rv2x(ix(),-iy())} ${y()+rv2y(ix(),-iy())}
	A ${props.d1-props.d3} ${props.d1-props.d3} 0 0 0 ${x()+rv2x(ix(),iy())} ${y()+rv2y(ix(),iy())}
	A ${props.d3} ${props.d3} 0 0 1 ${x()+rv2x(ox(),oy())} ${y()+rv2y(ox(),oy())}
	Z`
	return <>
		<path
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.simple?0:props.w*2} stroke-linejoin='round'
			d={d()}
		/>
		<path
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
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


export const WButton = (props: WidgetProps) => {
	const d1 = () => props.def.val[1] || 16
	const d2 = () => props.def.val[2] || 16
	const m = () => props.container.line*2
	const w = () => (m()+Math.max(d1(),d2())*2)*2
	const inputs = () => getInputMap(props.pad?.inputs, props.def.inputs)
	const shape = () => ButtonInlineMap[props.def.val[0]] || ButtonInlineMap[ButtonShape.Circle]
	const Btn = shape()
	return <Widget
		widget={props.def} container={props.container}>
		<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
			width={w()}
			height={w()}
			style={`margin-left:-${w()/2}px; margin-top:-${w()/2}px;`}
			>
			<Btn
				x		= { w()/2 }
				y		= { w()/2 }
				on		= { inputs()[0]?.pressed || false }
				d1		= { d1() }
				d2		= { d2() }
				d3		= { props.def.val[3] || 0 }
				angle	= { props.def.val[4] || 0 }
				simple	= { props.def.val[5]>0 || false }
				w		= { props.container.line || 3 }
			/>
		</svg>
	</Widget>
}
