import { WidgetDef } from '../components/Widget'
import { WidgetContainerDef } from '../components/containers/'


export enum Color {
	Default,	//neutral
	Slate,
	Gray,
	Zinc,
	Neutral,
	Stone,
	Red,
	Orange,
	Amber,
	Yellow,
	Lime,
	Green,
	Emerald,
	Teal, 
	Cyan,
	Sky,
	Blue,
	Indigo,
	Violet,
	Purple,
	Fuchsia,
	Pink,
	Rose,
}

export type ColorDef = {
	// regular
	ol: string;
	lineOn: string;
	lineOff: string;
	hl: string;
	hlOl: string;
	bg: string;
	bgOl: string;
	detail: string;
	// simple
	sBg: string;
	sBgOl: string;
	sDetail: string;
	// color picker
	uiBdr?: string;
}

export const WidgetColors: Readonly<{[K in Color]:ColorDef}> = {
	[Color.Default]: null,
	[Color.Slate]: { ol:'stroke-slate-300', lineOn:'stroke-slate-300', lineOff:'stroke-slate-800', hl:'fill-slate-50', hlOl:'stroke-slate-50', bg:'fill-slate-950', bgOl:'stroke-slate-950', detail:'stroke-slate-300', sBg:'fill-slate-900', sBgOl:'stroke-slate-900', sDetail:'stroke-slate-800', uiBdr:'border-slate-500' },
	[Color.Gray]: { ol:'stroke-gray-300', lineOn:'stroke-gray-300', lineOff:'stroke-gray-800', hl:'fill-gray-50', hlOl:'stroke-gray-50', bg:'fill-gray-950', bgOl:'stroke-gray-950', detail:'stroke-gray-300', sBg:'fill-gray-900', sBgOl:'stroke-gray-900', sDetail:'stroke-gray-800', uiBdr:'border-gray-500' },
	[Color.Zinc]: { ol:'stroke-zinc-300', lineOn:'stroke-zinc-300', lineOff:'stroke-zinc-800', hl:'fill-zinc-50', hlOl:'stroke-zinc-50', bg:'fill-zinc-950', bgOl:'stroke-zinc-950', detail:'stroke-zinc-300', sBg:'fill-zinc-900', sBgOl:'stroke-zinc-900', sDetail:'stroke-zinc-800', uiBdr:'border-zinc-500' },
	[Color.Neutral]: { ol:'stroke-neutral-300', lineOn:'stroke-neutral-300', lineOff:'stroke-neutral-800', hl:'fill-neutral-50', hlOl:'stroke-neutral-50', bg:'fill-neutral-950', bgOl:'stroke-neutral-950', detail:'stroke-neutral-300', sBg:'fill-neutral-900', sBgOl:'stroke-neutral-900', sDetail:'stroke-neutral-800', uiBdr:'border-neutral-500' },
	[Color.Stone]: { ol:'stroke-stone-300', lineOn:'stroke-stone-300', lineOff:'stroke-stone-800', hl:'fill-stone-50', hlOl:'stroke-stone-50', bg:'fill-stone-950', bgOl:'stroke-stone-950', detail:'stroke-stone-300', sBg:'fill-stone-900', sBgOl:'stroke-stone-900', sDetail:'stroke-stone-800', uiBdr:'border-stone-500' },
	[Color.Red]: { ol:'stroke-red-300', lineOn:'stroke-red-300', lineOff:'stroke-red-800', hl:'fill-red-50', hlOl:'stroke-red-50', bg:'fill-red-950', bgOl:'stroke-red-950', detail:'stroke-red-300', sBg:'fill-red-900', sBgOl:'stroke-red-900', sDetail:'stroke-red-800', uiBdr:'border-red-500' },
	[Color.Orange]: { ol:'stroke-orange-300', lineOn:'stroke-orange-300', lineOff:'stroke-orange-800', hl:'fill-orange-50', hlOl:'stroke-orange-50', bg:'fill-orange-950', bgOl:'stroke-orange-950', detail:'stroke-orange-300', sBg:'fill-orange-900', sBgOl:'stroke-orange-900', sDetail:'stroke-orange-800', uiBdr:'border-orange-500' },
	[Color.Amber]: { ol:'stroke-amber-300', lineOn:'stroke-amber-300', lineOff:'stroke-amber-800', hl:'fill-amber-50', hlOl:'stroke-amber-50', bg:'fill-amber-950', bgOl:'stroke-amber-950', detail:'stroke-amber-300', sBg:'fill-amber-900', sBgOl:'stroke-amber-900', sDetail:'stroke-amber-800', uiBdr:'border-amber-500' },
	[Color.Yellow]: { ol:'stroke-yellow-300', lineOn:'stroke-yellow-300', lineOff:'stroke-yellow-800', hl:'fill-yellow-50', hlOl:'stroke-yellow-50', bg:'fill-yellow-950', bgOl:'stroke-yellow-950', detail:'stroke-yellow-300', sBg:'fill-yellow-900', sBgOl:'stroke-yellow-900', sDetail:'stroke-yellow-800', uiBdr:'border-yellow-500' },
	[Color.Lime]: { ol:'stroke-lime-300', lineOn:'stroke-lime-300', lineOff:'stroke-lime-800', hl:'fill-lime-50', hlOl:'stroke-lime-50', bg:'fill-lime-950', bgOl:'stroke-lime-950', detail:'stroke-lime-300', sBg:'fill-lime-900', sBgOl:'stroke-lime-900', sDetail:'stroke-lime-800', uiBdr:'border-lime-500' },
	[Color.Green]: { ol:'stroke-green-300', lineOn:'stroke-green-300', lineOff:'stroke-green-800', hl:'fill-green-50', hlOl:'stroke-green-50', bg:'fill-green-950', bgOl:'stroke-green-950', detail:'stroke-green-300', sBg:'fill-green-900', sBgOl:'stroke-green-900', sDetail:'stroke-green-800', uiBdr:'border-green-500' },
	[Color.Emerald]: { ol:'stroke-emerald-300', lineOn:'stroke-emerald-300', lineOff:'stroke-emerald-800', hl:'fill-emerald-50', hlOl:'stroke-emerald-50', bg:'fill-emerald-950', bgOl:'stroke-emerald-950', detail:'stroke-emerald-300', sBg:'fill-emerald-900', sBgOl:'stroke-emerald-900', sDetail:'stroke-emerald-800', uiBdr:'border-emerald-500' },
	[Color.Teal]: { ol:'stroke-teal-300', lineOn:'stroke-teal-300', lineOff:'stroke-teal-800', hl:'fill-teal-50', hlOl:'stroke-teal-50', bg:'fill-teal-950', bgOl:'stroke-teal-950', detail:'stroke-teal-300', sBg:'fill-teal-900', sBgOl:'stroke-teal-900', sDetail:'stroke-teal-800', uiBdr:'border-teal-500' },
	[Color.Cyan]: { ol:'stroke-cyan-300', lineOn:'stroke-cyan-300', lineOff:'stroke-cyan-800', hl:'fill-cyan-50', hlOl:'stroke-cyan-50', bg:'fill-cyan-950', bgOl:'stroke-cyan-950', detail:'stroke-cyan-300', sBg:'fill-cyan-900', sBgOl:'stroke-cyan-900', sDetail:'stroke-cyan-800', uiBdr:'border-cyan-500' },
	[Color.Sky]: { ol:'stroke-sky-300', lineOn:'stroke-sky-300', lineOff:'stroke-sky-800', hl:'fill-sky-50', hlOl:'stroke-sky-50', bg:'fill-sky-950', bgOl:'stroke-sky-950', detail:'stroke-sky-300', sBg:'fill-sky-900', sBgOl:'stroke-sky-900', sDetail:'stroke-sky-800', uiBdr:'border-sky-500' },
	[Color.Blue]: { ol:'stroke-blue-300', lineOn:'stroke-blue-300', lineOff:'stroke-blue-800', hl:'fill-blue-50', hlOl:'stroke-blue-50', bg:'fill-blue-950', bgOl:'stroke-blue-950', detail:'stroke-blue-300', sBg:'fill-blue-900', sBgOl:'stroke-blue-900', sDetail:'stroke-blue-800', uiBdr:'border-blue-500' },
	[Color.Indigo]: { ol:'stroke-indigo-300', lineOn:'stroke-indigo-300', lineOff:'stroke-indigo-800', hl:'fill-indigo-50', hlOl:'stroke-indigo-50', bg:'fill-indigo-950', bgOl:'stroke-indigo-950', detail:'stroke-indigo-300', sBg:'fill-indigo-900', sBgOl:'stroke-indigo-900', sDetail:'stroke-indigo-800', uiBdr:'border-indigo-500' },
	[Color.Violet]: { ol:'stroke-violet-300', lineOn:'stroke-violet-300', lineOff:'stroke-violet-800', hl:'fill-violet-50', hlOl:'stroke-violet-50', bg:'fill-violet-950', bgOl:'stroke-violet-950', detail:'stroke-violet-300', sBg:'fill-violet-900', sBgOl:'stroke-violet-900', sDetail:'stroke-violet-800', uiBdr:'border-violet-500' },
	[Color.Purple]: { ol:'stroke-purple-300', lineOn:'stroke-purple-300', lineOff:'stroke-purple-800', hl:'fill-purple-50', hlOl:'stroke-purple-50', bg:'fill-purple-950', bgOl:'stroke-purple-950', detail:'stroke-purple-300', sBg:'fill-purple-900', sBgOl:'stroke-purple-900', sDetail:'stroke-purple-800', uiBdr:'border-purple-500' },
	[Color.Fuchsia]: { ol:'stroke-fuchsia-300', lineOn:'stroke-fuchsia-300', lineOff:'stroke-fuchsia-800', hl:'fill-fuchsia-50', hlOl:'stroke-fuchsia-50', bg:'fill-fuchsia-950', bgOl:'stroke-fuchsia-950', detail:'stroke-fuchsia-300', sBg:'fill-fuchsia-900', sBgOl:'stroke-fuchsia-900', sDetail:'stroke-fuchsia-800', uiBdr:'border-fuchsia-500' },
	[Color.Pink]: { ol:'stroke-pink-300', lineOn:'stroke-pink-300', lineOff:'stroke-pink-800', hl:'fill-pink-50', hlOl:'stroke-pink-50', bg:'fill-pink-950', bgOl:'stroke-pink-950', detail:'stroke-pink-300', sBg:'fill-pink-900', sBgOl:'stroke-pink-900', sDetail:'stroke-pink-800', uiBdr:'border-pink-500' },
	[Color.Rose]: { ol:'stroke-rose-300', lineOn:'stroke-rose-300', lineOff:'stroke-rose-800', hl:'fill-rose-50', hlOl:'stroke-rose-50', bg:'fill-rose-950', bgOl:'stroke-rose-950', detail:'stroke-rose-300', sBg:'fill-rose-900', sBgOl:'stroke-rose-900', sDetail:'stroke-rose-800', uiBdr:'border-rose-500' },
} as const


export const getColorDef = (d?:Color) => WidgetColors[d] || WidgetColors[Color.Neutral]

export const resolveColor = (w:WidgetDef, c:WidgetContainerDef) =>
	w.color || c.color || Color.Default


export const ColorList = Object.keys(Color)
.filter(k => Number.isInteger(parseInt(k)))
.map(k => { return {
	value: parseInt(k),
	label: Color[k],
	accent: WidgetColors[k]?.uiBdr,
	faded: parseInt(k)===Color.Default,
} } )
