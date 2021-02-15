<script lang="ts">
	import LinkMenus from '../components/LinkMenus.svelte'
</script>

<svelte:head>
	<script id="_bownow_ts">
		var _bownow_ts = document.createElement('script');
		_bownow_ts.charset = 'utf-8';
		_bownow_ts.src = 'https://contents.bownow.jp/js/UTC_f5798cb298823cc9ca4f/trace.js';
		document.getElementsByTagName('head')[0].appendChild(_bownow_ts);
		</script>
</svelte:head>

<style>
	main {
		position: relative;
		/* max-width: 56em; */
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<LinkMenus />

<main>
	<slot></slot>
</main>