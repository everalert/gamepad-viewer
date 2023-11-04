import { GamepadInputType } from '../types/gamepad'
import type { JSX } from 'solid-js';
import type { WidgetDef, WidgetContainerDef } from '../types/widget'


const widgetdef_re =	/W([0-9]+)((?:(?:(?:x|y|a|b|v|r|c)(?:\-?[0-9]+))|(?:fx|fy|h|k))+)/g
const widgetparam_re =	/(?:(x|y|a|b|v|r|c)(\-?[0-9]+))|(?:fx|fy|h|k)/g
export const WIDGET_DFLT: WidgetDef =
	{ type:0, x:0, y:0, rot:0, inputs:[], val:[], fx:false, fy:false, hide:false }

export const parseWidgetStr = (str:string):WidgetDef[] => {
	const w_out:WidgetDef[] = []
	if (!str) return w_out
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
						case 'c': w_new.color = Number.parseInt(p[2]); break;
						case 'v': w_new.val.push(Number.parseInt(p[2])); break;
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
		const c = w.color > 0 ? `c${Math.round(w.color).toString()}` : ''
		const r = w.rot !== undefined && w.rot !== WIDGET_DFLT.rot ?
			`r${Math.round(w.rot).toString()}` : ''
		const inputs = w.inputs.map(i => `${i.type>=0 ?
			`${i.type===GamepadInputType.Axis?'a':'b'}${Math.round(i.index).toString()}` :
			'k'}`).join('')
		const val = w.val.map(val=>`v${Math.round(val).toString()}`).join('')
		const fx = w.fx ? 'fx' : ''
		const fy = w.fy ? 'fy' : ''
		const hide = w.hide ? 'h' : ''
		return `W${w.type.toString()}${x}${y}${r}${c}${inputs}${val}${fx}${fy}${hide}`
	}).join('|')
}


export interface WidgetWrapperProps {
	widget: WidgetDef;
	container: WidgetContainerDef;
	children: JSX.Element;
}

export interface WidgetProps {
	def: WidgetDef;
	container: WidgetContainerDef;
}

export const Widget = (props: WidgetWrapperProps):JSX.Element => {
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

