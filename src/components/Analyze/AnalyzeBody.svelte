<script lang="ts">  
  import { cxt, df, tvs } from '../../store/context'
  import { commonOpt, wwcOpt } from '../../store/opt';
  
  import OptionBodyWwc from './OptionBodyWWC.svelte';
  import AnalyzeListTable from './AnalyzeListTable.svelte'

  let unit: 'chara' | 'word' = 'chara'
  let processing = false
  let processed = false

  $: btnText = processing ? '読み込み中...' : '解析実行'

  function startAnalyze() {
    processing = true
    $df.analyze($cxt.getRawContent('src'))
    $df.calcWWC(unit, $wwcOpt)
    processing = false
    processed = true
  }

  function downCount(format: 'json' | 'human') {
    const wwcUnit = unit === 'chara' ? 'wwc-chara' : 'wwc-word'
    if (format === 'json') {
      const result = $df.exportResult(wwcUnit, 'json')
      downFile(result, 'json')
    } else {
      const result = $df.exportResult(wwcUnit, 'human')
      downFile(result, 'tsv')
    }
  }

  function downReport(format: 'json' | 'human') {
    if (format === 'json') {
      const result = $df.exportResult('diff', format)
      downFile(result, 'json')
    } else {
      $tvs.parseFromObj($df).then(() => {
        const result = $tvs.dump()
        downFile(result.join('\n'), 'tovis')
      })
    }
  }

  function downFile(contents: string, format: string) {
    const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' })
    const downURL = URL.createObjectURL(blob);
    const link = document.createElement('a')
    link.href = downURL
    link.download = `${$commonOpt.name}.${format}`
    link.click()
  }
  
</script>

<div class="card m-3 p-5 is-fullwidth">
  <section class="content">
    <h2>重複による重みづけ</h2>
    <OptionBodyWwc />
  </section>
  <section class="content">
    <h2>翻訳の優先順</h2>
    <AnalyzeListTable />
  </section>
  <section class="content">
    <label for="usingUnit">使用する単位</label>
    <div class="select">
      <select bind:value={unit} id="usingUnit">
        <option value='chara'>文字</option>
        <option value='word'>単語</option>
      </select>
    </div>
    <button class="button" on:click={startAnalyze}>{ btnText }</button>
  </section>
  {#if processed}
    <section class="card-footer">
      <button class="button card-footer-item" on:click={() => downCount('human')}>カウント(TSV)</button>
      <button class="button card-footer-item" on:click={() => downCount('json')}>カウント(JSON)</button>
      <button class="button card-footer-item" on:click={() => downReport('human')}>詳細(TOVIS)</button>
      <button class="button card-footer-item" on:click={() => downReport('json')}>詳細(JSON)</button>
    </section>
  {/if}
</div>

