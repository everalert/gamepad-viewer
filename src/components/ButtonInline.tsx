import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { deg2rad, ang, mag } from '../helpers/math'


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
	//GCXY,
	//GCZ,
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


export const ButtonInlineMap:{[key:number]:Component<ButtonInlineProps>} = {
	[ButtonShape.Circle]: ButtonInlineCircle,
	[ButtonShape.TriIso]: ButtonInlineTriIso,
	[ButtonShape.TriEqu]: ButtonInlineTriEqu,
	[ButtonShape.Rect]: ButtonInlineRect,
	[ButtonShape.N64C]: ButtonInlineN64C,
}

