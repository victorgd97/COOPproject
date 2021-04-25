<script>	
	export let x;
	export let y;
	export let width;
	export let height;
	export let tip = 'No data available';
	export let visible = false;
    export let tooltipWidth = 160;
	$: tx = (x < width - tooltipWidth && x >= tooltipWidth / 2) 
		? x - tooltipWidth / 2
		: x < tooltipWidth / 2
		? 0
		: width - tooltipWidth - tooltipWidth / 2;
	
	$: ty = y + 30;
</script>

<div class="tooltip" style="top: {ty}px; left: {tx}px; opacity: {visible ? 1: 0}; width: {tooltipWidth}px">
	{@html tip}
</div>

<style>
	.tooltip {
		position:absolute;
		font-size: 0.75rem;
		color: #fff;
		background:#212121c9;
        box-shadow: rgba(0,0,0,.2) 1px 1px 2px;
        padding:.5rem;
		transition: opacity .5s;
		border: 1px solid #ffffff;
	}
</style>