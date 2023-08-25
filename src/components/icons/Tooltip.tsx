import type { Component } from 'solid-js'
import { InlineInfoCircleIconSmall } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Tooltip: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineInfoCircleIconSmall}
	iconOff={InlineInfoCircleIconSmall}
	class={props.class||''}
	style={props.style||''}
/>

export default Tooltip
