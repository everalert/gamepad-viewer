import type { Component } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import { DisplayContainer } from '../components/containers'
import { PSX_DFLT_CONTAINER, PSX_DFLT_CONTAINER_COMPACT,
	PSX_DFLT_WIDGETS, PSX_DFLT_WIDGETS_COMPACT } from '../types/layouts'


export const PSx: Component = () => {
	const [params] = useSearchParams();
	const MODE_COMPACT = params.compact !== undefined

	return <DisplayContainer
		container={MODE_COMPACT ? PSX_DFLT_CONTAINER_COMPACT : PSX_DFLT_CONTAINER}
		widgets={MODE_COMPACT ? PSX_DFLT_WIDGETS_COMPACT : PSX_DFLT_WIDGETS}
	/>
}

export default PSx;
