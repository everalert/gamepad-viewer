import type { Component } from 'solid-js'


interface InlineIcon {
	class?: string;
	style?: string;
}


// EDIT
// pencil-square

export const InlinePencilSquareIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
	<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
</svg>

export const InlinePencilSquareIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>


// ADD
// plus-circle

export const InlinePlusCircleIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
</svg>

export const InlinePlusCircleIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


// DELETE
// minus-circle
// see also 'trash' from heroicons

export const InlineMinusCircleIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
</svg>

export const InlineMinusCircleIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>



// RESET
// arrow-path-rounded-square

export const InlineArrowPathRndSqIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path fill-rule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z" clip-rule="evenodd" />
</svg>

export const InlineArrowPathRndSqIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>


// CONFIRM
// check-circle

export const InlineCheckCircleIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
</svg>

export const InlineCheckCircleIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


// TOOLTIP
// information-circle

export const InlineInfoCircleIcon: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>

export const InlineInfoCircleIconOutline: Component<InlineIcon> = (props: InlineIcon) => <svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
	class={`w-full h-full ${props.class||''}`}
	style={props.style||''}>
	<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>

// TODO: COPY
// 'document-duplicate' or 'clipboard-document' from heroicons
