import type { GamepadState, GamepadInputDef } from '../types/gamepad'
import { GamepadInputType } from '../types/gamepad'
import type { JSXElement, Component } from 'solid-js';
import type { WidgetContainerDef } from './containers/WidgetContainer'
import type { InputPickerDef, ValuePickerDef } from './ui'
import { 
	WStick, WStickCircle, WStickSquare, WStickGC, WStickN64, WStickHori, WStickRound,
	WButtonRing, WButtonRingCircle, WButtonRingRect, WButtonRingTriangle,
	WButtonRingN64C, WButtonRingGCXY,
	WButtonGrid, WButtonGridCircle, WButtonGridRect, WButtonGridTriangle,
	WButtonGridN64C, WButtonGridGCXY,
	WButton, WDPad, WTrigger, WTriggerCurved, WTriggerFlat,
	StickInputGroupDef, ButtonInputGroupDef, ButtonGridInputGroupDef, ButtonRingInputGroupDef,
	DPadInputGroupDef, TriggerInputGroupDef,
	ButtonValueDef, DPadValueDef,
	ButtonRingValueDef,
	ButtonRingCircleValueDef, ButtonRingRectValueDef, ButtonRingTriangleValueDef, ButtonRingN64CValueDef, ButtonRingGCXYValueDef,
	ButtonGridValueDef, ButtonGridShapeValueDef,
	ButtonGridCircleValueDef, ButtonGridRectValueDef, ButtonGridTriangleValueDef, ButtonGridN64CValueDef, ButtonGridGCXYValueDef,
	StickValueDef, StickShapeValueDef,
	TriggerValueDef, TriggerFlatValueDef,
} from './inputs'


// NOTE: keep hardcoded values the same 
// so that URI strings are generated the same way across versions
export enum WidgetType {
	StickCircle			= 0,
	ButtonRingCircle	= 1,
	DPad				= 4,
	TriggerCurved		= 5,
	StickGC				= 6,
	StickN64			= 7,
	StickHori			= 8,
	StickRound			= 9,
	Stick				= 10,
	StickSquare			= 11,
	TriggerFlat			= 12,
	Trigger				= 13,
	ButtonRing			= 14,
	ButtonRingRect		= 15,
	ButtonRingTriangle	= 16,
	ButtonRingN64C		= 17,
	ButtonGrid			= 18,
	ButtonGridCircle	= 19,
	ButtonGridRect		= 20,
	ButtonGridTriangle	= 21,
	ButtonGridN64C		= 22,
	ButtonRingGCXY		= 23,
	ButtonGridGCXY		= 24,
	Button				= 25,
	MAX
}

export interface WidgetDef {
	type: WidgetType;
	x: number;
	y: number;
	rot?: number;
	inputs: GamepadInputDef[];
	val: number[];
	fx?: boolean;
	fy?: boolean;
	hide?: boolean;
}

const widgetdef_re =	/W([0-9]+)((?:(?:(?:x|y|a|b|v|r)(?:\-?[0-9]+))|(?:fx|fy|h|k))+)/g
const widgetparam_re =	/(?:(x|y|a|b|v|r)(\-?[0-9]+))|(?:fx|fy|h|k)/g
export const WIDGET_DFLT: WidgetDef =
	{ type:0, x:0, y:0, rot:0, inputs:[], val:[], fx:false, fy:false, hide:false }

export const parseWidgetStr = (str:string):WidgetDef[] => {
	const w_out:WidgetDef[] = []
	for (const w of str.matchAll(widgetdef_re)) {
		const w_new:WidgetDef = JSON.parse(JSON.stringify(WIDGET_DFLT))
		w_new.type = Number.parseInt(w[1])
		for (const p of w[2].matchAll(widgetparam_re)) {
			switch(p[0]){
				case 'fx': w_new.fx = true; break;
				case 'fy': w_new.fy = true; break;
				case 'h': w_new.hide = true; break;
				case 'k': w_new.inputs.push({ type:GamepadInputType.BLANK, index:0 }); break;
				default: {
					switch (p[1]) {
						case 'x': w_new.x = Number.parseInt(p[2]); break;
						case 'y': w_new.y = Number.parseInt(p[2]); break;
						case 'r': w_new.rot = Number.parseInt(p[2]); break;
						case 'a':
							w_new.inputs.push({
								type:GamepadInputType.Axis,
								index:Number.parseInt(p[2])
							});
							break;
						case 'b':
							w_new.inputs.push({
								type:GamepadInputType.Button,
								index:Number.parseInt(p[2])
							});
							break;
						case 'v': w_new.val.push(Number.parseInt(p[2])); break;
					}
				}
			}
		}
		w_out.push(w_new)
	}
	return w_out
}

