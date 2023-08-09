import type { Component } from 'solid-js'
import { InlinePlusCircleIcon, InlinePlusCircleIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Add: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlinePlusCircleIcon}
	iconOff={InlinePlusCircleIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Add
