import type { Component } from 'solid-js';
import { useParams } from '@solidjs/router'
import { DisplayContainer } from '../components/containers'
import { LayoutEditor } from '../components/editor'
import { InputLayout } from '../components/InputLayout'
import { Show } from 'solid-js'

export const DisplayPage: Component = () => {
	const modeEdit = () => useParams().edit !== undefined
	return <InputLayout>
		<DisplayContainer>
			<Show when={modeEdit()}>
				<LayoutEditor />
			</Show>
		</DisplayContainer>
	</InputLayout>
}

export default DisplayPage;
