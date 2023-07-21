/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router'

import IndexPage from './pages/index'
import XBoxPage from './pages/xbox'
import PSxPage from './pages/psx'
import WiiUPage from './pages/wiiu'
import MinimalPage from './pages/minimal'

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
	() => {

		return <Router>
			<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet"/ >
			<Routes>
				<Route path='/' component={IndexPage} />
				<Route path='/xbox' component={XBoxPage} />
				<Route path='/psx' component={PSxPage} />
				<Route path='/wiiu' component={WiiUPage} />
				<Route path='/minimal' component={MinimalPage} />
			</Routes>
		</Router>
	}, 
	root!
);
