<script lang="ts">
	export let segment: string | undefined;
</script>

<style>
	nav {
		background-color: teal;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
		color: white;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: white;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		color: white;
		font-weight: bold;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul class="mr-3">
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">抽出／EXTRACT</a></li>
		<li><a aria-current="{segment === 'align' ? 'page' : undefined}" href="align">対訳／ALINGMENT</a></li>
		<li><a aria-current="{segment === 'analyze' ? 'page' : undefined}" href="analyze">解析／ANALYZE</a></li>
		<li><a aria-current="{segment === 'regexp' ? 'page' : undefined}" href="regexp">正規表現／REGEXP</a></li>
		<li><a aria-current="{segment === 'license' ? 'page' : undefined}" href="license">ライセンス／LICENSE</a></li>
		<li><a aria-current="{segment === 'test' ? 'page' : undefined}" href="test">テスト／TEST</a></li>
		<li><a rel=prefetch href="https://catovis.com" target="_blank">CATOVIS TOPへ</a></li>
	</ul>
</nav>
