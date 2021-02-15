<script lang="ts">
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'

  import { showDetailedExtract } from '../../store/controls'
  import { cxt, extractSums } from '../../store/context'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../../store/opt'

  onMount(() => {
    if ($browserOpt.isAutoDown) {
      downFile()
    }
    calcSums()
  })

  function showDetailed(): void {
    $showDetailedExtract = !$showDetailedExtract
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
      const downURL = URL.createObjectURL(blob);
      const link = document.createElement('a')
      link.href = downURL
      link.download = `${$commonOpt.name}.txt`
      link.click()
    })
  }

  function downCounts(unit: 'chara' | 'word'): void {
    const opq: OptionQue = {
      common: $commonOpt,
      word: $wordOpt,
      excel: $excelOpt,
      ppt: $pptOpt,
    }
    const counts = $cxt.simpleCalc(unit, opq)
    const merged = counts.join('\n')
    const blob = new Blob([merged], { type: 'text/plain;charset=utf-8' })
    const downURL = URL.createObjectURL(blob);
    const link = document.createElement('a')
    link.href = downURL
    link.download = `${$commonOpt.name}.tsv`
    link.click()
  }

  function saveInBrowser(): void {
    window.localStorage.setItem('src-content', JSON.stringify($cxt.getRawContent('src')))
  }

  function calcSums(): void {
    const opq: OptionQue = {
      common: $commonOpt,
      word: $wordOpt,
      excel: $excelOpt,
      ppt: $pptOpt,
    }
    const wordSums = []
    const charaSums = []
    const words = $cxt.simpleCalc('word', opq)
    const charas = $cxt.simpleCalc('chara', opq)
    const wordTotal = Number(words[1].split('\t')[1])
    const charaTotal = Number(charas[1].split('\t')[1])
    // ヘッダー行とサマリー行を読み飛ばすために i = 2 からスタート
    for (let i = 2; i < words.length; i++) {
      const eachWord: number = Number(words[i].split('\t')[1])
      const eachChara: number = Number(charas[i].split('\t')[1])
      wordSums.push(eachWord)
      charaSums.push(eachChara)
    }
    extractSums.update(sums => {
      sums.charaSums = charaSums
      sums.charaTotal = charaTotal
      sums.wordSums = wordSums
      sums.wordTotal = wordTotal
      return sums
    })
  }

</script>

<div class="card p-5 m-5">
  <section class="card-footer">
    <button class="button card-footer-item ml-2" on:click={downFile}>TXT ダウンロード</button>
    <button class="button card-footer-item ml-2" on:click={() => downCounts('chara')}>文字数一覧</button>
    <button class="button card-footer-item ml-2" on:click={() => downCounts('word')}>単語数一覧</button>
    <button class="button card-footer-item ml-2" on:click={showDetailed}>詳細表示</button>
    <button class="button card-footer-item ml-2" on:click={saveInBrowser}>ブラウザに保存</button>
    <button class="button card-footer-item ml-2" on:click={() => goto('/analyze')}>分析へ</button>
    <button class="button card-footer-item ml-2" on:click={() => goto('/')}>戻る</button>
  </section>
</div>
