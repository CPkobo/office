<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { commonOpt, browserOpt} from '../../store/opt'
  
  const dispatch = createEventDispatcher()
  let btnText: string = '実行'

  let brsOpt = {
    isAutoDown: true,
    use1st: false
  }

  let comOpt: CommonOption = {};
  
  onMount(() => {
    brsOpt.isAutoDown = $browserOpt.isAutoDown
    brsOpt.use1st = $browserOpt.use1st

    comOpt.name = $commonOpt.name
    comOpt.withSeparator = $commonOpt.withSeparator
    comOpt.segmentation = $commonOpt.segmentation
    comOpt.delimiters = $commonOpt.delimiters
    comOpt.excluding = $commonOpt.excluding
    comOpt.excludePattern = $commonOpt.excludePattern
  })

  onDestroy(() => {
    setOptions()
  })

  $: isAutoDL = brsOpt.isAutoDown ? 'ダウンロードする' : 'ダウンロードしない'
  $: isWithSeparator = comOpt.withSeparator ? '挿入する' : '挿入しない'
  $: isSegmentation = comOpt.segmentation ? '分割する' : '分割しない'
  $: isExcluding = comOpt.excluding ? '除外する' : '除外しない'

  function setOptions(): void {
    browserOpt.set(brsOpt)
    commonOpt.set(comOpt)
  }

  function childExecution(): void {
    setOptions()
    btnText = '読み込み中...'
    dispatch('execute')
  }

</script>

<div class="container p-5">
  <div class="columns">
    <div class="column is-4 lbl">
      <p>自動ダウンロード</p>
    </div>
    <div class="column is-8">
      <input type="checkbox" class="switch" id="autoDL" bind:checked={brsOpt.isAutoDown}>
      <label for="autoDL">{isAutoDL}</label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>出力ファイル名</p>
    </div>
    <div class="column is-3">
      <input class="input is-small" type="text" bind:value={comOpt.name} />
    </div>
    <div class="column is-5 field">
      <input type="checkbox" class="switch" id="use1st" bind:checked={brsOpt.use1st} />
      <label for="use1st">一番上のファイル名を使用する（原文）</label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>区切り記号の挿入</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" id="separator" bind:checked={comOpt.withSeparator}>
        <label for="separator">{isWithSeparator}</label>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>セグメンテーション</p>
    </div>
    <div class="column is-3">
      <div class="field">
        <input type="checkbox" class="switch" id="segmentation" bind:checked={comOpt.segmentation}>
        <label for="segmentation">{isSegmentation}</label>
      </div>
    </div>
    
    <div class="column is-5">
      <input type="text" class="input is-small" bind:value={comOpt.delimiters} id="delimiters"/>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>正規表現による除外</p>
    </div>
    <div class="column is-3">
      <div class="field">
          <input type="checkbox" class="switch" id="excluding" bind:checked={comOpt.excluding}>
          <label for="excluding">{isExcluding}</label>
      </div>
    </div>
      
    <div class="column is-5">
      <input class="input is-small" type="text" bind:value={comOpt.excludePattern} id="excludePattern"/>
    </div>
  </div>

  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>{btnText}</button>
  </div>

</div>