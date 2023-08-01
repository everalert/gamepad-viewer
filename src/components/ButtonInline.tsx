import type { Component } from 'solid-js'
import { deg2rad, ang, mag } from '../helpers/math'


interface ButtonInlineProps {
	x: number;
	y: number;
	d1: number;
	d2: number;
	angle: number;
	w: number;
	on: boolean;
}

export enum ButtonShape {
	Circle,
	TriIso,
	TriEqu,
	Rect,
	//Trapezium,
	N64C,
}


export const ButtonInlineCircle = (props: ButtonInlineProps) => <>
	<circle
		class='opacity-50 fill-black stroke-black'
		stroke-width={props.w*2}
		cx={props.x}
		cy={props.y}
		r={props.d1}
	/>
	<circle
		class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
		stroke-width={props.w}
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
			stroke-width={props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.w} stroke-linejoin='round'
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
			stroke-width={props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.w} stroke-linejoin='round'
			points={points()}
		/>
	</>
}

export const ButtonInlineRect = (props: ButtonInlineProps) => {
	const a = () => ang(props.d1,props.d2)
	const m = () => mag(props.d1,props.d2)
	const points = () => [a(),180-a(),180+a(),360-a()].map(v => `
		${props.x+m()*Math.cos(deg2rad(v+props.angle))}
		${props.y+m()*Math.sin(deg2rad(v+props.angle))}
		`).join(' ')
	return <>
		<polygon
			class='opacity-50 fill-black stroke-black'
			stroke-width={props.w*2} stroke-linejoin='round'
			points={points()}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.w} stroke-linejoin='round'
			points={points()}
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
			stroke-width={props.w*2}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<circle
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
			stroke-width={props.w}
			cx={props.x}
			cy={props.y}
			r={props.d1}
		/>
		<polygon
			class={`stroke-gray-300 ${props.on?'fill-white':'fill-transparent'}`}
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