export const genWidgetStr = (widgets:WidgetDef[]):string => {
	return widgets.map(w => {
		const x = w.x !== WIDGET_DFLT.x ? `x${Math.round(w.x).toString()}` : ''
		const y = w.y !== WIDGET_DFLT.y ? `y${Math.round(w.y).toString()}` : ''
		const r = w.rot !== undefined && w.rot !== WIDGET_DFLT.rot ?
			`r${Math.round(w.rot).toString()}` : ''
		const inputs = w.inputs.map(i => `${i.type>=0 ?
			`${i.type===GamepadInputType.Axis?'a':'b'}${Math.round(i.index).toString()}` :
			'k'}`).join('')
		const val = w.val.map(val=>`v${Math.round(val).toString()}`).join('')
		const fx = w.fx ? 'fx' : ''
		const fy = w.fy ? 'fy' : ''
		const hide = w.hide ? 'h' : ''
		return `W${w.type.toString()}${x}${y}${r}${inputs}${val}${fx}${fy}${hide}`
	}).join('|')
}


export interface WidgetWrapperProps {
	widget: WidgetDef;
	container: WidgetContainerDef;
	children: JSXElement;
}

export interface WidgetProps {
	pad: GamepadState;
	def: WidgetDef;
	container: WidgetContainerDef;
}

export const Widget = (props: WidgetWrapperProps):JSXElement => {
	const rot = () => props.widget?.rot||0
	const fx = () => props.widget?.fx
	const fy = () => props.widget?.fy
	return <div
		class='absolute origin-top-left'
		style={`
			left:${props.container.w/2+props.widget.x}px;
			top:${props.container.h/2+props.widget.y}px;
			transform:
				${fx() ? 'scaleX(-1)' : ''}
				${fy() ? 'scaleY(-1)' : ''}
				rotate(${rot()?( (fx()?!fy():fy())?-rot():rot() ):0}deg);
		`}
		>
		{props.children}
	</div>
}

export const WidgetTypeMap:{[key:number]:Component<WidgetProps>} = {
	[WidgetType.StickCircle]:			WStickCircle,
	[WidgetType.StickSquare]:			WStickSquare,
	[WidgetType.StickGC]:				WStickGC,
	[WidgetType.StickN64]:				WStickN64,
	[WidgetType.StickHori]:				WStickHori,
	[WidgetType.StickRound]:			WStickRound,
	[WidgetType.Stick]:					WStick,
	[WidgetType.Button]:				WButton,
	[WidgetType.ButtonRing]:			WButtonRing,
	[WidgetType.ButtonRingCircle]:		WButtonRingCircle,
	[WidgetType.ButtonRingRect]:		WButtonRingRect,
	[WidgetType.ButtonRingTriangle]:	WButtonRingTriangle,
	[WidgetType.ButtonRingN64C]:		WButtonRingN64C,
	[WidgetType.ButtonRingGCXY]:		WButtonRingGCXY,
	[WidgetType.ButtonGrid]:			WButtonGrid,
	[WidgetType.ButtonGridCircle]:		WButtonGridCircle,
	[WidgetType.ButtonGridRect]:		WButtonGridRect,
	[WidgetType.ButtonGridTriangle]:	WButtonGridTriangle,
	[WidgetType.ButtonGridN64C]:		WButtonGridN64C,
	[WidgetType.ButtonGridGCXY]:		WButtonGridGCXY,
	[WidgetType.DPad]:					WDPad,
	[WidgetType.Trigger]:				WTrigger,
	[WidgetType.TriggerCurved]:			WTriggerCurved,
	[WidgetType.TriggerFlat]:			WTriggerFlat,
} as const

