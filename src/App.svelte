<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import Sankey from './components/Sankey.svelte';
	import data from './data/data.json'
	import data2 from './data/data_dropna.json'

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

	let yes = false;
	
</script>

<main>
	<label>
		<input type=checkbox bind:checked={yes}>
		Hide Sense Dades, Unknown_TipusActor, Unknown_Area
	</label>

	Year:
	<select bind:value={selected}>
		{#each years as year}
			<option value={year}>
				{year}
			</option>
		{/each}
	</select>
	<div class="chart-container" style="height:90vh;">
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
	<!-- <div id="mapid"></div> -->
</main>

<style>
	:global(.graphic) {
		height:200vh;
		margin-bottom:3rem;
	}
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */

	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
    width: 80%;
    height: 80%;
  }

  .highlight{
	  /* background-color: grey; */
	  /* color: white; */
	  padding: 0.5em;
	  /* border-radius: 0.5em; */
  }
</style>