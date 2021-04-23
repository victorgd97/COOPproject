<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from './components/Sankey.svelte';

	import data from './data/data.js';

	import Mapy from "./components/Map.svelte";
	//	import data from './data-processing/sankey/output/data_ods.json'
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
  
  import Treemap from "./components/TreemapApp.svelte";
  import dataTreemap from './data/dataTreemap_all.json';


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
		</TabPanel>

		<TabPanel>
			<h2>Panell quatre</h2>
			<Treemap />
		</TabPanel>

	  </Tabs>


</main>

<style>
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

</style>