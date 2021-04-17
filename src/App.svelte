<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from './components/Sankey.svelte';

	// import data from './data/data.js';

	import data from './data-processing/sankey/output/data_ods.json'

	console.log(data['2015']);
</script>

<main>
	<!-- <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->

	<div class="chart-container" style="height:80vh;">
		<LayerCake
			data = {data['2015']}
		>
			<Svg>
			<Sankey
						colorNodes={d => '#00bbff'}
				colorLinks={d => '#00bbff35'}
					/>
			</Svg>
		</LayerCake>
	</div>
	<div id="mapid"></div>
</main>

<style>
	#mapid {
	 width: 100vw;
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
</style>