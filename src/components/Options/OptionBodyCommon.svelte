<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { commonOpt, browserOpt } from '../../store/opt'
  import { srcs } from '../../store/files'
  
  const dispatch = createEventDispatcher()
  let btnText: string = '実行'

  let brsOpt = {
    isAutoDown: true,
    hasAd: true,
  }

  let comOpt: CommonOption = {};
  
  onMount(() => {
    brsOpt.isAutoDown = $browserOpt.isAutoDown
    brsOpt.hasAd = $browserOpt.hasAd

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

  // $: isAutoDL = brsOpt.isAutoDown ? 'ダウンロードする' : 'ダウンロードしない'
  // $: isWithSeparator = comOpt.withSeparator ? '挿入する' : '挿入しない'
  // $: isSegmentation = comOpt.segmentation ? '分割する' : '分割しない'
  // $: isExcluding = comOpt.excluding ? '除外する' : '除外しない'

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
  <div class="columns mt-2">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">自動ダウンロード</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="control">
        <button class="button" class:is-focused={brsOpt.isAutoDown} on:click={() => {brsOpt.isAutoDown = true}}>する</button>
        <button class="button" class:is-focused={!brsOpt.isAutoDown} on:click={() => {brsOpt.isAutoDown = false}}>しない</button>
      </div>
      <!-- <input type="checkbox" id="autoDL" bind:checked={brsOpt.isAutoDown}>
      <label for="autoDL">{isAutoDL}</label> -->
    </div>
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">出力ファイル名</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="select">
        <select bind:value={comOpt.name}>
          <option value='Result'>Result</option>
          {#each $srcs.order as ox}
            <option value={$srcs.files[ox].name}>{$srcs.files[ox].name}</option>  
          {/each}
        </select>
      </div>
    </div>
    <!-- <div class="column is-3 ml-3">
      <input class="input" type="text" bind:value={comOpt.name} />
    </div>
    <div class="column is-5 field">
      <input type="checkbox" id="use1st" bind:checked={brsOpt.use1st} on:change={setUse1st}/>
      <label for="use1st">一番上のファイル名を使用する（原文）</label>
    </div> -->
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">区切り記号の挿入</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="field">
        <button class="button" class:is-focused={comOpt.withSeparator} on:click={() => {comOpt.withSeparator = true}}>する</button>
        <button class="button" class:is-focused={!comOpt.withSeparator} on:click={() => {comOpt.withSeparator = false}}>しない</button>  
        <!-- <input type="checkbox" id="separator" bind:checked={comOpt.withSeparator}>
        <label for="separator">{isWithSeparator}</label> -->
      </div>
    </div>
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">セグメンテーション</h3>
    </div>
    <div class="column is-3 ml-3">
      <div class="field">
        <button class="button" class:is-focused={comOpt.segmentation} on:click={() => {comOpt.segmentation = true}}>する</button>
        <button class="button" class:is-focused={!comOpt.segmentation} on:click={() => {comOpt.segmentation = false}}>しない</button>  
        <!-- <input type="checkbox" id="segmentation" bind:checked={comOpt.segmentation}>
        <label for="segmentation">{isSegmentation}</label> -->
      </div>
    </div>
    
    <div class="column is-5">
      <input type="text" class="input" disabled={!comOpt.segmentation} bind:value={comOpt.delimiters} id="delimiters"/>
    </div>
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">正規表現による除外</h3>
    </div>
    <div class="column is-3 ml-3">
      <div class="field">
        <button class="button" class:is-focused={comOpt.excluding} on:click={() => {comOpt.excluding = true}}>する</button>
        <button class="button" class:is-focused={!comOpt.excluding} on:click={() => {comOpt.excluding = false}}>しない</button>  
          <!-- <input type="checkbox" class="switch" id="excluding" bind:checked={comOpt.excluding}>
          <label for="excluding">{isExcluding}</label> -->
      </div>
    </div>
    <div class="column is-5">
      <input class="input" type="text" disabled={!comOpt.excluding} bind:value={comOpt.excludePattern} id="excludePattern"/>
    </div>
  </div>

  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>{btnText}</button>
  </div>

</div>
