<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { pptOpt } from '../../store/opt'

  const dispatch = createEventDispatcher()
  let btnText: string = '実行'
  
  let pOpt: PptOption = {};
  
  onMount(() => {
    pOpt.readNote = $pptOpt.readNote
  })

  onDestroy(() => {
    setOptions()
  })

  $: isreadNote = pOpt.readNote ? '読み込む' : '読み込まない'
  
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
  <div class="columns">
    <div class="column is-4 lbl">
      <p>ノート</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" id="readNote" bind:checked={pOpt.readNote}>
        <label for="readNote">{isreadNote}</label>
      </div>
    </div>
  </div>
  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>{btnText}</button>
  </div>
</div>  