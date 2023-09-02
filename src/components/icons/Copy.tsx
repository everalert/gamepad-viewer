import type { Component } from 'solid-js'
import { InlineDocDuplicateIconSmall } from './shapes'
import { IconProps, IconWrapper } from './wrapper'


export const Copy: Component<IconProps> = (props:IconProps) => <IconWrapper
	iconOn={InlineDocDuplicateIconSmall}
	iconOff={InlineDocDuplicateIconSmall}
	class={props?.class??''}
	style={props?.style??''}
/>

export default Copy
