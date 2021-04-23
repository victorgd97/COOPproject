<script>
	
	import Tooltip from './Tooltip.svelte'
	import { Canvas } from 'svelte-canvas'
	import { extent } from 'd3-array'
	import { scaleLinear } from 'd3-scale'
  import { Delaunay } from 'd3-delaunay'
	import Square from './Square.svelte'
	export let data;
	export let step = 0;
	export let layout;
	export let width;
	export let height;	
let tooltipOptions;
	const margin = { top: 0, right: 0, bottom: 0, left: 0 }
	let picked = null, click = false
	
	$: x = scaleLinear()
				 	.domain(extent(data, d => d.coords[step].x))
					.range([margin.left, width - margin.right])
					.nice()
	$: y = scaleLinear()
					.domain(extent(data, d => d.coords[step].y))
					.range([height - margin.bottom, margin.top])
					.nice()
	
$: delaunay = Delaunay.from(data, d => x(d.coords[step].x), d => y(d.coords[step].y))
</script>
<div class="graphic {layout} absolute">
	<Canvas 
		{width} {height}
		style='cursor: pointer'
		on:mousemove={({ offsetX: x, offsetY: y }) => {
					picked = delaunay.find(x, y); 		
					let tip = (data[picked].data[2]) ;
					tooltipOptions = {x: x, y: y, tip: tip, visible: true}
		}}
		on:mouseout={() => {
			picked = null
			tooltipOptions = {x: -1000, y: -1000, tip: '', visible: false}
		}}
		on:mousedown={() => click = true}
		on:mouseup={() => click = false}
	>


		{#each data as d, i}
					<Square 
				x={(d.coords[step].x)*width/100}
				y={(d.coords[step].y)*height/100} 
				height={(d.coords[step].height)*height/100}
				width={(d.coords[step].width)*width/100}
				fill={d.coords[step].color}
               
			/>
		
		{/each}
	</Canvas>
	<Tooltip {... tooltipOptions} {width} {height} />
</div>







