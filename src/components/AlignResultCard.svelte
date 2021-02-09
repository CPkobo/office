<script lang="ts">
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'

  import { srcs } from '../store/files'
  import { cxt } from '../store/context'
  import { FileStats } from '../office-funcs/stats'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../store/opt'

  let statsList: FileStats[][] = []
  let downURL: string = ''

  onMount(() => {
    console.log(18)
    console.log($srcs.files.length)
    if ($srcs.files.length === 0) {
      goto('/')
    }
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
      console.log(39)
    })
  }
  
  function saveInBrowser(): void {
    window.localStorage.setItem('src-context', JSON.stringify($cxt.getRawContent('src')))
    window.localStorage.setItem('tgt-context', JSON.stringify($cxt.getRawContent('tgt')))
  }
  
  // function resetAlignContext(): void {
  //   this.$store.commit('fileIO/resetAlignContext')
  // }
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
        </tr>
        {/each}
      </tbody>
    <!-- <tbody>
      <tr>
        <td>合計</td>
        <td class="digit">{ wordTotal } 単語</td>
        <td class="digit">{ charaTotal } 文字</td>
      </tr>
    </tbody> -->
    </table>
  </section>
  <section class="card-footer">
    <button class="button card-footer-item" on:click={downFile}>TSV ダウンロード</button>
    <button class="button card-footer-item" on:click={saveInBrowser}>ブラウザに保存</button>
    <!-- <button class="button card-footer-item" on:click={recalc}>再計算</button> -->
    <!-- <button class="button card-footer-item" on:click={recalc}>分析へ&gt;&gt;</button> -->
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
