<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import Sankey from './components/Sankey.svelte';
	import data from './data/SankeyData.json'
	import data2 from './data/SankeyDataDropna.json'

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
	// import data from './data/data.js';

	import Mapy from "./components/Map.svelte";
	//	import data from './data-processing/sankey/output/data_ods.json'
  	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';


	let yes = true;
	
</script>

<main>
	<Tabs>
		<TabList>
		  <Tab>Agents</Tab>
		  <Tab>Països</Tab>
		  <Tab>Canalització</Tab>
		  <Tab>Actuacions</Tab>
		</TabList>
	  
		<TabPanel>
		  <h2>Panel One</h2>
		</TabPanel>
	  
		<TabPanel>
			<div id="mapid">
				<Mapy/>
			</div>
		</TabPanel>
	  
		<TabPanel>
			<h2>Panel Three</h2>
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
			<div class="chart-container" style="height:80vh;">
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
		</TabPanel>

		<TabPanel>
			<h2>Panell quatre</h2>
		</TabPanel>

	  </Tabs>

	<!-- <div id="mapid"></div> -->
</main>

<style>
	:global(.graphic) {
		height:200vh;
		margin-bottom:3rem;
	}

	#mapid {
	 top: 50px;
	 left: 150px;
	 width: 80vw;
	 height: 600px;
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