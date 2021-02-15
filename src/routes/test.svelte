<script>
	import AdTemplateV from '../components/ads/AdTemplateV.svelte';

</script>


<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳作成・文字数解析 etc...</title>
</svelte:head>

<div class="columns is-flex">
	<div class="column is-two-thirds">
		<div class="card" id="test">
		</div>
	</div>
	<div class="column is-one-third is-flex">
		<!-- <div class="card" id="test2">
		</div> -->
		<AdTemplateV />
	</div>
</div>

<style>
	div#test {
		height: 2000px;
		background-color: thistle;
	}

	/* div#test2 {
		width: 99%;
		height: 200px;
		display: flex;
    position: sticky;
    top: 125px;
    border: 1px solid;
	} */
</style>