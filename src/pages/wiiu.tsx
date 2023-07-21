import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import type { GamepadState } from '../types/gamepad'
import { Gamepad, Stick, StickText,
	Button2, Button4, DPad, Trigger } from '../components'
import { WiiUAxis, WiiUButton } from '../types/wiiu'


const WiiU: Component = () => {
	const [params] = useSearchParams();
	const [pad, setPad] = createSignal<GamepadState>()
	const padIndex = 0
	
	const NOTEXT		= params.notext !== undefined
	const NOIMAGE		= params.noimage !== undefined
	const MODE_COMPACT	= params.compact !== undefined
	const FULL_W		= MODE_COMPACT ? 396 : 512	// 460 / 572
	const FULL_H		= MODE_COMPACT ? 80 : 128	// 144 / 192
	const INNER_XOFF	= MODE_COMPACT ? 46 : 64
	const INNER_YOFF	= MODE_COMPACT ? 0 : 24
	const OUTER_XOFF	= MODE_COMPACT ? 140 : 172
	const OUTER_YOFF	= MODE_COMPACT ? 0 : -16
	const MID_YOFF		= MODE_COMPACT ? -40 : -48
	const END_YOFF		= 0
	const LINE_W		= 3
	const STICK_R		= MODE_COMPACT ? 40 : 48
	const TRIGGER_H		= MODE_COMPACT ? 64 : 96
	const BTN2_R1		= MODE_COMPACT ? 84 : 32
	const BTN2_R2		= MODE_COMPACT ? 10 : 12
	const BTN4_R1		= MODE_COMPACT ? 24 : 28
	const BTN4_R2		= MODE_COMPACT ? 13 : 16
	const DPAD_L		= MODE_COMPACT ? 72 : 80
	const DPAD_T		= MODE_COMPACT ? 24 : 28

	return <>
		<Gamepad padIndex={padIndex} onUpdate={setPad} />
		<div
			class='py-[32px]'
			style={`width:${FULL_W+64}px;`}
			>
			{ NOTEXT || <div
				class='mx-[32px] mb-[32px] flex justify-center gap-4 text-lg'
				style={`width:${FULL_W}px;`}
				>
				<StickText
					x={pad()?.axes[WiiUAxis.LSx]||0}
					y={pad()?.axes[WiiUAxis.LSy]||0}
				/>
				<StickText
					x={pad()?.axes[WiiUAxis.RSx]||0}
					y={pad()?.axes[WiiUAxis.RSy]||0}
				/>
			</div> }
			{ NOIMAGE || <div
				class='mx-[32px] relative'
				style={`width:${FULL_W}px; height:${FULL_H}px;`}
				>
				<Trigger
					bumper={pad()?.buttonPress[WiiUButton.L]||false}
					trigger={pad()?.buttonValue[WiiUButton.ZL]||0}
					trigH={TRIGGER_H}
					trigR={256}
					markW={8}
					class={`absolute`}
					style={`top:${FULL_H/2+END_YOFF}px; left:${0};`}
					line={LINE_W}
				/>
				<Stick
					x={pad()?.axes[WiiUAxis.LSx]||0}
					y={pad()?.axes[WiiUAxis.LSy]||0}
					button={pad()?.buttonPress[WiiUButton.LSB]||false}
					r1={STICK_R}
					r2={5}
					class={`absolute`}
					style={`top:${FULL_H/2+OUTER_YOFF}px; left:${FULL_W/2-OUTER_XOFF};`}
					line={LINE_W}
				/>
				<DPad
					down={pad()?.buttonPress[WiiUButton.DD]||false}
					right={pad()?.buttonPress[WiiUButton.DR]||false}
					left={pad()?.buttonPress[WiiUButton.DL]||false}
					up={pad()?.buttonPress[WiiUButton.DU]||false}
					length={DPAD_L}
					thickness={DPAD_T}
					r={8}
					class={`absolute`}
					style={`top:${FULL_H/2+INNER_YOFF}px; left:${FULL_W/2-INNER_XOFF};`}
					line={LINE_W}
				/>
				<Button2
					right={pad()?.buttonPress[WiiUButton.Start]||false}
					left={pad()?.buttonPress[WiiUButton.Select]||false}
					r1={BTN2_R1}
					r2={BTN2_R2}
					class={`absolute`}
					style={`top:${FULL_H/2+MID_YOFF}px; left:${FULL_W/2};`}
					line={LINE_W}
				/>
				<Button4
					down={pad()?.buttonPress[WiiUButton.B]||false}
					right={pad()?.buttonPress[WiiUButton.A]||false}
					left={pad()?.buttonPress[WiiUButton.Y]||false}
					up={pad()?.buttonPress[WiiUButton.X]||false}
					r1={BTN4_R1}
					r2={BTN4_R2}
					class={`absolute`}
					style={`top:${FULL_H/2+INNER_YOFF}px; left:${FULL_W/2+INNER_XOFF};`}
					line={LINE_W}
				/>
				<Stick
					x={pad()?.axes[WiiUAxis.RSx]||0}
					y={pad()?.axes[WiiUAxis.RSy]||0}
					button={pad()?.buttonPress[WiiUButton.RSB]||false}
					r1={STICK_R}
					r2={5}
					class={`absolute`}
					style={`top:${FULL_H/2+OUTER_YOFF}px; left:${FULL_W/2+OUTER_XOFF};`}
					line={LINE_W}
				/>
				<div
					class={`absolute -scale-x-100`}
					style={`top:${FULL_H/2+END_YOFF}px; right:${0};`}
					>
					<Trigger
						bumper={pad()?.buttonPress[WiiUButton.R]||false}
						trigger={pad()?.buttonValue[WiiUButton.ZR]||0}
						trigH={TRIGGER_H}
						trigR={256}
						markW={8}
						line={LINE_W}
					/>
				</div>
			</div> }
		</div>
	</>
}

export default WiiU;
