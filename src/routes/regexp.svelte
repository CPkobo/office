<script>
	import SegPlayground from '../components/Reg/SegPlayground.svelte'	
	import ExclusionPlayground from '../components/Reg/ExclusionPlayground.svelte'
	// import AdTemplateV from '../components/ads/AdTemplateV.svelte';	
	import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte';
	import AdRakutenSearch from '../components/ads/AdRakutenSearch.svelte';
</script>

<style>
</style>

<svelte:head>
	<title>CATOVIS Office | 正規表現プレイグラウンド</title>
</svelte:head>

<div class="columns">
	<div class="column is-9">
		<SegPlayground />
		<ExclusionPlayground />
	</div>
	<div class="column is-3">
		<!-- <AdTemplateV /> -->
		<AdRakutenVertical />
	</div>
</div>
<AdRakutenSearch />