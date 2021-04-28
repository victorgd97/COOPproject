<script>
 
import data from "../data/dataTreemap_all.json"
import data2 from "../data/TreemapDataYearly.json"

import world from '../data/world.json';

import Tooltip from './Tooltip.svelte';
import ScatterCanvas from './ScatterCanvas.svelte'
import Map from "./TreemapMap.svelte"
import { geoNaturalEarth1, geoPath } from "d3-geo";
       
 const projection = geoNaturalEarth1()
 let scatterStep=0	 ;
 
   let width
   $: height = width * .45;
   
</script>
<main>
   
   <div class='col'>
       <button title="Geolocalitzaci� dels projectes" on:click={() => scatterStep = 0}>Global map</button>
       <button title="Distribucio de les subvencions segons els Objectius pel Desenvolupament Sostenible"on:click={() => scatterStep = 1}> by Sustainable Development Goals</button>
   </div>	
   
   <div class="container">
   {#if width}
   <ScatterCanvas
       data={data}
       layout='wide'
       step={scatterStep}
       mark='square'
       {width}
       {height}
       />	
       {/if}
{#if scatterStep === 0}
<Map
       map={world}
       geo='countries'	
       projection={projection}
   layout='wide'
       bind:width={width}
       {height}
       />		
{/if}
   </div>
   
</main>


<style>	 
   main {
       padding: 1em;
       margin: 0 auto;
   }
   .container { position: relative}
   :global(.graphic) {
       /* height:50vh; */
       margin-bottom:3rem;
   }
   :global(.map) {
       /* height:50vh; */
       width: 200vh;
   }
   :global(.absolute) {
       position:absolute;
       top:0;
       left:0;
   }
   
</style>