import type { Component } from 'solid-js'
import type { InlineIcon } from './shapes'


export interface IconProps {
	class?:string;
	style?:string;
}

export interface IconWrapperProps {
	iconOn: Component<InlineIcon>;
	iconOff: Component<InlineIcon>;
	class?: string;
	style?: string;
}


export const IconWrapper: Component<IconWrapperProps> = (props:IconWrapperProps) => <div
	class={`group ${props.class||'w-full h-full'}`}
	style={props.style||''}
>
	<props.iconOn class='hidden group-hover:block' />
	<props.iconOff class='block group-hover:hidden' />
</div>
