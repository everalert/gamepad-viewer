import type { GamepadState } from '../types/gamepad'
import type { JSXElement } from 'solid-js';
import type { WidgetContainerDef } from './WidgetContainer'


export enum WidgetType {
	Stk		= 0,
	Btn		= 1,
	Btn2	= 2,
	Btn4	= 3,
	DPd		= 4,
	Trg		= 5,
	//Bmp,
	//Bmp2,
	//StkO,
	//StkR,
	MAX
}

export interface WidgetDef {
	type: WidgetType;
	x: number;
	y: number;
	ax: number[];
	bt: number[];
	val: number[];
	fx?: boolean;
	fy?: boolean;
}

const widgetdef_re =	/W([0-9]+)((?:(?:(?:x|y|a|b|v)(?:\-?[0-9]+))|(?:fx|fy))+)/g
const widgetparam_re =	/(?:(x|y|a|b|v)(\-?[0-9]+))|(?:fx|fy)/g

export const parseWidgetStr = (str: string):WidgetDef[] => {
	const w_out:WidgetDef[] = []
	for (const w of str.matchAll(widgetdef_re)) {
		const w_new:WidgetDef = { type:0, x:0, y:0, ax:[], bt:[], val:[], fx:false, fy:false }
		w_new.type = Number.parseInt(w[1])
		for (const p of w[2].matchAll(widgetparam_re)) {
			switch(p[0]){
				case 'fx': w_new.fx = true; break;
				case 'fy': w_new.fy = true; break;
				default: {
					switch (p[1]) {
						case 'x': w_new.x = Number.parseInt(p[2]); break;
						case 'y': w_new.y = Number.parseInt(p[2]); break;
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
		const ax = w.ax.map(ax=>`a${ax.toString()}`).join('')
		const bt = w.bt.map(bt=>`b${bt.toString()}`).join('')
		const val = w.val.map(val=>`v${val.toString()}`).join('')
		return `W${w.type.toString()}x${w.x.toString()}y${w.y.toString()}${ax}${bt}${val}${w.fx?'fx':''}${w.fy?'fy':''}`
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

export const Widget = (props: WidgetWrapperProps) => <div
	class={`
		absolute
		${ props.widget?.fx && '-scale-x-100' }
		${ props.widget?.fy && '-scale-y-100' }
	`}
	style={`
		${props.widget?.fx?'right':'left'}:
		${props.container.w/2+(props.widget?.fx?-props.widget.x:props.widget.x)}px;
		${props.widget?.fy?'bottom':'top'}:
		${props.container.h/2+(props.widget?.fy?-props.widget.y:props.widget.y)}px;
	`}
	>
	{props.children}
</div>
