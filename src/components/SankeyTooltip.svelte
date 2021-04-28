<script>
    export let evt = {};
    export let offset = 35;
  </script>
  
  <style>
    /* .tooltip {
      position: absolute;
      width: 150px;
      border: 1px solid #ccc;
          font-size: 13px;
      background: rgba(255, 255, 255, 0.85);
      transform: translate(-50%, -100%);
      padding: 5px;
      z-index: 15;
    } */

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
  
  {#if evt.detail}
    <div
      class="tooltip"
      style="
        top:{evt.detail.e.layerY + (offset/2)}px;
        left:{evt.detail.e.layerX}px;
      "
    >
      <slot detail={evt.detail}></slot>
    </div>
  {/if}
  