import { InputPickerDef } from './ui'


// BUTTON

export const ButtonInputGroupDef: InputPickerDef = {
	max: 1,
	labels:[]
} as const


// BUTTON GRID

export const ButtonGridInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['top-left','to right'],
} as const


// BUTTON RING

export const ButtonRingInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['right button','clockwise'],
} as const


// DPAD

export const DPadInputGroupDef: InputPickerDef = {
	min: 2,
	labels: ['right button','clockwise'],
} as const


// STICK

export const StickInputGroupDef: InputPickerDef = {
	min: 3,
	max: 3,
	labels: [
		'x-axis',
		'y-axis',
		'button',
	],
} as const


// TRIGGER

export const TriggerInputGroupDef: InputPickerDef = {
	min: 1,
	max: 2,
	labels: [
		'trigger',
		'bumper',
	],
} as const
