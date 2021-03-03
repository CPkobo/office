<script>
import FileCard from '../components/Files/FileCard.svelte'	
import OptionTabs from '../components/Options/OptionTabs.svelte'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte';
import FooterAdSet from '../components/ads/FooterAdSet.svelte';
import AdColumn from '../components/ads/AdColumn.svelte';
</script>

<style>
</style>

<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳作成・文字数解析 etc...</title>
</svelte:head>

<div class="columns">
	<div class="column is-9">
		<FileCard isSrcOrTgt="src" />
		<OptionTabs mode="extract" />
	</div>
	<AdColumn />
</div>
<FooterAdSet />