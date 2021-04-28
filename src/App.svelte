<script>
	import { LayerCake, Svg } from "layercake";

	import Sankey from "./components/SankeyApp.svelte";

	let evt;
	let hideTooltip = true;

	import data from "./data/data.js";
	//imports for Choropleth map
	import munData from "./data/municipisPerComarca.json";
	import comarData from "./data/comarcas.json";
	import provData from "./data/provincias.json";
	import CatalunyaCom from "./data/polygonsComarcas.json";
	import CatalunyaProv from "./data/polygonsProvincias.json";
	import ChoroplethMap from "./components/ChoroplethMap.svelte";
	import { geoMercator } from "d3-geo";
	import { scaleQuantile } from "d3-scale";
	import { extent } from "d3-array";

	import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

	//imports for global map
	import Mapy from "./components/Map.svelte";
	import Mapdata from "./data/MapData.json";

	//imports for treemap
	import Treemap from "./components/TreemapApp.svelte";
	import dataTreemap from "./data/dataTreemap_all.json";

	//Code for choropleth
	const projection = geoMercator();

	//geo search for objects on topo and if we do not find the projection we could use geoTransverseMercator
	let yearsAOD = ["2015", "2016", "2017"];
	let GovLevels = ["Municipis", "Comarques", "Provincies"];
	let selectedYearAOD;
	let selectedGovLev;
	let selectedData = munData.map((d) => {
		return {
			Ens: d.Comarcas,
			Codi: d["Codi comarca"].toString(),
			AOD: +d.AOD_2015,
		};
	});
	//let DataFiltered = selectedData;
	let comar = true;

	let palette = () => {
		let _extent = extent(comarData, (d) => d.AOD_2015);
		let max = _extent[0] > _extent[1] ? _extent[0] : _extent[1];
		let min = _extent[0] < _extent[1] ? _extent[0] : _extent[1];
		let d = (max - min) / 9;
		return scaleQuantile()
			.range([
				"#ffe461",
				"#ffc755",
				"#fea94d",
				"#f68c4a",
				"#ea704a",
				"#da554e",
				"#c73a55",
				"#ae1f5f",
				"#90006c",
			])
			.domain([...Array(9)].map((_d, i) => min + d * i));
	};

	function filterGov(selectedGovLev, selectedYearAOD) {
		{
			if (selectedGovLev === "Municipis" && selectedYearAOD === "2015") {
				selectedData = munData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi comarca"].toString(),
						AOD: +d.AOD_2015,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Municipis" &&
				selectedYearAOD === "2016"
			) {
				selectedData = munData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi comarca"].toString(),
						AOD: +d.AOD_2016,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Municipis" &&
				selectedYearAOD === "2017"
			) {
				selectedData = munData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi comarca"].toString(),
						AOD: +d.AOD_2017,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Comarques" &&
				selectedYearAOD === "2015"
			) {
				selectedData = comarData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi_comarca"].toString(),
						AOD: +d.AOD_2015,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Comarques" &&
				selectedYearAOD === "2016"
			) {
				selectedData = comarData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi_comarca"].toString(),
						AOD: +d.AOD_2016,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Comarques" &&
				selectedYearAOD === "2017"
			) {
				selectedData = comarData.map((d) => {
					return {
						Ens: d.Comarcas,
						Codi: d["Codi_comarca"].toString(),
						AOD: +d.AOD_2017,
					};
				});
				comar = true;
			} else if (
				selectedGovLev === "Provincies" &&
				selectedYearAOD === "2015"
			) {
				selectedData = provData.map((d) => {
					return {
						Ens: d.Provincias,
						Codi: d["Codi provincia"],
						AOD: +d.AOD_2015,
					};
				});
				comar = false;
			} else if (
				selectedGovLev === "Provincies" &&
				selectedYearAOD === "2016"
			) {
				selectedData = provData.map((d) => {
					return {
						Ens: d.Provincias,
						Codi: d["Codi provincia"],
						AOD: +d.AOD_2016,
					};
				});
				comar = false;
			} else if (
				selectedGovLev === "Provincies" &&
				selectedYearAOD === "2017"
			) {
				selectedData = provData.map((d) => {
					return {
						Ens: d.Provincias,
						Codi: d["Codi provincia"],
						AOD: +d.AOD_2017,
					};
				});
				comar = false;
			}
		}
	}

	/* 	function filterAOD(d) {
		selectedYearAOD = d;
		{if (selectedYearAOD === "2015"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: d.Codi,
				AOD: +d.AOD_2015,
					};}
				);
			}
		else if (selectedYearAOD === "2016"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: d.Codi,
				AOD: +d.AOD_2016,
					};}
				);
			}
		else if (selectedYearAOD === "2017"){
			DataFiltered = selectedData.map(d => {return {
				Ens: d.Ens,
				Codi: d.Codi,
				AOD: +d.AOD_2017,
					};}
				);
			}
		}
	}  */

	//Code for global map
	Mapdata.map((d) => {
		d.visible = true;
		return d;
	});

	let listFiltered = Mapdata;
	let years = [...new Set(Mapdata.map((d) => d.Any))];
	let selectedYear;

	function filter(d) {
		selectedYear = d;
		listFiltered = Mapdata.map((d) => {
			if (d.Any === selectedYear) {
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
		<div class="tabnavbar">
			<TabList>
				<Tab>Agents</Tab>
				<Tab>Països</Tab>
				<Tab>Canalització</Tab>
				<Tab>Actuacions</Tab>
			</TabList>
		</div>

		<TabPanel>
			<select
				bind:value={selectedGovLev}
				on:change={filterGov(selectedGovLev, selectedYearAOD)}
			>
				{#each GovLevels as GovLev}
					<option value={GovLev}>
						{GovLev}
					</option>
				{/each}
			</select>
			<select
				bind:value={selectedYearAOD}
				on:change={filterGov(selectedGovLev, selectedYearAOD)}
			>
				{#each yearsAOD as yearAOD}
					<option value={yearAOD}>
						{yearAOD}
					</option>
				{/each}
			</select>
			<div class="description">
				<!-- <h1>Agents</h1> -->
				<p>
					<b>Choropleth map of Catalunya.</b> The unit of interest are
					the administrative divisions and the interest is the geographical
					distribution of ODA expenses makes a map a natural choice.
				</p>
			</div>
			<div id="mapidC">
				{#if comar}
					<ChoroplethMap
						data={selectedData}
						map={CatalunyaCom}
						geo={"comarquesWGS84(EPSG4326)"}
						{comar}
						scale={palette()}
						{projection}
						join={{ data: "Codi", map: "COMARCA" }}
						value="AOD"
						legend={{ title: "", format: "0.00" }}
						layout="wide"
					/>
				{/if}
				{#if comar === false}
					<ChoroplethMap
						data={selectedData}
						map={CatalunyaProv}
						geo={"provinciesWGS84(EPSG4326)"}
						{comar}
						scale={palette()}
						{projection}
						join={{ data: "Codi", map: "CODIPROV" }}
						value="AOD"
						legend={{ title: "", format: "0.00" }}
						layout="wide"
					/>
				{/if}
			</div>
		</TabPanel>

		<TabPanel>
			<div class="description">
				<!-- <h1>Països</h1> -->
				<p>
					<b>Global map that shows the information per country.</b> The
					information is on what country the money is used. Details at
					the level of project.
				</p>
			</div>
			<select bind:value={selectedYear} on:change={filter(selectedYear)}>
				{#each years as year}
					<option value={year}>
						{year}
					</option>
				{/each}
			</select>
			<div id="mapid">
				<Mapy list={listFiltered} />
			</div>
		</TabPanel>

		<TabPanel>
			<div class="description">
				<!-- <h1>Canalització</h1> -->
				<p>
					<b>Sankey diagram between donors and receivers.</b> This represents
					the flow and distribution of ODA expenses
				</p>
			</div>
			<Sankey />
		</TabPanel>

		<TabPanel>
			<div class="description">
				<!-- <h1>Actuacions</h1> -->
				<p>
					<b>Treemap (with transition to global map)</b> Area of squares
					is proportional to expenditure. Shows the distribution according
					to the Sustainable development goals. Uses the official color
					coding plus extra greys for data with no allocation.. Arranged
					as to look like a stacked bar where the individual projects can
					be seen.
				</p>
			</div>
			<Treemap />
		</TabPanel>
	</Tabs>

	<p class="footer">
		Designed and developed by Núria Altimir, Spe Chen, Víctor Garcia and Santiago Salcido in the
		<a href="http://www.mastervisualtoolsudg.com/" target="blank">
			Master’s program in Visual Tools to Empower Citizens</a
		>
	</p>
</main>

<style>
	#mapid {
		top: 50px;
		left: 150px;
		width: 100vw;
		height: 700px;
	}

	#mapidC {
		top: 50px;
		left: 150px;
		width: 80vw;
		height: 600px;
	}

	.description {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0px;
		margin: 20px 10% 20px 10%;
	}

	.tabnavbar {
		background-color: #ffffff;
		box-shadow: 0px 0px 5px #bdbdbd;
	}
	.footer {
		text-align: center;
		font-size: 0.8em;
		width: 75%;
		margin: auto;
		padding-top: 5em;
		padding-bottom: 5em;
		color: gray;
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
