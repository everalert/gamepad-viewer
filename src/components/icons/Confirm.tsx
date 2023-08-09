import type { Component } from 'solid-js'
import { InlineCheckCircleIcon, InlineCheckCircleIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Confirm: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineCheckCircleIcon}
	iconOff={InlineCheckCircleIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Confirm
