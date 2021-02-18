<script lang="ts">
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'

  import { cxt } from '../../store/context'
  import { interDiff } from '../../store/controls'
  import { FileStats } from '../../office-funcs/stats'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../../store/opt'

  let statsList: FileStats[][] = []
  let downURL: string = ''
  let fordiff: number = 0

  onMount(() => {
    if ($browserOpt.isAutoDown) {
      downFile()
    }
    statsList = $cxt.getAlignStats()
  })
  
  function downFile(): void {
    const opq: OptionQue = {
      common: $commonOpt,
      word: $wordOpt,
      excel: $excelOpt,
      ppt: $pptOpt,
    }
    $cxt.getAlignedText(opq).then((exts) => {
      const merged = exts.join('\n')
      const blob = new Blob([merged], { type: 'tsv/plain;charset=utf-8' })
      downURL = URL.createObjectURL(blob);
      const link = document.createElement('a')
      link.href = downURL
      link.download = `${$commonOpt.name}.tsv`
      link.click()
    })
  }
  
  function saveInBrowser(): void {
    window.localStorage.setItem('src-context', JSON.stringify($cxt.getRawContent('src')))
    window.localStorage.setItem('tgt-context', JSON.stringify($cxt.getRawContent('tgt')))
  }

  function setInterDiff(): void {
    if ($interDiff.show) {
      $interDiff.show = false
      $interDiff.index = -1
    } else {
      $interDiff.show = true
      $interDiff.index = fordiff
    }
  }
  
</script>

<div class="card p-5 m-5">
  <header class="card-header">
    <h1 class="card-header-title">対訳表 作成結果</h1>
  </header>
  <section class="card-content">
    <table class="table pa-3 is-fullwidth">
      <thead>
        <tr>
          <th>フォーマット</th>
          <th>原文ファイル名</th>
          <th>訳文ファイル名</th>
          <th colspan="2">段落｜シート｜スライド</th>
          <th colspan="2">表組｜テキストボックス｜ノート</th>
          <th colspan="2">その他</th>
          <th>比較</th>
        </tr>
      </thead>
      <tbody>
        {#each statsList as spair, idx}
        <tr
          class:is-word={spair[0].format === 'docx'}
          class:is-excel={spair[0].format === 'xlsx'}
          class:is-ppt={spair[0].format === 'pptx'}
        >
          <td>{ spair[0].format }</td>
          <td>{ spair[0].name }</td>
          <td>{ spair[1].name }</td>
          <td class="digit">{ spair[0].doc_para + spair[0].xl_sheet + spair[0].ppt_slide}</td>
          <td class="digit">{ spair[1].doc_para + spair[1].xl_sheet + spair[1].ppt_slide}</td>
          <td class="digit">{ spair[0].doc_table + spair[0].xl_shape + spair[0].ppt_note}</td>
          <td class="digit">{ spair[1].doc_table + spair[1].xl_shape + spair[1].ppt_note}</td>
          <td class="digit">{ spair[0].ppt_dgm }</td>
          <td class="digit">{ spair[1].ppt_dgm }</td>
          <td><input type="radio" class="radio" name="fordiff" bind:group={fordiff} value={idx}></td>
        </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="card-footer">
    <button class="button card-footer-item" on:click={downFile}>TSV ダウンロード</button>
    <button class="button card-footer-item" on:click={saveInBrowser}>ブラウザに保存</button>
    <button class="button card-footer-item" on:click={setInterDiff}>ファイル間　差分</button>
    <button class="button card-footer-item" on:click={() => goto('/')}>戻る</button>
  </section>
</div>

<style>
.is-word {
  background-color: lightblue;
}

.is-excel {
  background-color: lightgreen;
}

.is-ppt {
  background-color: lightsalmon;
}

td.digit {
  text-align: right;
}
</style>
