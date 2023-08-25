import type { Config } from 'tailwindcss';
import TailwindScrollbar from 'tailwind-scrollbar'

const config: Config = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [
		TailwindScrollbar,
	],
};

export default config;