export const WidgetInputDefMap:{[key:number]:InputPickerDef} = {
	[WidgetType.StickCircle]:			StickInputGroupDef,
	[WidgetType.StickSquare]:			StickInputGroupDef,
	[WidgetType.StickGC]:				StickInputGroupDef,
	[WidgetType.StickN64]:				StickInputGroupDef,
	[WidgetType.StickHori]:				StickInputGroupDef,
	[WidgetType.StickRound]:			StickInputGroupDef,
	[WidgetType.Stick]:					StickInputGroupDef,
	[WidgetType.Button]:				ButtonInputGroupDef,
	[WidgetType.ButtonRing]:			ButtonRingInputGroupDef,
	[WidgetType.ButtonRingCircle]:		ButtonRingInputGroupDef,
	[WidgetType.ButtonRingRect]:		ButtonRingInputGroupDef,
	[WidgetType.ButtonRingTriangle]:	ButtonRingInputGroupDef,
	[WidgetType.ButtonRingN64C]:		ButtonRingInputGroupDef,
	[WidgetType.ButtonRingGCXY]:		ButtonRingInputGroupDef,
	[WidgetType.ButtonGrid]:			ButtonGridInputGroupDef,
	[WidgetType.ButtonGridCircle]:		ButtonGridInputGroupDef,
	[WidgetType.ButtonGridRect]:		ButtonGridInputGroupDef,
	[WidgetType.ButtonGridTriangle]:	ButtonGridInputGroupDef,
	[WidgetType.ButtonGridN64C]:		ButtonGridInputGroupDef,
	[WidgetType.ButtonGridGCXY]:		ButtonGridInputGroupDef,
	[WidgetType.DPad]:					DPadInputGroupDef,
	[WidgetType.Trigger]:				TriggerInputGroupDef,
	[WidgetType.TriggerCurved]:			TriggerInputGroupDef,
	[WidgetType.TriggerFlat]:			TriggerInputGroupDef,
} as const

export const WidgetValueDefMap:{[key:number]:ValuePickerDef} = {
	[WidgetType.StickCircle]:			StickShapeValueDef,
	[WidgetType.StickSquare]:			StickShapeValueDef,
	[WidgetType.StickGC]:				StickShapeValueDef,
	[WidgetType.StickN64]:				StickShapeValueDef,
	[WidgetType.StickHori]:				StickShapeValueDef,
	[WidgetType.StickRound]:			StickShapeValueDef,
	[WidgetType.Stick]:					StickValueDef,
	[WidgetType.Button]:				ButtonValueDef,
	[WidgetType.ButtonRing]:			ButtonRingValueDef,
	[WidgetType.ButtonRingCircle]:		ButtonRingCircleValueDef,
	[WidgetType.ButtonRingRect]:		ButtonRingRectValueDef,
	[WidgetType.ButtonRingTriangle]:	ButtonRingTriangleValueDef,
	[WidgetType.ButtonRingN64C]:		ButtonRingN64CValueDef,
	[WidgetType.ButtonRingGCXY]:		ButtonRingGCXYValueDef,
	[WidgetType.ButtonGrid]:			ButtonGridValueDef,
	[WidgetType.ButtonGridCircle]:		ButtonGridCircleValueDef,
	[WidgetType.ButtonGridRect]:		ButtonGridRectValueDef,
	[WidgetType.ButtonGridTriangle]:	ButtonGridTriangleValueDef,
	[WidgetType.ButtonGridN64C]:		ButtonGridN64CValueDef,
	[WidgetType.ButtonGridGCXY]:		ButtonGridGCXYValueDef,
	[WidgetType.DPad]:					DPadValueDef,
	[WidgetType.Trigger]:				TriggerValueDef,
	[WidgetType.TriggerCurved]:			TriggerValueDef,
	[WidgetType.TriggerFlat]:			TriggerFlatValueDef,
} as const
