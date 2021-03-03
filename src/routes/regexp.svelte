<script>
import SegPlayground from '../components/Reg/SegPlayground.svelte'	
import ExclusionPlayground from '../components/Reg/ExclusionPlayground.svelte'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte';
import FooterAdSet from '../components/ads/FooterAdSet.svelte';
import AdColumn from '../components/ads/AdColumn.svelte';
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
	<AdColumn />
</div>
<FooterAdSet />