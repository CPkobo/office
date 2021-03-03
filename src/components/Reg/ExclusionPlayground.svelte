
<script lang="ts">
import { onMount } from 'svelte'
import { commonOpt } from '../../store/opt'
import RegErrorBlock from './RegErrorBlock.svelte'

  let exPattern: string = ''
  let texts: string[] = ['', '', '', '', '', ]
  let results: string[] = ['', '', '', '', '', ]
  let message: string = ''
  
  $: regErr = message !== ''

  onMount(() => {
    exPattern = $commonOpt.excludePattern
  }) 
     
  function execExclusion() {
    message = ''
    try {
      const ex = new RegExp(exPattern)
      results = ['', '', '', '', '', ]
      for (let i = 0; i < texts.length; i++) {
        if (texts[i] === '') {
          continue
        } else if (ex.test(texts[i])) {
          results[i] = '除外されます'
        } else {
          results[i] = '除外されません'
        }
      }
    } catch (e) {
      message = e.message
    }
  }

  function applyStore() {
    $commonOpt.excludePattern = exPattern
  }

  function test() {
    console.log(exPattern)
  }
</script>

<div class="card p-3 m-3">
  <header class="card-header">
    除外事例
  </header>
  <section class="content columns">
    <div class="column p-5 is-one-third">
      <input class="input" bind:value={exPattern} />
      <button class="button m-2" on:click={execExclusion}>除外実行</button>
      <button class="button m-2" on:click={applyStore}>設定反映</button>
      <button class="button m-2" on:click={test}>設定反映</button>
      {#if regErr}
        <RegErrorBlock {message} />
      {/if}
    </div>
    <div class="column p-5 is-two-thirds">
      <table class="table is-narrow">
        <thead>
          <tr>
            <th>番号</th>
            <th>対象文字列</th>
            <th>結果</th>
          </tr>
        </thead>
        <tbody>
          {#each texts as tt, tx}
          <tr>
            <td>{ tx + 1 }</td>
            <td>
              <input class="input" bind:value={texts[tx]} />
            </td>
            <td>
              { results[tx] }
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>
