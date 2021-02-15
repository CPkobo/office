<script>
	import FileCard from '../components/Files/FileCard.svelte'
	import OptionTabs from '../components/Options/OptionTabs.svelte'
	import AdTemplateV from '../components/ads/AdTemplateV.svelte';

</script>

<style>
	@media (min-width: 480px) {
	}
</style>

<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳作成・文字数解析 etc...</title>
</svelte:head>

<div class="columns">
	<div class="column is-9">
		<FileCard isSrcOrTgt="src" />
		<FileCard isSrcOrTgt="tgt" />
		<OptionTabs mode="align" />
	</div>
	<div class="column is-3">
		<AdTemplateV />
	</div>
</div>
