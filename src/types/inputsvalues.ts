import { ValuePickerDef } from './ui'
import { ButtonShape, TriggerSimpleMode } from './inputs'
import { Slider, Checkbox, Dropdown } from '../components/ui'


const ButtonShapeList = Object.keys(ButtonShape)
.filter(k => Number.isInteger(parseInt(k)) && parseInt(k)<ButtonShape.MAX)
.map(k => {
	return { value:parseInt(k), label:ButtonShape[k], faded:parseInt(k)===ButtonShape.NONE }})


// BUTTON

export const ButtonValueDef: ValuePickerDef = {
	defs: [
		{ celement:Dropdown, label:'shape',
			cprops:{ list:ButtonShapeList, width:'w-[6.35rem]', max:ButtonShape.MAX-1 } },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'dimension 3' },
		{ celement:Slider, cprops:{ min:0, max:360, wrap:true, unit:'°' }, label:'rotation' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const


// BUTTON GRID

export const ButtonGridValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
		{ celement:Dropdown, cprops:{ list:ButtonShapeList, width:'w-[6.35rem]' }, label:'shape' },
	],
	repeatLast: true,
} as const

export const ButtonGridShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonGridCircleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonGridRectValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'rounding' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonGridTriangleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonGridN64CValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonGridGCXYValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'columns' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-step' },
		{ celement:Slider, cprops:{ min:0 }, label:'curvature' },
		{ celement:Slider, cprops:{ min:0 }, label:'angle range' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const


// BUTTON RING

export const ButtonRingValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
		{ celement:Checkbox, cprops:{ label:'rotate' }, isBool:true },
		{ celement:Dropdown, cprops:{ list:ButtonShapeList, width:'w-[6.35rem]' }, label:'shape' },
	],
	repeatLast: true,
} as const

export const ButtonRingShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 1' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 2' },
		{ celement:Slider, cprops:{ min:0 }, label:'dimension 3' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonRingCircleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonRingRectValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:Slider, cprops:{ min:0, max:5, stepMove:8 }, label:'rounding' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonRingTriangleValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'x-size' },
		{ celement:Slider, cprops:{ min:0 }, label:'y-size' },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonRingN64CValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const ButtonRingGCXYValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'ring radius' },
		{ celement:Slider, cprops:{ min:0 }, label:'curvature' },
		{ celement:Slider, cprops:{ min:0 }, label:'angle range' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const


// DPAD

export const DPadValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'length' },
		{ celement:Slider, cprops:{ min:0 }, label:'thickness' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const


// STICK

export const StickValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:Slider, cprops:{ min:0, max:90 }, label:'seg angle' },
		{ celement:Slider, cprops:{ min:0 }, label:'seg radius' },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const

export const StickShapeValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{ celement:null },
		{ celement:null },
		{ celement:Checkbox, cprops:{ label:'simple' }, isBool:true },
	],
} as const


// TRIGGER

const SModeList = Object.keys(TriggerSimpleMode)
.filter(k => Number.isInteger(parseInt(k)) && parseInt(k)<TriggerSimpleMode.MAX)
.map(k => {
	return { value:parseInt(k), label:TriggerSimpleMode[k], faded:parseInt(k)===TriggerSimpleMode.NONE }})

export const TriggerValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'height' },
		{ celement:Slider, cprops:{ min:0 }, label:'radius' },
		{
			celement:Dropdown,
			cprops:{
				list:SModeList,
				max:SModeList.length-1,
				width:'w-[6.35rem]'
			},
			label:'simple mode'
		},
	],
} as const

export const TriggerFlatValueDef: ValuePickerDef = {
	defs: [
		{ celement:Slider, cprops:{ min:0 }, label:'height' },
		{ celement:null },
		{
			celement:Dropdown,
			cprops:{
				list:SModeList,
				max:SModeList.length-1,
				width:'w-[6.35rem]'
			},
			label:'simple mode'
		},
	],
} as const
