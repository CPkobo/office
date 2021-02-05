<script>
	import FileCard from '../components/FileCard.svelte'	
</script>

<style>
	@media (min-width: 480px) {
	}
</style>

<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳作成・文字数解析 etc...</title>
</svelte:head>

<FileCard isSrcOrTgt="src" />
<FileCard isSrcOrTgt="tgt" />
