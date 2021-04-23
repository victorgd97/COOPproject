<script>
    import {GeoJSON, LeafletMap, TileLayer, Rectangle} from 'svelte-leafletjs';
    export let list;

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

    list.map(d => {
        d.Bounds = [[d.lat-(d.Subvenció)/2000000,d.long-(d.Subvenció)/2000000],[d.lat+2+(d.Subvenció)/2000000,d.long+2+(d.Subvenció)/2000000]];
        return d;
    })

</script>

<div class="example" style="width: 100%; height: 100%;">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        {#each list as d}
        {#if d.visible === true}
            <Rectangle latLngBounds={d.Bounds} color={d.ODScolor} fillColor={d.ODScolor}/>
        {/if}
        {/each}
    </LeafletMap>
</div>