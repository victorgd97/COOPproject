<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import Sankey from './Sankey.svelte';
	import data from '../data/SankeyData.json'
	import data2 from '../data/SankeyDataDropna.json'

	let years = Object.keys(data);
	let selected = '2015';
	let govLevel = ['Gene', 'Province', 'Region', 'Municipal'];
	let area = ['Africa SudSahariana', 'Mediterrania', 'America del Sud', 'America Central i Carib', 'Àsia', 'Europa', 'Global','Sense Dades', 'Unknown_Area']
	let tipusActor = ['ONG', 'Agent empresarial', 'Universitats', 'Diversos actors',
       'Administracions catalanes', 'Centre de recerca',
       'Federacions i coordinadores', 'Administracions del Sud',
       'Multilaterals', 'Unknown_TipusActor'] 
	let govLevelColor = "#7a0177", tipusActorColor="#c51b8a", areaColor='#f768a1', paisColor='#fbb4b9';
	let nodeColoring = d => {
		return govLevel.includes(d)? govLevelColor
			  :area.includes(d)? areaColor
			  :tipusActor.includes(d)? tipusActorColor
			  : paisColor;
	}
  	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';


	let yes = true;
	
</script>

<main>
	<div class="filtering">	
		<select bind:value={selected}>
			{#each years as year}
				<option value={year}>
					{year}
				</option>
			{/each}
		</select>	
		<label>
			<input type=checkbox bind:checked={yes}>
			Hide Sense Dades, Unknown_TipusActor, Unknown_Area
		</label>
	</div>
	<div class="chart-container" style="height:80vh">
		{#if yes}
			<LayerCake
			data = {data2[selected]}
		>
			<Svg>
				<Sankey 
					colorNodes={d => nodeColoring(d.id)}
					colorLinks={d => '#e3e3e3'} 
				/>
			</Svg>
			<Html>
				<div>
					<span class="highlight" style="color:{govLevelColor}"> govLevel </span>|
					<span class="highlight" style="color:{tipusActorColor}"> tipusActor </span>| 
					<span class="highlight" style="color:{areaColor}"> Area </span>|
					<span class="highlight" style="color:{paisColor}"> Pais </span> 
				</div>
			</Html>
		</LayerCake>
		{:else}
		<LayerCake
			data = {data[selected]}
		>
			<Svg>
				<Sankey 
					colorNodes={d => nodeColoring(d.id)}
					colorLinks={d => '#e3e3e3'} 
				/>
			</Svg>
			<Html>
				<div>
					<span class="highlight" style="color:{govLevelColor}"> govLevel </span>|
					<span class="highlight" style="color:{tipusActorColor}"> tipusActor </span>| 
					<span class="highlight" style="color:{areaColor}"> Area </span>|
					<span class="highlight" style="color:{paisColor}"> Pais </span> 
				</div>
			</Html>
		</LayerCake>
		{/if}
	</div>

</main>

<style>

	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
	width:95vw;
	margin: auto;
	padding-bottom: 3em;
  }

  .highlight{
	  padding-right: 0.5em;
  }

  .filtering {
	width: 95vw;
	margin: auto;
  }

  label {
	display: inline;
	padding-left: 1em;
  }
</style>