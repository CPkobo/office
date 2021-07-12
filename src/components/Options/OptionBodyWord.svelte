<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { wordOpt, wordOpt2 } from '../../store/opt'
  
  const dispatch = createEventDispatcher()
  export let mode: string;
  export let btnText: string = '実行'

  let wdOpt1: WordOption = {};
  let wdOpt2: WordOption = {};
  
  onMount(() => {
    wdOpt1.afterRev = $wordOpt.afterRev
    wdOpt2.afterRev = $wordOpt2.afterRev
  })

  onDestroy(() => {
    setOptions()
  })

  $: isafterRev1 = wdOpt1.afterRev ? '修正後' : '修正前'
  $: isafterRev2 = wdOpt2.afterRev ? '修正後（訳文）' : '修正前（訳文）'

  function setOptions(): void {
    wordOpt.set(wdOpt1)
    wordOpt2.set(wdOpt2)
  }

  function childExecution(): void {
    setOptions()
    btnText = '読み込み中...'
    dispatch('execute')
  }

</script>

<div class="container is-word p-5">
  <div class="columns">
    <div class="column is-4 lbl">
      <p>修正履歴</p>
    </div>
    <div class="column is-8">
      <div class="field">
        <input type="checkbox" class="switch" id="rev1" bind:checked={wdOpt1.afterRev}>
        <label for="rev1">{isafterRev1}</label>
      </div>
      {#if mode === "align"}
        <div class="field">
          <input type="checkbox" class="switch" id="rev2" bind:checked={wdOpt2.afterRev}>
          <label for="rev2">{isafterRev2}</label>
        </div>
      {/if}
    </div>
  </div>
  <div class="container">
    <button class="button is-fullwidth is-teal" on:click={childExecution}>実行</button>
  </div>
</div>

