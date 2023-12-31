/* @refresh reload */
import './index.css';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { Router, Route, Routes } from '@solidjs/router'
import { InputReader } from './components/InputReader'
import { Background } from './components/Background'

const MainPage = lazy(() => import('./pages/main'))
const DisplayPage = lazy(() => import('./pages/display'))
const ExperimentPage = lazy(() => import('./pages/experiment'))

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
	);
}

render(
	() => {
		return <Router>
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
				rel="stylesheet"
			/>
			<InputReader>
				<Background/>
				<Routes>
					<Route path='/' component={MainPage} />
					<Route path='/secret' component={ExperimentPage} />
					<Route path='/:layout/:edit?' component={DisplayPage} />
				</Routes>
			</InputReader>
		</Router>
	}, 
	root!
);
