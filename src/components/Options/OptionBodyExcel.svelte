<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { excelOpt } from '../../store/opt'
  
  const dispatch = createEventDispatcher()

  let xlOpt: ExcelOption = {};
  let btnText: string = '実行'
  
  onMount(() => {
    xlOpt.readHiddenSheet = $excelOpt.readHiddenSheet
    xlOpt.readFilledCell = $excelOpt.readFilledCell
  })

  onDestroy(() => {
    setOptions()
  })

  // $: isReadHidden = xlOpt.readHiddenSheet ? '読み込む' : '読み込まない'
  // $: isReadFilled = xlOpt.readFilledCell ? '読み込む' : '読み込まない'

  function setOptions(): void {
    excelOpt.set(xlOpt)
  }

  function childExecution(): void {
    setOptions()
    btnText = '読み込み中...'
    dispatch('execute')
  }

</script>

<div class="container is-excel p-5">
  <div class="columns mt-2">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">非表示シート</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="field">
        <button class="button" class:is-focused={xlOpt.readHiddenSheet} on:click={() => {xlOpt.readHiddenSheet = true}}>読み込む</button>
        <button class="button" class:is-focused={!xlOpt.readHiddenSheet} on:click={() => {xlOpt.readHiddenSheet = false}}>読み込まない</button>  
        <!-- <input type="checkbox" class="switch" id="hiddenSheet" bind:checked={xlOpt.readHiddenSheet}>
        <label for="hiddenSheet">{isReadHidden}</label> -->
      </div>
    </div>
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">色付きセル</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="field">
        <button class="button" class:is-focused={xlOpt.readFilledCell} on:click={() => {xlOpt.readFilledCell = true}}>読み込む</button>
        <button class="button" class:is-focused={!xlOpt.readFilledCell} on:click={() => {xlOpt.readFilledCell = false}}>読み込まない</button>  
        <!-- <input type="checkbox" class="switch" id="filledCell" bind:checked={xlOpt.readFilledCell}>
        <label for="filledCell">{isReadFilled}</label> -->
      </div>
    </div>
  </div>

  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>{btnText}</button>
  </div>
    
  </div>  