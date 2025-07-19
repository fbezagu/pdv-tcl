<script lang="ts">
</script>

<div>
	<slot />
</div>

<style lang="scss">
  div {
    background-color: #bde0c2;
    display: inline-block;
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 12px;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
  }
</style>