<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { commonOpt, browserOpt, wwcOpt} from '../store/opt'
  
  const dispatch = createEventDispatcher()
  export let mode: string;
  let btnText: string = '実行'

  let brsOpt = {
    isAutoDown: true,
    use1st: false
  }

  let comOpt: CommonOption = {};

  let wwc: WWCRate = {
    dupli: 0.15,
    over95: 0.3,
    over85: 0.6,
    over75: 0.8,
    over50: 1,
    under49: 1,
  };
  
  onMount(() => {
    brsOpt.isAutoDown = $browserOpt.isAutoDown
    brsOpt.use1st = $browserOpt.use1st

    comOpt.name = $commonOpt.name
    comOpt.withSeparator = $commonOpt.withSeparator
    comOpt.segmentation = $commonOpt.segmentation
    comOpt.delimiters = $commonOpt.delimiters
    comOpt.excluding = $commonOpt.excluding
    comOpt.excludePattern = $commonOpt.excludePattern

    wwc.dupli = $wwcOpt.dupli
    wwc.over95 = $wwcOpt.over95
    wwc.over85 = $wwcOpt.over85
    wwc.over75 = $wwcOpt.over75
    wwc.over50　= $wwcOpt.over50
    wwc.under49 = $wwcOpt.under49
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
    wwcOpt.set(wwc)
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
      <input type="checkbox" class="switch" name="autoDL" bind:checked={brsOpt.isAutoDown}>
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
      <input type="checkbox" class="switch" name="use1st" bind:checked={brsOpt.use1st} />
      <label for="use2st">一番上のファイル名を使用する（原文）</label>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>区切り記号の挿入</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" name="separator" bind:checked={comOpt.withSeparator}>
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
        <input type="checkbox" class="switch" name="segmentation" bind:checked={comOpt.segmentation}>
        <label for="segmentation">{isSegmentation}</label>
      </div>
    </div>
    
    <div class="column is-5">
      <input type="text" class="input is-small" bind:value={comOpt.delimiters} name="delimiters"/>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>正規表現による除外</p>
    </div>
    <div class="column is-3">
      <div class="field">
          <input type="checkbox" class="switch" name="excluding" bind:checked={comOpt.excluding}>
          <label for="excluding">{isExcluding}</label>
      </div>
    </div>
      
    <div class="column is-5">
      <input class="input is-small" type="text" bind:value={comOpt.excludePattern} name="excludePattern"/>
    </div>
  </div>

  {#if mode === "extract"}
  <div class="columns">
    <div class="column is-4 lbl">
      <p>重複による割合</p>
    </div>
    <div class="column is-8">
      <table class="table is-inline">
        <thead>
          <tr>
            <td>重複率</td>
            <td>文字数の重み</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.dupli} /></td>
          </tr>
          <tr>
            <td>95-99%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over95} /></td>
          </tr>
          <tr>
            <td>85-94%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over85} /></td>
          </tr>
          <tr>
            <td>75-84%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over75} /></td>
          </tr>
          <tr>
            <td>50-74%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over50} /></td>
          </tr>
          <tr>
            <td>~49%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.under49} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  {/if}

  <div class="container">
    <button class="button is-fullwidth is-primary" on:click={childExecution}>{btnText}</button>
  </div>

</div>