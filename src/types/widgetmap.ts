import type { Component } from 'solid-js'
import { WidgetType } from './widget'
import { InputPickerDef, ValuePickerDef } from './ui'
import * as Widget from '../components/widgets'
import * as InputValue from './inputsvalues'
import * as InputGroup from './inputsgroups'

export const WidgetTypeMap:{[key:number]:Component} = {
	[WidgetType.StickCircle]:			Widget.WStickCircle,
	[WidgetType.StickSquare]:			Widget.WStickSquare,
	[WidgetType.StickGC]:				Widget.WStickGC,
	[WidgetType.StickN64]:				Widget.WStickN64,
	[WidgetType.StickHori]:				Widget.WStickHori,
	[WidgetType.StickRound]:			Widget.WStickRound,
	[WidgetType.Stick]:					Widget.WStick,
	[WidgetType.Button]:				Widget.WButton,
	[WidgetType.ButtonRing]:			Widget.WButtonRing,
	[WidgetType.ButtonRingCircle]:		Widget.WButtonRingCircle,
	[WidgetType.ButtonRingRect]:		Widget.WButtonRingRect,
	[WidgetType.ButtonRingTriangle]:	Widget.WButtonRingTriangle,
	[WidgetType.ButtonRingN64C]:		Widget.WButtonRingN64C,
	[WidgetType.ButtonRingGCXY]:		Widget.WButtonRingGCXY,
	[WidgetType.ButtonGrid]:			Widget.WButtonGrid,
	[WidgetType.ButtonGridCircle]:		Widget.WButtonGridCircle,
	[WidgetType.ButtonGridRect]:		Widget.WButtonGridRect,
	[WidgetType.ButtonGridTriangle]:	Widget.WButtonGridTriangle,
	[WidgetType.ButtonGridN64C]:		Widget.WButtonGridN64C,
	[WidgetType.ButtonGridGCXY]:		Widget.WButtonGridGCXY,
	[WidgetType.DPad]:					Widget.WDPad,
	[WidgetType.Trigger]:				Widget.WTrigger,
	[WidgetType.TriggerCurved]:			Widget.WTriggerCurved,
	[WidgetType.TriggerFlat]:			Widget.WTriggerFlat,
} as const

export const WidgetInputDefMap:{[key:number]:InputPickerDef} = {
	[WidgetType.StickCircle]:			InputGroup.StickInputGroupDef,
	[WidgetType.StickSquare]:			InputGroup.StickInputGroupDef,
	[WidgetType.StickGC]:				InputGroup.StickInputGroupDef,
	[WidgetType.StickN64]:				InputGroup.StickInputGroupDef,
	[WidgetType.StickHori]:				InputGroup.StickInputGroupDef,
	[WidgetType.StickRound]:			InputGroup.StickInputGroupDef,
	[WidgetType.Stick]:					InputGroup.StickInputGroupDef,
	[WidgetType.Button]:				InputGroup.ButtonInputGroupDef,
	[WidgetType.ButtonRing]:			InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonRingCircle]:		InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonRingRect]:		InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonRingTriangle]:	InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonRingN64C]:		InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonRingGCXY]:		InputGroup.ButtonRingInputGroupDef,
	[WidgetType.ButtonGrid]:			InputGroup.ButtonGridInputGroupDef,
	[WidgetType.ButtonGridCircle]:		InputGroup.ButtonGridInputGroupDef,
	[WidgetType.ButtonGridRect]:		InputGroup.ButtonGridInputGroupDef,
	[WidgetType.ButtonGridTriangle]:	InputGroup.ButtonGridInputGroupDef,
	[WidgetType.ButtonGridN64C]:		InputGroup.ButtonGridInputGroupDef,
	[WidgetType.ButtonGridGCXY]:		InputGroup.ButtonGridInputGroupDef,
	[WidgetType.DPad]:					InputGroup.DPadInputGroupDef,
	[WidgetType.Trigger]:				InputGroup.TriggerInputGroupDef,
	[WidgetType.TriggerCurved]:			InputGroup.TriggerInputGroupDef,
	[WidgetType.TriggerFlat]:			InputGroup.TriggerInputGroupDef,
} as const

export const WidgetValueDefMap:{[key:number]:ValuePickerDef} = {
	[WidgetType.StickCircle]:			InputValue.StickShapeValueDef,
	[WidgetType.StickSquare]:			InputValue.StickShapeValueDef,
	[WidgetType.StickGC]:				InputValue.StickShapeValueDef,
	[WidgetType.StickN64]:				InputValue.StickShapeValueDef,
	[WidgetType.StickHori]:				InputValue.StickShapeValueDef,
	[WidgetType.StickRound]:			InputValue.StickShapeValueDef,
	[WidgetType.Stick]:					InputValue.StickValueDef,
	[WidgetType.Button]:				InputValue.ButtonValueDef,
	[WidgetType.ButtonRing]:			InputValue.ButtonRingValueDef,
	[WidgetType.ButtonRingCircle]:		InputValue.ButtonRingCircleValueDef,
	[WidgetType.ButtonRingRect]:		InputValue.ButtonRingRectValueDef,
	[WidgetType.ButtonRingTriangle]:	InputValue.ButtonRingTriangleValueDef,
	[WidgetType.ButtonRingN64C]:		InputValue.ButtonRingN64CValueDef,
	[WidgetType.ButtonRingGCXY]:		InputValue.ButtonRingGCXYValueDef,
	[WidgetType.ButtonGrid]:			InputValue.ButtonGridValueDef,
	[WidgetType.ButtonGridCircle]:		InputValue.ButtonGridCircleValueDef,
	[WidgetType.ButtonGridRect]:		InputValue.ButtonGridRectValueDef,
	[WidgetType.ButtonGridTriangle]:	InputValue.ButtonGridTriangleValueDef,
	[WidgetType.ButtonGridN64C]:		InputValue.ButtonGridN64CValueDef,
	[WidgetType.ButtonGridGCXY]:		InputValue.ButtonGridGCXYValueDef,
	[WidgetType.DPad]:					InputValue.DPadValueDef,
	[WidgetType.Trigger]:				InputValue.TriggerValueDef,
	[WidgetType.TriggerCurved]:			InputValue.TriggerValueDef,
	[WidgetType.TriggerFlat]:			InputValue.TriggerFlatValueDef,
} as const
