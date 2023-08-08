export enum GamepadInputType {
	Axis,
	Button,
}


export type GamepadInputDef = {
	type: GamepadInputType; 
	index: number;
}

// NOTE: for use as shorthand
export const inputDef = (t:GamepadInputType,i:number):GamepadInputDef =>
	{ return {type:t,index:i} }

export const inputDefCmp = (d1:GamepadInputDef, d2:GamepadInputDef) => {
	const hash = (d:GamepadInputDef) => d?.type*1000 + d?.index
	if (hash(d1)>hash(d2)) return 1
	if (hash(d1)<hash(d2)) return -1
	return 0
}


export class GamepadInput {
	type: GamepadInputType; 
	index: number;
	axis: number;
	button: boolean;
	free: boolean;

	constructor() {
		this.reset()
	}

	init(type:GamepadInputType, index:number, axis:number, button?:boolean) {
		this.type = type
		this.index = index
		this.axis = axis
		this.button = button===true
		this.free = false
	}

	reset() {
		this.free = true
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

//FIXME: revisit using a pool/not constantly instantiating objects, for gamepadstate too
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

export const resetPool = (pool:GamepadInput[]) => pool.forEach(i => i.reset())

export const resizePool = (pool:GamepadInput[], size:number) => {
	while (pool.length < size) pool.push(new GamepadInput())
	while (pool.length > size) pool.pop()
}
