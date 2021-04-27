<script>
  import Tooltip from "./Tooltip.svelte";
  import Legend from "./Legend.svelte";
  import { feature, mesh } from "topojson-client";
  import { geoPath } from "d3-geo";
  import { get } from "lodash";

  export let data;
  export let map;
  export let scale;
  export let join;
  export let value;
  export let layout;
  export let legend;
  export let projection;
  export let geo;
  export let comar;

  let tooltipOptions, width, height;

  let land = feature(map, map.objects[geo]);
  let border = mesh(map, map.objects[geo], (a, b) => a !== b);
  $: _projection = projection.fitSize([width, height], land);
  $: path = geoPath().projection(_projection);

  $: fill = (_id) => {
    let d = data.find((d) => d[join.data] === _id);
    return d !== undefined ? scale(get(d, value)) : "#E0E0E0";
  };
  $: handleHover = (e, _id) => {
    let x = e.offsetX;
    let y = e.offsetY;
    let visible = true;

    let d = data.find((d) => d[join.data] === _id);
    let tip =
      d !== undefined
        ? comar
        ? "Comarca: " + d.Ens + "<br> AOD: " + d.AOD
        : "Provincia: " + d.Ens + "<br> AOD: " + d.AOD
        : "";
    tooltipOptions = { x: x, y: y, tip: tip, visible: visible };
  };

  $: handleLeave = () => {
    tooltipOptions = { x: -1000, y: -1000, tip: "", visible: false };
  };
</script>

<!-- ADDED HEADLINE AND LEAD -->
<!-- <div>test headline</div>
<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar ipsum bibendum at vulputate. Volutpat blandit cum sit ornare. Magna augue gravida mi a dolor in at urna purus. Facilisi sed quisque neque, ac quam orci. </div> -->

<div
  class="graphic {layout}"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg viewBox="0 0 {width} {height}" {width} {height}>
    <g>
      {#each land.features as feature}
        <path
          d={path(feature)}
          fill={fill(feature.properties[join.map])}
          class="country"
        />
      {/each}
    </g>
    <g>
      <path d={path(border)} class="border" />
    </g>
    <g>
      {#each land.features as feature}
        <path
          d={path(feature)}
          class="selection"
          on:mousemove={(e) => handleHover(e, feature.properties[join.map])}
          on:mouseleave={handleLeave}
        />
      {/each}
    </g>
  </svg>

  <Tooltip {...tooltipOptions} {width} {height} />
  <Legend
    {scale}
    title={legend.title}
    mapWidth={width}
    mapHeight={height}
    format={legend.format}
  />
</div>

<style>
  .border {
    fill: none;
    stroke: #fff;
    stroke-opacity: 0.5;
  }
  .land {
    transition: fill 0.3s;
  }
  .selection {
    fill-opacity: 0;
    stroke: #000;
    stroke-opacity: 0;
    transition: stroke-opacity 0.3s;
  }
  .selection:hover {
    stroke-opacity: 1;
  }
</style>
