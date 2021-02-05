<script>
	import FileCard from '../components/FileCard.svelte'	
	// import OptionCard from '../components/OptionCard.svelte'
	import OptionTabs from '../components/OptionTabs.svelte'
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
	<div class="column is-3">
		<p>ads here</p>
	</div>
</div>