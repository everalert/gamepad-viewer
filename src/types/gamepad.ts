export enum GamepadInputType {
	NONE	= -2,
	BLANK	= -1,
	Axis	= 0,
	Button	= 1,
}


export type GamepadInputDef = {
	type: GamepadInputType; 
	index: number;
}

export const DFLT_GAMEPADINPUTDEF: GamepadInputDef = {
	type: GamepadInputType.BLANK,
	index: 0,
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
export class GamepadState {
	index: number;
	timestamp: DOMHighResTimeStamp;
	inputs: GamepadInput[] = [];
	private firstPressedCache:{t:DOMHighResTimeStamp,v:number} = {t:null,v:null};
	
	constructor(index:number) {
		this.index = index
	}

	update(pad:Gamepad) {
		this.timestamp = pad.timestamp
		
		this.resetPool()
		this.resizePool(pad.axes.length+pad.buttons.length)
		pad.axes.forEach((a,i) => this.inputs.find(p => p.free)
			.init(GamepadInputType.Axis,i,a))
		pad.buttons.forEach((b,i) => this.inputs.find(p => p.free)
			.init(GamepadInputType.Button,i,b.value,b.pressed))

		if (this.firstPressedCache.v !== this.firstPressedIndex) {
			document.dispatchEvent(new CustomEvent('pad:newFirstPressed', {
				detail: {
					index: this.firstPressedIndex,
					value: this.firstPressed,
				}
			}))
		}
	}

	mapInputs(defs:GamepadInputDef[]): GamepadInput[] {
		return defs?.map(d => this.inputs?.find(i => d.type===i.type && d.index===i.index) || null)
	}

	resizePool(size:number):void {
		while (this.inputs.length < size) this.inputs.push(new GamepadInput())
		while (this.inputs.length > size) this.inputs.pop()
	}

	resetPool():void { this.inputs.forEach(i => i.reset()) }

	get firstPressedIndex():number {
		if (this.firstPressedCache.t !== this.timestamp) {
			this.firstPressedCache.t = this.timestamp
			this.firstPressedCache.v = this.inputs.findIndex(i => i.pressed)
		}
		return this.firstPressedCache.v
	}

	get firstPressed():GamepadInput { return this.inputs[this.firstPressedIndex] }
}
