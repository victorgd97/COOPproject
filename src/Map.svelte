<script>
  import { Map, Marker } from "@beyonk/svelte-mapbox";
  
  function onReady() {
    mapComponent.setCenter([48.6767356, 27.7236434], 4.23);
  }
</script>

<Map
  accessToken="pk.eyJ1IjoibXZ0ZWMiLCJhIjoiY2ttbzVkdnhuMDFjMjJvbWE0c2F0bTZybiJ9.H7TNF1Ff7uS8XnmMt9c7vQ"
  style="mapbox://styles/mvtec/ckmo5l59o2tn317ntlzf32krk"
  bind:this={mapComponent}
  on:ready={onReady}
  zoom=2
>
</Map>