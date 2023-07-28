import type { JSXElement } from 'solid-js'
import { Widget, WidgetProps } from './Widget'


interface DPadProps {
	down: boolean;
	right: boolean;
	left: boolean;
	up: boolean;
	length: number;
	thickness: number;
	line: number;
	class?: string;
	style?: string;
}

const RADIUS_FACTOR = 0.30  // original design = 8px/28px = 0.285


const DPad = (props: DPadProps) => {
	const genUniqueStr = (b:string) => `${b}_${props.length}_${props.thickness}_${props.line}`
	const rad = () => props.thickness*RADIUS_FACTOR
	const line = () => props.line
	const iEdge = () => (props.length-props.thickness)/2
	const iEdgeR = () => (props.length-props.thickness)/2-rad()
	const iEdgeLng = () => (props.length+props.thickness)/2
	const oEdge = () => props.thickness
	const oEdgeR = () => props.thickness-rad()*2

	return <svg
		version='1.1' xmlns='http://www.w3.org/2000/svg'
		width={props.length+line()*2}
		height={props.length+line()*2}
		class={`${props.class||''}`}
		style={`margin-left:-${(props.length)/2+line()}px;
margin-top:-${(props.length)/2+line()}px;
${props.style||''}`}
		>
		<defs>
			<clipPath id={genUniqueStr('DPadClipU')}>
				<rect
					x={iEdge()+line()} y={line()}
					width={oEdge()} height={props.length-iEdgeLng()}
				/>
			</clipPath>
			<clipPath id={genUniqueStr('DPadClipL')}>
				<rect
					x={line()} y={iEdge()+line()}
					width={props.length-iEdgeLng()} height={oEdge()}
				/>
			</clipPath>
			<clipPath id={genUniqueStr('DPadClipD')}>
				<rect
					x={iEdge()+line()} y={iEdgeLng()+line()}
					width={oEdge()} height={props.length-iEdgeLng()}
				/>
			</clipPath>
			<clipPath id={genUniqueStr('DPadClipR')}>
				<rect
					x={iEdgeLng()+line()} y={iEdge()+line()}
					width={props.length-iEdgeLng()} height={oEdge()}
				/>
			</clipPath>
			<symbol id={genUniqueStr('DPadBaseShape')}>
				<path d={`M ${line()+iEdge()+rad()} ${line()}
h ${oEdgeR()}
q ${rad()} ${0}, ${rad()} ${rad()} 
v ${iEdgeR()}
h ${iEdgeR()}
q ${rad()} ${0}, ${rad()} ${rad()} 
v ${oEdgeR()}
q ${0} ${rad()}, ${-rad()} ${rad()} 
h ${-iEdgeR()}
v ${iEdgeR()}
q ${0} ${rad()}, ${-rad()} ${rad()} 
h ${-oEdgeR()}
q ${-rad()} ${0}, ${-rad()} ${-rad()} 
v ${-iEdgeR()}
h ${-iEdgeR()}
q ${-rad()} ${0}, ${-rad()} ${-rad()} 
v ${-oEdgeR()}
q ${0} ${-rad()}, ${rad()} ${-rad()} 
h ${iEdgeR()}
v ${-iEdgeR()}
q ${0} ${-rad()}, ${rad()} ${-rad()} 
Z
				`} />
			</symbol>
			<symbol id={genUniqueStr('DPadBaseShapeThicc')}>
				<path d={`M ${line()+iEdge()+rad()} ${0}
h ${oEdgeR()}
q ${rad()+line()} ${0}, ${rad()+line()} ${rad()+line()} 
v ${iEdgeR()-line()}
h ${iEdgeR()-line()}
q ${rad()+line()} ${0}, ${rad()+line()} ${rad()+line()} 
v ${oEdgeR()}
q ${0} ${rad()+line()}, ${-rad()-line()} ${rad()+line()} 
h ${-iEdgeR()+line()}
v ${iEdgeR()-line()}
q ${0} ${rad()+line()}, ${-rad()-line()} ${rad()+line()} 
h ${-oEdgeR()}
q ${-rad()-line()} ${0}, ${-rad()-line()} ${-rad()-line()} 
v ${-iEdgeR()+line()}
h ${-iEdgeR()+line()}
q ${-rad()-line()} ${0}, ${-rad()-line()} ${-rad()-line()} 
v ${-oEdgeR()}
q ${0} ${-rad()-line()}, ${rad()+line()} ${-rad()-line()} 
h ${iEdgeR()-line()}
v ${-iEdgeR()+line()}
q ${0} ${-rad()-line()}, ${rad()+line()} ${-rad()-line()} 
Z
				`} />
			</symbol>
		</defs>

		<use
			class='fill-black/[0.5]'
			href={genUniqueStr('#DPadBaseShapeThicc')}
		/>
		<g class='fill-transparent'>
			<use class={props.up?'fill-white':''}
				href={genUniqueStr('#DPadBaseShape')}
				clip-path={`url(${genUniqueStr('#DPadClipU')})`} />
			<use class={props.down?'fill-white':''}
				href={genUniqueStr('#DPadBaseShape')}
				clip-path={`url(${genUniqueStr('#DPadClipD')})`} />
			<use class={props.left?'fill-white':''}
				href={genUniqueStr('#DPadBaseShape')}
				clip-path={`url(${genUniqueStr('#DPadClipL')})`} />
			<use class={props.right?'fill-white':''}
				href={genUniqueStr('#DPadBaseShape')}
				clip-path={`url(${genUniqueStr('#DPadClipR')})`} />
		</g>
		<use
			class='stroke-gray-300 fill-transparent'
			stroke-width={line()}
			href={genUniqueStr('#DPadBaseShape')}
		/>
	</svg>
}

export const WDPad = (props: WidgetProps): JSXElement => <Widget
	widget={props.def} container={props.container}>
	<DPad
		down=		{props.pad?.buttonPress[props.def.bt[0]]||false}
		right=		{props.pad?.buttonPress[props.def.bt[1]]||false}
		left=		{props.pad?.buttonPress[props.def.bt[2]]||false}
		up=			{props.pad?.buttonPress[props.def.bt[3]]||false}
		length=		{props.def.val[0]||80}
		thickness=	{props.def.val[1]||28}
		line=		{props.container.line||3}
	/>
</Widget>

export default DPad;
