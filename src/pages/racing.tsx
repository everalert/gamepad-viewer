import type { Component } from 'solid-js';
import { DisplayContainer } from '../components/containers'
import { RACING_DFLT_CONTAINER, RACING_DFLT_WIDGETS } from '../types/layouts'


export const Racing: Component = () => {
	return <DisplayContainer
		container={RACING_DFLT_CONTAINER}
		widgets={RACING_DFLT_WIDGETS}
	/>
}

export default Racing;
