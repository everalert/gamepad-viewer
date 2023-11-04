import type { GamepadInputDef } from '../types/gamepad'
import { Color } from './colors'


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
	color?: Color;
}

export interface WidgetContainerDef {
	w: number;
	h: number;
	m: number;
	line: number;
	color?: Color;
}
