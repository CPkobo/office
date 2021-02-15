<script lang="ts">
	import { onMount } from 'svelte'

	import { cxt } from '../store/context'

	import AnalyzeBody from '../components/Analyze/AnalyzeBody.svelte'
	import NgPage from '../components/NgPage.svelte'
	import AdTemplateV from '../components/ads/AdTemplateV.svelte';

	let pageOk: boolean = false

	onMount(() => {
		if ($cxt.getRawContent('src') !== null) {
			pageOk = true
		}
	})

</script>

<svelte:head>
	<title>CATOVIS Office | テキスト抽出・対訳作成・文字数解析 etc...</title>
</svelte:head>

{#if pageOk}
	<div class="columns">
		<div class="column is-9">
			<AnalyzeBody />
		</div>
		<div class="column is-3">
			<AdTemplateV />
		</div>
	</div>
{:else}
	<NgPage />
{/if}