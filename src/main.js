import App from './App.svelte';
import * as L from 'leaflet';
import * as sidebar from 'leaflet-sidebar-v2';

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

var marker = L.marker([41.799983, 1.730347]).addTo(mymap);

var sidebarObj = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(mymap);

/* add a new panel */
var panelContent = {
    id: 'userinfo',                     // UID, used to access the panel
    tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
    pane: someDomNode.innerHTML,        // DOM elements can be passed, too
    title: 'Your Profile',              // an optional pane header
    position: 'bottom'                  // optional vertical alignment, defaults to 'top'
};

sidebarObj.addPanel(panelContent);

/* add an external link */
sidebarObj.addPanel({
    id: 'ghlink',
    tab: '<i class="fa fa-github"></i>',
    button: 'https://github.com/noerw/leaflet-sidebar-v2',
});

/* add a button with click listener */
sidebarObj.addPanel({
    id: 'click',
    tab: '<i class="fa fa-info"></i>',
    button: function (event) { console.log(event); }
});

/* remove a panel */
sidebarObj.removePanel('userinfo');

/* en- / disable a panel */
sidebarObj.disablePanel('userinfo');
sidebarObj.enablePanel('userinfo');

/* open a panel */
sidebarObj.open('userinfo');

/* close the sidebar */
sidebarObj.close();

/* remove the sidebar (keeping the sidebar container) */
sidebarObj.remove();
sidebarObj.removeFrom(mymap); // leaflet 0.x

/* to clear the sidebar state, remove the container reference */
sidebarObj._container = null

sidebarObj.on('content', function(e) {
    // e.id contains the id of the opened panel
})

mymap.on('click', onMapClick);

export default app;