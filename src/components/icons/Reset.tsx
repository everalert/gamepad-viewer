import type { Component } from 'solid-js'
import { InlineArrowPathRndSqIcon, InlineArrowPathRndSqIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Reset: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineArrowPathRndSqIcon}
	iconOff={InlineArrowPathRndSqIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Reset
