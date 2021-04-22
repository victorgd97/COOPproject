<script>
	import { getContext } from 'svelte';
	import * as Sankey from 'd3-sankey';

	const { data, width, height } = getContext('LayerCake');
	
	/* --------------------------------------------
	 * Allow for dynamic coloring
	 */
	export let colorLinks = d => 'rgba(0, 0, 0, .2)';
	export let colorNodes = d => 'green';
	export let colorText = d => '#263238';
	export let colorText2 = d => { 
		if(d.y1 - d.y0 < (fontSize/3)) {return 'rgba(0, 0, 0, 0)'} else {return '#263238'}
	}

	export let nodeWidth = 15;
	export let nodePadding = 5;
    export let linkSort = null;
    export let nodeSort = null;
	export let nodeId = d => d.id;
	export let nodeAlign = Sankey.sankeyJustify;

	$: sankey = Sankey.sankey()
		.nodeAlign(nodeAlign)
		.nodeWidth(nodeWidth)
		.nodePadding(nodePadding)
		.nodeId(nodeId)
		.size([$width, $height])
        .linkSort(linkSort)
        .nodeSort(nodeSort); //creates sankey nodes as ordered in the data

	$: sankeyData = sankey($data);

	$: link = Sankey.sankeyLinkHorizontal();

	$: fontSize = $width <= 320 ? 8 : 12;
	

</script>

<style>
	text {
		pointer-events: none;
	}
</style>

<g class="sankey-layer">
	<g class='link-group'>
		{#each sankeyData.links as d}
			<path
				d={link(d)}
				fill='none'
				stroke={colorLinks(d)}
				stroke-opacity='0.5'
				stroke-width={d.width} 
			/>
			<text
				x={(d.source.x0 + d.target.x0) / 2}
				y={(d.y1 + d.y0) / 2}
				dy="{(fontSize / 2) - 2}"
				style="fill: {colorText(d)};
							font-size: {fontSize}px;
							text-anchor: middle">
			</text>
		{/each}
	</g>
	<g class='rect-group'>
		{#each sankeyData.nodes as d, i}
			<rect
				x={d.x0}
				y={d.y0}
				height={d.y1 - d.y0}
				width={d.x1 - d.x0}
				fill={colorNodes(d)} 
				/>
			<text
				x={d.x0 < $width / 4 ? d.x1 + 6 : d.x0 - 6}
				y={(d.y1 + d.y0) / 2}
				dy="{(fontSize / 2) - 2}"
				style="fill: {colorText2(d)};
							font-size: {fontSize}px;
							text-anchor: {d.x0 < $width / 4 ? 'start' : 'end'};">
				{d.id}
			</text>
		{/each}
	</g>
</g>
