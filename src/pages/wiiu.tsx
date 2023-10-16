import type { Component } from 'solid-js';
import { useSearchParams } from '@solidjs/router'
import { DisplayContainer } from '../components/containers'
import { WIIU_DFLT_CONTAINER_COMPACT, WIIU_DFLT_CONTAINER,
	WIIU_DFLT_WIDGETS_COMPACT, WIIU_DFLT_WIDGETS } from '../types/layouts'


export const WiiU: Component = () => {
	const [params] = useSearchParams();
	const MODE_COMPACT = params.compact !== undefined

	return <DisplayContainer
		container={MODE_COMPACT ? WIIU_DFLT_CONTAINER_COMPACT : WIIU_DFLT_CONTAINER}
		widgets={MODE_COMPACT ? WIIU_DFLT_WIDGETS_COMPACT : WIIU_DFLT_WIDGETS}
	/>
}

export default WiiU;
