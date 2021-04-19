<script>
    import {GeoJSON, LeafletMap, TileLayer, Rectangle} from 'svelte-leafletjs';
	import Mapdata from '../data/MapData.json';

    const mapOptions = {
        center: [11.250000, 22.917923],
        zoom: 3,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    const geoJsonOptions = {
        style: function(geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function(feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
    };

    Mapdata.map(d => {
        d.Bounds = [[d.lat,d.long],[d.lat+2,d.long+2]];
        return d;
    })

</script>

<div class="example" style="width: 100%; height: 100%;">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <GeoJSON url="example.geojson" options={geoJsonOptions}/>
        {#each Mapdata as d}
            <Rectangle latLngBounds={d.Bounds}, fillColor={d.ODScolor}/>
        {/each}
    </LeafletMap>
</div>