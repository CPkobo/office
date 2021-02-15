<script lang="ts">
  import { fade } from 'svelte/transition'

  let menuOn: boolean = false
  let subtitle: string = ''
  $: cursolDirection = menuOn ? '▼' : '▶'

  function changeSubtitle(sub) {
    menuOn = false
    subtitle = sub
  }

</script>

<nav class="panel" id="menu">
  <div class="columns is-teal panel-heading">
    <div class="column is-10">
      <p on:click={() => menuOn = !menuOn}>{cursolDirection} CATOVIS Office メニュー<span id="subtitle">{subtitle}</span></p>
    </div>
    <div class="column is-2">
      <a class="in-nav" href="https://catovis.com">
        CAOTIVSトップへ
      </a>
    </div>
  </div>
  {#if menuOn}
    <div in:fade>
      <a class="panel-block" href="/extract" on:click={() => changeSubtitle('テキスト抽出')}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        テキスト抽出 | Extract
      </a>
      <a class="panel-block" href="/align" on:click={() => changeSubtitle('対訳表作成')}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        対訳表作成 | Alignment
      </a>
      <a class="panel-block" href="/analyze" on:click={() => changeSubtitle('解析')}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        解析 ｜ Analyze
      </a>
      <a class="panel-block" href="/regexp" on:click={() => changeSubtitle('正規表現')}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        正規表現プレイグラウンド ｜ RegExps
      </a>
      <a class="panel-block" href="/diff" on:click={() => changeSubtitle('差分抽出')}>
        <span class="panel-icon">
          <i class="fas fa-code-branch" aria-hidden="true"></i>
        </span>
        差分抽出 ｜ Diff
      </a>
      <a class="panel-block" href="/license" on:click={() => changeSubtitle('ライセンス')}>
        <span class="panel-icon">
          <i class="fas fa-code-branch" aria-hidden="true"></i>
        </span>
        ライセンス ｜ License
      </a>
      <a class="panel-block" href="/" on:click={() => changeSubtitle('')}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        CATOVIS Office スタートページ
      </a>
    </div>
  {/if}
</nav>

<style>
  	a.in-nav {
		text-decoration: none;
		color: white;
		font-weight: bold;
		display: block;
	}

  span#subtitle {
    margin-left: 2rem;
  }
</style>