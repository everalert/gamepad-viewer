import type { Component } from 'solid-js'
import { InlinePencilSquareIcon, InlinePencilSquareIconOutline } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Edit: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlinePencilSquareIcon}
	iconOff={InlinePencilSquareIconOutline}
	class={props.class||''}
	style={props.style||''}
/>

export default Edit
