<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { excelOpt } from '../store/opt'
  
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

  $: isReadHidden = xlOpt.readHiddenSheet ? '読み込む' : '読み込まない'
  $: isReadFilled = xlOpt.readFilledCell ? '読み込む' : '読み込まない'

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
  <div class="columns">
    <div class="column is-4 lbl">
      <p>非表示シート</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" name="hiddenSheet" bind:checked={xlOpt.readHiddenSheet}>
        <label for="hiddenSheet">{isReadHidden}</label>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4 lbl">
      <p>色付きセル</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" name="filledCell" bind:checked={xlOpt.readFilledCell}>
        <label for="filledCell">{isReadFilled}</label>
      </div>
    </div>
  </div>

  <div class="container">
    <button class="button is-fullwidth is-primary" on:click={childExecution}>{btnText}</button>
  </div>
    
  </div>  