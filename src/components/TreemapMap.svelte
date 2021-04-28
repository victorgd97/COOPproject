<script>
	import Tooltip from './Tooltip.svelte';
	import { feature, mesh } from 'topojson-client';
	import { geoPath } from 'd3-geo';
	export let map;
  export let layout;
  export let projection;
  export let geo;
	export let width;
	export let height;
	
	const land = feature(map, map.objects[geo]);
	const border = mesh(map, map.objects[geo], (a, b) => a !== b);
	$: _projection = projection
			.fitSize([width, height],land);
  $: path = geoPath().projection(_projection);
	

	
</script>

<div class="graphic {layout}" bind:clientWidth={width}>
	<svg viewBox="0 0 {width} {height}" {width} {height}>
		<g>
			{#each land.features as feature}
			<path 
				d={path(feature)}			
				class='country'
				fill="none"
				stroke="grey"
				stroke-size="3"
				/>
			{/each}
		</g>
		
	
	</svg>
</div>

<style>

</style>