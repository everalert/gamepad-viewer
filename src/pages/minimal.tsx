import type { Component } from 'solid-js';
import { DisplayContainer } from '../components/containers'
import { MINIMAL_DFLT_CONTAINER, MINIMAL_DFLT_WIDGETS } from '../types/layouts'


export const Minimal: Component = () => {
	return <DisplayContainer
		container={MINIMAL_DFLT_CONTAINER}
		widgets={MINIMAL_DFLT_WIDGETS}
	/>
}

export default Minimal;
