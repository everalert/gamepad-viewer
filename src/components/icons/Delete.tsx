import type { Component } from 'solid-js'
import { InlineMinusCircleIcon, InlineMinusCircleIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Delete: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineMinusCircleIcon}
	iconOff={InlineMinusCircleIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Delete
