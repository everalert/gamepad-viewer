import type { Component } from 'solid-js'


export type InputPickerDef = {
	min?: number;
	max?: number;
	labels?: readonly string[];
}


type BCElem = Component<{value:any;setValFn:(v:boolean)=>void;[key:string]:any}>;
type NCElem = Component<{value:any;setValFn:(v:number)=>void;[key:string]:any}>;

export type ValuePickerDef = {
	defs: readonly {
		label?: string;
		celement: BCElem|NCElem;
		cprops?: {[key:string]:any};
		isBool?: boolean;
	}[];
	repeatLast?: boolean;
}
