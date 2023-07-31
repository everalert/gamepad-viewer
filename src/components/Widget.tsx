import type { GamepadState } from '../types/gamepad'
import type { JSXElement } from 'solid-js';
import type { WidgetContainerDef } from './WidgetContainer'


export enum WidgetType {
	StickCircle		= 0,
	Button			= 1,
	Button2			= 2,
	Button4			= 3,
	DPad			= 4,
	Trigger			= 5,
	//Bmp,
	//Bmp2,
	StickGC			= 6,
	StickN64		= 7,
	StickHori		= 8,
	StickRound		= 9,
	Stick			= 10,
	StickSquare		= 11,
	MAX
}

export interface WidgetDef {
	type: WidgetType;
	x: number;
	y: number;
	rot?: number;
	ax: number[];
	bt: number[];
	val: number[];
	fx?: boolean;
	fy?: boolean;
}

const widgetdef_re =	/W([0-9]+)((?:(?:(?:x|y|a|b|v|r)(?:\-?[0-9]+))|(?:fx|fy))+)/g
const widgetparam_re =	/(?:(x|y|a|b|v|r)(\-?[0-9]+))|(?:fx|fy)/g
export const WIDGET_DFLT = { type:0, x:0, y:0, rot:0, ax:[], bt:[], val:[], fx:false, fy:false }

export const parseWidgetStr = (str:string):WidgetDef[] => {
	const w_out:WidgetDef[] = []
	for (const w of str.matchAll(widgetdef_re)) {
		const w_new:WidgetDef = JSON.parse(JSON.stringify(WIDGET_DFLT))
		w_new.type = Number.parseInt(w[1])
		for (const p of w[2].matchAll(widgetparam_re)) {
			switch(p[0]){
				case 'fx': w_new.fx = true; break;
				case 'fy': w_new.fy = true; break;
				default: {
					switch (p[1]) {
						case 'x': w_new.x = Number.parseInt(p[2]); break;
						case 'y': w_new.y = Number.parseInt(p[2]); break;
						case 'r': w_new.rot = Number.parseInt(p[2]); break;
						case 'a': w_new.ax.push(Number.parseInt(p[2])); break;
						case 'b': w_new.bt.push(Number.parseInt(p[2])); break;
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
		const x = w.x !== WIDGET_DFLT.x ? `x${w.x.toString()}` : ''
		const y = w.y !== WIDGET_DFLT.y ? `y${w.y.toString()}` : ''
		const r = w.rot !== undefined && w.rot !== WIDGET_DFLT.rot ? `r${w.rot.toString()}` : ''
		const ax = w.ax.map(ax=>`a${ax.toString()}`).join('')
		const bt = w.bt.map(bt=>`b${bt.toString()}`).join('')
		const val = w.val.map(val=>`v${val.toString()}`).join('')
		const fx = w.fx ? 'fx' : ''
		const fy = w.fy ? 'fy' : ''
		return `W${w.type.toString()}${x}${y}${r}${ax}${bt}${val}${fx}${fy}`
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

export const Widget = (props: WidgetWrapperProps):JSXElement => <div
	class='absolute origin-top-left'
	style={`
		left:${props.container.w/2+props.widget.x}px;
		top:${props.container.h/2+props.widget.y}px;
		transform:
			${props.widget?.fx ? 'scaleX(-1)' : ''}
			${props.widget?.fy ? 'scaleY(-1)' : ''}
			rotate(${props.widget?.rot||0}deg);
	`}
	>
	{props.children}
</div>
