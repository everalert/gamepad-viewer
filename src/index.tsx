/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router'
import { Main, XBox, PSx, WiiU, 
GCN, Racing, Minimal, Custom } from './pages'

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
				<Route path='/' component={Main} />
				<Route path='/xbox' component={XBox} />
				<Route path='/psx' component={PSx} />
				<Route path='/wiiu' component={WiiU} />
				<Route path='/gcn' component={GCN} />
				<Route path='/racing' component={Racing} />
				<Route path='/minimal' component={Minimal} />
				<Route path='/custom' component={Custom} />
				<Route path='/custom/edit' component={Custom} />
			</Routes>
		</Router>
	}, 
	root!
);
