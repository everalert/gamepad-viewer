import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad, StickText, TriggerText } from '../components'
import { XBoxAxis as XBA, XBoxButton as XBB } from '../types/xbox'
import { WidgetType, WidgetDef } from '../components/Widget'
import { WidgetContainer, WidgetContainerDef } from '../components/WidgetContainer'


const XBox: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	const MODE_COMPACT	= params.compact !== undefined
	const INNER_X	= MODE_COMPACT ? 46 : 64
	const INNER_Y	= MODE_COMPACT ? 0 : 24
	const OUTER_X	= MODE_COMPACT ? 140 : 172
	const OUTER_Y	= MODE_COMPACT ? 0 : -24
	const MID_Y		= MODE_COMPACT ? -40 : -48
	const ST_R		= MODE_COMPACT ? 40 : 48
	const TR_H		= MODE_COMPACT ? 64 : 96
	const B2_R1		= MODE_COMPACT ? 92 : 32
	const B2_R2		= MODE_COMPACT ? 10 : 12
	const B4_R1		= MODE_COMPACT ? 24 : 28
	const B4_R2		= MODE_COMPACT ? 13 : 16
	const DP_L		= MODE_COMPACT ? 72 : 80
	const DP_T		= MODE_COMPACT ? 24 : 28
	
	const container: WidgetContainerDef = {
		w: MODE_COMPACT ? 396 : 512,
		h: MODE_COMPACT ? 80 : 144,
		m: 32,
		line: 3,
	}

	const widgets: WidgetDef[] = [
		{ type:WidgetType.Stk, x:-OUTER_X, y:OUTER_Y,
			ax:[XBA.LSx,XBA.LSy], bt:[XBB.LSB], val:[ST_R,5] },
		{ type:WidgetType.Stk, x:INNER_X, y:INNER_Y,
			ax:[XBA.RSx,XBA.RSy], bt:[XBB.RSB], val:[ST_R,5] },
		{ type:WidgetType.Btn2, x:0, y:MID_Y,
			ax:[], bt:[XBB.Back,XBB.Start], val:[B2_R1,B2_R2] },
		{ type:WidgetType.DPd, x:-INNER_X, y:INNER_Y,
			ax:[], bt:[XBB.DD,XBB.DR,XBB.DL,XBB.DU], val:[DP_L,DP_T] },
		{ type:WidgetType.Btn4, x:OUTER_X, y:OUTER_Y,
			ax:[], bt:[XBB.A,XBB.B,XBB.X,XBB.Y], val:[B4_R1,B4_R2] },
		{ type:WidgetType.Trg, x:-container.w/2, y:0,
			ax:[], bt:[XBB.LT,XBB.LB], val:[TR_H,256,8] },
		{ type:WidgetType.Trg, x:container.w/2, y:0,
			ax:[], bt:[XBB.RT,XBB.RB], val:[TR_H,256,8], fx:true },
	]

	return <>
		<Gamepad padIndex={padIndex} onUpdate={setPad} />
		<div
			class={`flex flex-col`}
			style={`
width:${container.w+container.m*2}px;
padding:${container.m}px;
gap:${container.m/2}px;
`}>
			{ NOTEXT || <div
				class={`flex justify-center gap-4 text-lg`}
				style={`width:${container.w}px;`}
				>
				<For each={widgets.filter(w=>w.type===WidgetType.Stk)}>
					{s => <StickText
						x={pad()?.axes[s.ax[0]]||0}
						y={pad()?.axes[s.ax[1]]||0}
					/>}
				</For>
				<TriggerText
					left={pad()?.buttonValue[XBB.LT]||0}
					right={pad()?.buttonValue[XBB.RT]||0}
				/>
			</div> }
			{ NOIMAGE || <WidgetContainer def={container} widgets={widgets} pad={pad()} /> }
		</div>
	</>
}

export default XBox;
