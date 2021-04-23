<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from './components/Sankey.svelte';

	import data from './data/data.js';
	//imports for Choropleth map
	import comarData from './data/comarques_data.json'
	import Catalunya from './data/comarques.json'
	import Choropleth from "./components/ChoroplethMap.svelte";
	import { geoWinkel3 } from 'd3-geo-projection';
	import { scaleQuantize } from 'd3-scale';
	import {extent} from 'd3-array';

	//	import data from './data-processing/sankey/output/data_ods.json'
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	//imports for global map
	import Mapy from "./components/Map.svelte";
	import Mapdata from './data/MapData.json';
import ChoroplethMap from './components/ChoroplethMap.svelte';

	//Code for choropleth
	comarData.map(d => {
		d.AOD_2015 = ["d.Ingressos_propis_2015/d.07_2015"]
		return d;
	})

	const palette = () => {
		const _extent = extent(comarData, d => d.AOD_2015)
		const max = _extent[0] > _extent[1] ? _extent[0] : _extent[1];
		const min = _extent[0] < _extent[1] ? _extent[0] : _extent[1];
		const d = (max-min)/9;
		return scaleQuantize()
				.range(['#ffe461', '#ffc755', '#fea94d', '#f68c4a', '#ea704a', '#da554e', '#c73a55', '#ae1f5f', '#90006c'])
				.domain([... Array(9)].map((_d, i) => min + d * i))
				.nice();
	}

	const projection = geoWinkel3()
				.rotate([-11, 0])
				.precision(1);
	
	let comarDataFiltered = comarData;
	let yearsAOD = ["2015","2016","2017"];
	let selectedYearAOD;

	function filterAOD(d) {
		selectedYearAOD = d;
		{if (selectedYearAOD === "2015"){
			comarDataFiltered = comarData.map(d => {return {
				comarca: d.Ens_Local,
				Codi_comarca: d.Codi_comarca,
				AOD: +d["07_2015"],
				Ingressos_propis_2015: d.Ingressos_propis_2015, 
					};}
				);
			}
		else if (selectedYearAOD === "2016"){
			comarDataFiltered = comarData.map(d => {return {
				comarca: d.Ens_Local,
				Codi_comarca: +d.Codi_comarca,
				AOD: +d["07_2016"],
				Ingressos_propis_2015: +d.Ingressos_propis_2015, 
					};}
     			);
			} 
		else if (selectedYearAOD === "2017"){
			comarDataFiltered = comarData.map(d => {return {
				comarca: d.Ens_Local,
				Codi_comarca: +d.Codi_comarca,
				AOD: +d["07_2017"],
				Ingressos_propis_2015: +d.Ingressos_propis_2015, 
					};}
     			);
			}
		} 
	}
	//Code for global map
	Mapdata.map(d => {
		d.visible = true;
		return d;
	})

	let listFiltered = Mapdata;
	let years = [...new Set(Mapdata.map((d) => d.Any))];
	let selectedYear;


	function filter(d) {
		selectedYear = d;
		listFiltered =
    		Mapdata.map((d) => {if (d.Any === selectedYear) {
        	    d.visible = true;
        			} else {
           		d.visible = false;
        	}
        	return d;
        });
	}
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
			<select
				bind:value={selectedYearAOD}
				on:change={filterAOD(selectedYearAOD)}
			>
				{#each yearsAOD as yearAOD}
					<option value={yearAOD}>
						{yearAOD}
					</option>
				{/each}
			</select>
			<div id="mapidC">
				<ChoroplethMap 
				data={comarDataFiltered}
				map={Catalunya}
				geo='countries'
				scale={palette()}
				projection={projection}
				join={{data:'Codi_comarca', map:'COMARCA'}}
				value={comarDataFiltered.AOD}
				legend={{title: '', format: ''}}
				layout='wide'
			/>
			</div>
		</TabPanel>
	  
		<TabPanel>
			<select
          		bind:value={selectedYear}
          		on:change={filter(selectedYear)}
        	>
				{#each years as year}
					<option value={year}>
						{year}
            		</option>
          		{/each}
        	</select>
			<div id="mapid">
				<Mapy
				list={listFiltered}
				/>
			</div>
		</TabPanel>
	  
		<TabPanel>
		  <h2>Panel Three</h2>
		</TabPanel>

		<TabPanel>
			<h2>Panell quatre</h2>
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
	
	#mapidC {
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