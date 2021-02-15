<script lang="ts">
  import { onMount } from 'svelte'
  import { commonOpt } from '../../store/opt'
  import { ReadingOption } from '../../office-funcs/option'
  import { applySegRules } from '../../office-funcs/util'

  
  let result: string[] = []
  let delimiters: string = ''
  let text: string = ''

  onMount(() => {
    delimiters = $commonOpt.delimiters
  })

  function execSegmentaion() {
    const opq: OptionQue = {common: $commonOpt}
    opq.common.name = 'SegmentationTest'
    const opt = new ReadingOption(opq)
    const blank = new RegExp('^\\s*$')
    result = applySegRules([text], opt).filter(val => !(blank.test(val)))
    console.log(result)
  }
  
  function applyStore() {
    $commonOpt.delimiters = delimiters
  }
</script>

<div class="card p-3 m-3">
  <header class="card-header">
    セグメント分割
  </header>
  <section class="content columns">
    <div class="column is-one-third p-5">
      <input class="input" bind:value={delimiters} id="delim_input" />
      <button class="button m-2" on:click={execSegmentaion}>分割実行</button>
      <button class="button m-2" on:click={applyStore}>設定反映</button>
      <p>※ 分割の結果、空白文字のみになったセグメントは無視されます</p>
    </div>
    <div class="column is-two-thirds p-5">
      <textarea class="textarea" rows="20" bind:value={text} />
    </div>
  </section>
  <section class="content">
    <ol>
      {#each result as tt}
        <li class="m-2">{ tt }</li>
      {/each}
    </ol>
  </section>
</div>

