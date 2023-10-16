import type { Component } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import { DisplayContainer } from '../components/containers'
import { XBOX_DFLT_CONTAINER_COMPACT, XBOX_DFLT_CONTAINER,
	XBOX_DFLT_WIDGETS_COMPACT, XBOX_DFLT_WIDGETS } from '../types/layouts'


export const XBox: Component = () => {
	const [params] = useSearchParams();
	const MODE_COMPACT = params.compact !== undefined

	return <DisplayContainer
		container={MODE_COMPACT ? XBOX_DFLT_CONTAINER_COMPACT : XBOX_DFLT_CONTAINER}
		widgets={MODE_COMPACT ? XBOX_DFLT_WIDGETS_COMPACT : XBOX_DFLT_WIDGETS}
	/>
}

export default XBox;
