// BUTTON

//NOTE: same deal as with widget types,
//don't change values so that codes keep working across revisions
export enum ButtonShape {
	NONE	= 0,
	Circle	= 1,
	TriIso	= 2,
	TriEqu	= 3,
	Rect	= 4,
	//Trapezium,
	N64C	= 5,
	GCXY	= 6,
	MAX
}


// TRIGGER

export enum TriggerSimpleMode {
	NONE,
	Full,
	Split,
	FullThick,
	SplitThick,
	MAX
}
