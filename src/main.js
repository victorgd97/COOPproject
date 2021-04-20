import App from './App.svelte';
import * as L from 'leaflet';
import * as sidebar from 'leaflet-sidebar-v2';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
	}
});

export default app;