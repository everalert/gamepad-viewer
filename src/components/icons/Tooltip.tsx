import type { Component } from 'solid-js'
import { InlineInfoCircleIcon, InlineInfoCircleIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Tooltip: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineInfoCircleIcon}
	iconOff={InlineInfoCircleIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Tooltip
