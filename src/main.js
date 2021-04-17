import App from './App.svelte';
import * as L from 'leaflet';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

var mymap = L.map('mapid').setView([41.382894, 2.177432], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoidmljdG9yZ2Q5NyIsImEiOiJja2tza3g0eWMwcDB3MnZwYzZ3MzkwNjMxIn0.nB6u0xe4iE2CcTLqMolqHA'
}).addTo(mymap);

mymap.on('click', onMapClick);

export default app;