<script>
import FileCard from '../components/Files/FileCard.svelte'
import OptionTabs from '../components/Options/OptionTabs.svelte'
import FooterAdSet from '../components/ads/FooterAdSet.svelte';
import AdColumn from '../components/ads/AdColumn.svelte';
</script>

<style>
	@media (min-width: 480px) {
	}
</style>

<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳表作成・文字数解析 etc...</title>
</svelte:head>

<h1 class="title is-3">対訳表作成モード</h1>
<div class="columns">
	<div class="column is-9">
		<FileCard isSrcOrTgt="src" />
		<FileCard isSrcOrTgt="tgt" />
		<OptionTabs mode="align" />
	</div>
	<AdColumn />
</div>
<FooterAdSet />