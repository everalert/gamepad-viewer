import type { Component } from 'solid-js';
import { DisplayContainer } from '../components/containers'
import { GCN_DFLT_CONTAINER, GCN_DFLT_WIDGETS } from '../types/layouts'


export const GCN: Component = () => {
	return <DisplayContainer
		container={GCN_DFLT_CONTAINER}
		widgets={GCN_DFLT_WIDGETS}
	/>
}

export default GCN;
