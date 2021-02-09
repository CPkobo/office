<script lang="ts">
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  import { srcs } from '../store/files'
  import { cxt } from '../store/context'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../store/opt'

    let wordSums: number[] = [0]
    let charaSums: number[] = [0]
    let wordTotal: number = 0
    let charaTotal: number = 0
    let downURL: string = ''

    onMount(() => {
      if ($srcs.files.length === 0) {
        goto('/')
      }
      if ($browserOpt.isAutoDown) {
        downFile()
      }
      recalc()
    })

    // function setMode(modeIndex: number): void {
    //   this.$store.commit('setMode', modeIndex)
    // }
    
    function saveInBrowser(): void {
      window.localStorage.setItem('src-content', JSON.stringify($cxt.getRawContent('src')))
    }
    
    function downFile(): void {
      const opq: OptionQue = {
        common: $commonOpt,
        word: $wordOpt,
        excel: $excelOpt,
        ppt: $pptOpt,
      }
      $cxt.getSingleText('src', opq).then((exts) => {
        const merged = exts.join('\n')
        const blob = new Blob([merged], { type: 'text/plain;charset=utf-8' })
        downURL = URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.href = downURL
        link.download = `${$commonOpt.name}.txt`
        link.click()
      })
    }

    function recalc(): void {
      const opq: OptionQue = {
        common: $commonOpt,
        word: $wordOpt,
        excel: $excelOpt,
        ppt: $pptOpt,
      }
      // const wordSums: number[] = []
      // const charaSums: number[] = []
      wordSums = []
      charaSums = []
      const words = $cxt.simpleCalc('word', opq)
      const charas = $cxt.simpleCalc('chara', opq)
      wordTotal = Number(words[1].split('\t')[1])
      charaTotal = Number(charas[1].split('\t')[1])
      // ヘッダー行とサマリー行を読み飛ばすために i = 2 からスタート
      for (let i = 2; i < words.length; i++) {
        const eachWord: number = Number(words[i].split('\t')[1])
        const eachChara: number = Number(charas[i].split('\t')[1])
        wordSums.push(eachWord)
        charaSums.push(eachChara)
      }
    }

    // resetExtractContext(): void {
    //   this.$store.commit('fileIO/resetExtractContext')
    // }
</script>

<div class="card p-5 m-5">
  <header class="card-header">
    <h1 class="card-header-title">抽出結果</h1>
  </header>
  <section class="card-content">
    <table class="table pa-3 is-fullwidth">
      <thead>
        <tr>
          <th>ファイル名</th>
          <th>単語数</th>
          <th>文字数</th>
        </tr>
      </thead>
      <tbody>
        {#each $cxt.getRawContent('src') as ext, idx}
        <tr
          class:is-word = {ext.format === 'docx'}
          class:is-excel = {ext.format === 'xlsx'}
          class:is-ppt = {ext.format === 'pptx'}
        >
          <td>{ ext.name }</td>
          <td class="digit">{ wordSums[idx] } 単語</td>
          <td class="digit">{ charaSums[idx] } 文字</td>
        </tr>
        {/each}
      </tbody>
      <tbody>
        <tr>
          <td>合計</td>
          <td class="digit">{ wordTotal } 単語</td>
          <td class="digit">{ charaTotal } 文字</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section class="card-footer">
    <button class="button card-footer-item" on:click={downFile}>TXT ダウンロード</button>
    <button class="button card-footer-item" on:click={saveInBrowser}>ブラウザに保存</button>
    <button class="button card-footer-item" on:click={recalc}>再計算</button>
    <button class="button card-footer-item" on:click={recalc}>分析へ&gt;&gt;</button>
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
