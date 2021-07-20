<script lang="ts">  
  import { cxt, df, tvs } from '../../store/context'
  import { commonOpt, wwcOpt } from '../../store/opt';
  
  import OptionBodyWwc from './OptionBodyWWC.svelte';
  import AnalyzeListTable from './AnalyzeListTable.svelte'

  let unit: 'chara' | 'word' = 'chara'
  let dlType: 'count-tsv' | 'count-json' | 'tovis' | 'mtovis' | 'json' = 'count-tsv'
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

  function download(): void {
    switch (dlType) {
      case 'count-tsv':
        downCount('human')
        break;

      case 'count-json':
        downCount('json')
        break

      case 'mtovis':
        downReport('min')
        break
        
      case 'tovis':
        downReport('human')
        break
        
      case 'json':
        downReport('json')
        break
    
      default:
        break;
    }
  }

  function downCount(format: 'json' | 'human') {
    const wwcUnit = unit === 'chara' ? 'wwc-chara' : 'wwc-word'
    if (format === 'json') {
      const result = $df.exportResult(wwcUnit, 'json', $wwcOpt)
      downFile(result, 'json')
    } else {
      const result = $df.exportResult(wwcUnit, 'human', $wwcOpt)
      downFile(result, 'tsv')
    }
  }

  function downReport(format: 'json' | 'human' | 'min') {
    if (format === 'json') {
      const result = $df.exportResult('diff', format, $wwcOpt)
      downFile(result, 'json')
    } else {
      $tvs.parseFromObj($df).then(() => {
        if (format === 'human') {
          const result = $tvs.dump()
          downFile(result.join('\n'), 'tovis')
        } else {
          const result = $tvs.dumpMinify('CHECK-DUPLI')
          downFile(result.join('\n'), 'mtovis')
        }
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
    <h2><label for="usingUnit">使用する単位</label></h2>
    <div class="columns">
      <div class="column is-one-third">
        <div class="select ml-3">
          <select bind:value={unit} id="usingUnit">
            <option value='chara'>文字</option>
            <option value='word'>単語</option>
          </select>
        </div>
      </div>
      <div class="column is-two-thirds">
        <button class="button is-fullwidth is-teal" on:click={startAnalyze}>{ btnText }</button>
      </div>
    </div>
  </section>
  {#if processed}

    <hr />

    <section class="content">
      <h2>解析結果のダウンロード</h2>
      <div class="columns">
        <div class="column is-one-third">
          <div class="select ml-3">
            <select bind:value={dlType} id="downloadType">
              <option value='count-tsv'>カウント結果（TSV）</option>
              <option value='count-json'>カウント結果（JSOｎ）</option>
              <option value='mtovis'>簡易確認ファイル（mtovis）</option>
              <option value='tovis'>重複の詳細（TOVIS形式）</option>
              <option value='json'>重複の詳細（JSON）</option>
            </select>
          </div>
        </div>
        <div class="column is-two-thirds">
          <button class="button is-fullwidth is-teal" on:click={download}>ダウンロード</button>
        </div>
      </div>
    </section>
  {/if}
</div>

