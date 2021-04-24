<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from './components/Sankey.svelte';

	import data from './data/data.js';
	//imports for Choropleth map
 	import munData from './data/municipisPerComarca.json'
	import comarData from './data/comarcas.json'
	import provData from './data/provincias.json'
 	import CatalunyaCom from './data/polygonsComarcas.json'
	import CatalunyaProv from './data/polygonsProvincias.json'
	import ChoroplethMap from './components/ChoroplethMap.svelte';
	import {geoMercator} from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import {extent} from 'd3-array'; 

	//	import data from './data-processing/sankey/output/data_ods.json'
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

	//imports for global map
	import Mapy from "./components/Map.svelte";
	import Mapdata from './data/MapData.json';
	
	//imports for treemap
	import Treemap from "./components/TreemapApp.svelte";
	import dataTreemap from './data/dataTreemap_all.json';

	//Code for choropleth
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

	const projection = geoMercator()

	comarData.map(d => {
		d.codi = d.Codi_comarca.toString();
		return d;
	})
	//geo search for objects on topo and if we do not find the projection we could use geoTransverseMercator
/*	let yearsAOD = ["2015","2016","2017"];
	let GovLevels = ["Municipis","Comarques","Provincies"]
	let selectedYearAOD;
	let selectedGovLev;
	let selectedData = [];
	let DataFiltered = [];
	let topojson;
	let comar = true;

 	comar = comar ? false : true;

	if (selectedGovLev === "Provincies"){
		topojson = CatalunyaProv,
		comar = false
	}
	else {
		topojson = CatalunyaCom,
		comar = true
	}

	function filterGov(d) {
		selectedGovLev = d;
		{if (selectedGovLev === "Municipis"){
			selectedData = munData.map(d => {return {
				Ens: d.Comarcas,
				Codi: +d["Codi comarca"],
				AOD_2015: +d.AOD_2015,
				AOD_2016: +d.AOD_2016, 
				AOD_2017: +d.AOD_2017
					};}
				);
			}
		else if (selectedGovLev === "Comarques"){
			selectedData = comarData.map(d => {return {
				Ens: d.Comarcas,
				Codi: +d["Codi comarca"],
				AOD_2015: +d.AOD_2015,
				AOD_2016: +d.AOD_2016, 
				AOD_2017: +d.AOD_2017 
					};}
     			);
			} 
		else if (selectedGovLev === "Provincies"){
			selectedData = provData.map(d => {return {
				Ens: d.Provincias,
				Codi: +d["Codi provincia"],
				AOD_2015: +d.AOD_2015,
				AOD_2016: +d.AOD_2016, 
				AOD_2017: +d.AOD_2017 
					};}
     			);
			} 
		} 
	}

	function filterAOD(d) {
		selectedYearAOD = d;
		{if (selectedYearAOD === "2015"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: +d.Codi,
				AOD: +d.AOD_2015,
					};}
				);
			}
		else if (selectedYearAOD === "2016"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: +d.Codi,
				AOD: +d.AOD_2016,
					};}
				);
			}
		else if (selectedYearAOD === "2017"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: +d.Codi,
				AOD: +d.AOD_2017,
					};}
				);
			}
		} 
	} */
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
			<!-- <select
			bind:value={selectedGovLev}
			on:change={filterGov(selectedGovLev)}
		>
			{#each GovLevels as GovLev}
				<option value={GovLev}>
					{GovLev}
				</option>
			{/each}
		</select>
			<select
				bind:value={selectedYearAOD}
				on:change={filterAOD(selectedYearAOD)}
			>
				{#each yearsAOD as yearAOD}
					<option value={yearAOD}>
						{yearAOD}
					</option>
				{/each}
			</select> -->
			  <div id="mapidC">
				<ChoroplethMap 
				data={comarData}
				map={CatalunyaCom}
				geo='comarquesWGS84(EPSG4326)' 
				scale={palette()}
				projection={projection}
				join={{data:'codi', map:'COMARCA'}}
				value='AOD_2015'
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