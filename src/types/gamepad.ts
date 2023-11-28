import { reconcile, SetStoreFunction } from 'solid-js/store'


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

export const inputDefHash = (d:GamepadInputDef[]) => d
	.map(def => `${GamepadInputType[def.type].substring(0,2)}${def.index}`).join('')


export class GamepadInput {
	type: GamepadInputType; 
	index: number;
	axis: number;
	button: boolean;
	free: boolean;

	constructor() {
		GamepadInput.reset(this)
	}

	init(type:GamepadInputType, index:number, axis:number, button?:boolean) {
		this.type = type
		this.index = index
		this.axis = axis
		this.button = button===true
		this.free = false
	}

	static reset(input:GamepadInput) {
		input.free = true
	}

	static ascalar(input:GamepadInput):number {
		if (input === null) return 0
		return input.type===GamepadInputType.Axis ? input.axis : input.axis*2-1
	}

	static bscalar(input:GamepadInput):number {
		if (input === null) return 0.5
		return input.type===GamepadInputType.Button ? input.axis : (input.axis+1)*0.5
	}

	static pressed(input:GamepadInput):boolean {
		if (input === null) return false
		return input.type===GamepadInputType.Button ? input.button : Math.abs(input.axis)>=0.5
	}
}

export class GamepadState {
	index: number = -1;
	timestamp: DOMHighResTimeStamp;
	inputs: GamepadInput[] = [];
	inputMap: {[key:string]:GamepadInput[]} = {};
	inputToRemap: boolean = false;
	firstPressedCache:{t:DOMHighResTimeStamp,v:number} = {t:null,v:null};
	
	constructor() {
		//this.index = null
		//this.inputToRemap = false
	}

	static update(pad:Gamepad, state:GamepadState, setFn:SetStoreFunction<GamepadState>) {
		if (!pad.connected) {
			setFn('index', -1)
			return
		}
		if (pad.timestamp === state.timestamp) {
			return
		}

		setFn({ index:pad.index, timestamp:pad.timestamp })
		
		GamepadState.resetPool(state, setFn)
		GamepadState.resizePool(pad.axes.length+pad.buttons.length, state, setFn)
		pad.axes.forEach((a,i) => setFn('inputs', state.inputs.findIndex(i => i.free), {
			type: GamepadInputType.Axis,
			index: i,
			axis: a,
			button: false,
			free: false,
		}))
		pad.buttons.forEach((b,i) => setFn('inputs', state.inputs.findIndex(i => i.free), {
			type: GamepadInputType.Button,
			index: i,
			axis: b.value,
			button: b.pressed,
			free: false,
		}))

		if (state.firstPressedCache.v !== GamepadState.firstPressedIndex(state, setFn)) {
			document.dispatchEvent(new CustomEvent('pad:newFirstPressed', {
				detail: {
					index: GamepadState.firstPressedIndex(state, setFn),
					value: GamepadState.firstPressed(state, setFn),
				}
			}))
		}
	}

	static mapInputs(defs:GamepadInputDef[], state:GamepadState): GamepadInput[] {
		return defs?.map(d =>
			state.inputs.find(i => d.type===i.type && d.index===i.index) ?? null)
	}

	static getInputMap(defs:GamepadInputDef[], state:GamepadState, setFn:SetStoreFunction<GamepadState>): GamepadInput[] {
		if (state.index < 0 || state.inputs.length <= 0)
			return new Array(defs.length).fill(null)

		if (state.inputToRemap) {
			setFn('inputMap', reconcile({}))
			setFn('inputToRemap', false)
		}

		const id = inputDefHash(defs)
		if (!state.inputMap[id]) {
			setFn('inputMap', id, GamepadState.mapInputs(defs, state))
		}
		return state.inputMap[id]
	}

	static resizePool(size:number, state:GamepadState, setFn:SetStoreFunction<GamepadState>):void {
		while (state.inputs.length < size) setFn('inputs', p => [...p, new GamepadInput()])
		if (state.inputs.length > size) setFn('inputs', p => [...p.slice(0,size)])
	}

	static resetPool(state:GamepadState, setFn:SetStoreFunction<GamepadState>):void {
		setFn('inputs', {}, 'free', true)
	}

	static firstPressedIndex(state:GamepadState, setFn:SetStoreFunction<GamepadState>):number {
		if (state.firstPressedCache.t !== state.timestamp) {
			setFn('firstPressedCache',
				{ t:state.timestamp, v:state.inputs.findIndex(i => GamepadInput.pressed(i)) })
		}
		return state.firstPressedCache.v
	}

	static firstPressed(state:GamepadState, setFn:SetStoreFunction<GamepadState>):GamepadInput {
		return state.inputs[GamepadState.firstPressedIndex(state, setFn)]
	}
}
