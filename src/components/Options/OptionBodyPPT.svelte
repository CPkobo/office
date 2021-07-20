<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { pptOpt } from '../../store/opt'

  const dispatch = createEventDispatcher()
  let btnText: string = '実行'
  
  let pOpt: PptOption = {};
  
  onMount(() => {
    pOpt.readSlide = $pptOpt.readSlide
    pOpt.readNote = $pptOpt.readNote
  })

  onDestroy(() => {
    setOptions()
  })

  // $: isreadSlide = pOpt.readSlide ? '読み込む' : '読み込まない'
  // $: isreadNote = pOpt.readNote ? '読み込む' : '読み込まない'
  
  function setOptions(): void {
    pptOpt.set(pOpt)
  }

  function childExecution(): void {
    setOptions()
    btnText = '読み込み中...'
    dispatch('execute')
  }

</script>

<div class="container is-ppt p-5">
  <div class="columns mt-2">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">スライド</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="field">
        <button class="button" class:is-focused={pOpt.readSlide} on:click={() => {pOpt.readSlide = true}}>読み込む</button>
        <button class="button" class:is-focused={!pOpt.readSlide} on:click={() => {pOpt.readSlide = false}}>読み込まない</button>  
        <!-- <input type="checkbox" id="readSlide" bind:checked={pOpt.readSlide}>
        <label for="readSlide">{isreadSlide}</label> -->
      </div>
    </div>
  </div>

  <div class="columns mt-3">
    <div class="column is-4 lbl has-text-right">
      <h3 class="subtitle is-5">ノート</h3>
    </div>
    <div class="column is-8 ml-3">
      <div class="field">
        <button class="button" class:is-focused={pOpt.readNote} on:click={() => {pOpt.readNote = true}}>読み込む</button>
        <button class="button" class:is-focused={!pOpt.readNote} on:click={() => {pOpt.readNote = false}}>読み込まない</button>  
        <!-- <input type="checkbox" id="readNote" bind:checked={pOpt.readNote}>
        <label for="readNote">{isreadNote}</label> -->
      </div>
    </div>
  </div>
  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>{btnText}</button>
  </div>
</div>  