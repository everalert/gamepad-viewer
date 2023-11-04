import { createContext, useContext, JSX } from 'solid-js'
import { type SetStoreFunction, createStore } from 'solid-js/store'
import { useSearchParams, useParams } from '@solidjs/router'
import { WIDGET_DFLT, WidgetDef, parseWidgetStr } from '../components/Widget'
import { WIDGET_CONTAINER_DFLT, WidgetContainerDef, parseContainerStr } from '../components/containers'
import { LAYOUTS } from '../types/layouts'


export interface InputLayoutData {
	container: WidgetContainerDef;
	widgets: WidgetDef[];
}

export const InputLayoutContext =
	createContext<[InputLayoutData, SetStoreFunction<InputLayoutData>]>()

export const useInputLayout = () =>
	useContext(InputLayoutContext)

interface InputLayoutProps {
	children: JSX.Element;
}

export const InputLayout = (props: InputLayoutProps) => {
	const [params] = useSearchParams();
	const layoutName = () => useParams().layout;
	const modeCompact = () => params.compact !== undefined

	const parse = (x: (s:string) => any) => params?.settings ? x(params.settings) : null
	const preset = (t:'container'|'widgets') => {
		const route = Object.keys(LAYOUTS).includes(layoutName()) ? layoutName() : 'default'
		const compact = modeCompact() ? `${t}_compact` : t
		return LAYOUTS[route][compact] ?? LAYOUTS[route][t] ?? null
	}

	const settingsContainer = () =>
		parse(parseContainerStr)
			?? (layoutName()==='custom' ? {...WIDGET_CONTAINER_DFLT} : null)
			?? {...preset('container')}
	const settingsWidgets = () => {
		const fromStr = parse(parseWidgetStr)
			?? (layoutName()==='custom' ? [{...WIDGET_DFLT}] : null)
		return (fromStr?.length > 0 ? fromStr : null) ?? [...preset('widgets')]
	}

	const [layout, setLayout] = createStore<InputLayoutData>({
		container: settingsContainer(),
		widgets: settingsWidgets(),
	})

	return <InputLayoutContext.Provider value={[layout, setLayout]}>
		{ props.children }
	</InputLayoutContext.Provider>
}
