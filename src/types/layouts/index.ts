export * from './xbox'
export * from './psx'
export * from './wiiu'
export * from './gcn'
export * from './racing'
export * from './minimal'

import * as XBOX from './xbox'
import * as PSX from './psx'
import * as WIIU from './wiiu'
import * as GCN from './gcn'
import * as RACING from './racing'
import * as MINIMAL from './minimal'

export const LAYOUTS = {
		'default': {
			container: XBOX.XBOX_DFLT_CONTAINER,
			widgets: XBOX.XBOX_DFLT_WIDGETS,
			container_compact: XBOX.XBOX_DFLT_CONTAINER_COMPACT,
			widgets_compact: XBOX.XBOX_DFLT_WIDGETS_COMPACT,
		},
		'psx': {
			container: PSX.PSX_DFLT_CONTAINER,
			widgets: PSX.PSX_DFLT_WIDGETS,
			container_compact: PSX.PSX_DFLT_CONTAINER_COMPACT,
			widgets_compact: PSX.PSX_DFLT_WIDGETS_COMPACT,
		},
		'wiiu': {
			container: WIIU.WIIU_DFLT_CONTAINER,
			widgets: WIIU.WIIU_DFLT_WIDGETS,
			container_compact: WIIU.WIIU_DFLT_CONTAINER_COMPACT,
			widgets_compact: WIIU.WIIU_DFLT_WIDGETS_COMPACT,
		},
		'gcn': {
			container: GCN.GCN_DFLT_CONTAINER,
			widgets: GCN.GCN_DFLT_WIDGETS,
		},
		'racing': {
			container: RACING.RACING_DFLT_CONTAINER,
			widgets: RACING.RACING_DFLT_WIDGETS,
		},
		'minimal': {
			container: MINIMAL.MINIMAL_DFLT_CONTAINER,
			widgets: MINIMAL.MINIMAL_DFLT_WIDGETS,
		},
	}
