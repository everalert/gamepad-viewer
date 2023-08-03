export enum GamepadInputType {
	Axis,
	Button,
}

export type GamepadInputDef = {
	type: GamepadInputType; 
	index: number;
}

export const inputDef = (t:GamepadInputType,i:number):GamepadInputDef =>
	{ return {type:t,index:i} }

export class GamepadInput {
	type: GamepadInputType; 
	index: number;
	axis: number;
	button: boolean;

	constructor(type:GamepadInputType, index:number, axis:number, button?:boolean) {
		this.init(type, index, axis, button)	
	}

	init(type:GamepadInputType, index:number, axis:number, button?:boolean) {
		this.type = type
		this.index = index
		this.axis = axis
		this.button = button===true
	}
	
	get ascalar():number {
		return this.type===GamepadInputType.Axis ? this.axis : this.axis*2-1
	}
	
	get bscalar():number {
		return this.type===GamepadInputType.Button ? this.axis : (this.axis+1)*0.5
	}
	
	get pressed():boolean {
		return this.type===GamepadInputType.Button ? this.button : Math.abs(this.axis)>=0.5
	}
}

//FIXME: revisit using a pool/not constantly instantiating objects
//FIXME: also, need to store input maps and not regenerate them every widget redraw
export type GamepadState = {
	index: number;
	inputs: GamepadInput[];
	//getInputMap(defs:GamepadInputDef[]):number[]
	//getFromPool()
	//update(pad:Gamepad):null // from the web gamepad api
}

export const getInputMap = (inputs:GamepadInput[], defs:GamepadInputDef[]): GamepadInput[] => {
	return defs?.map(d => inputs?.find(i => d.type===i.type && d.index===i.index)) || []
}
