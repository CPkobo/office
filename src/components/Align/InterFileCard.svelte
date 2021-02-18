<script lang="ts">
  import { onMount } from 'svelte'

  import { cxt } from '../../store/context'
  import { interDiff } from '../../store/controls'

  import { applyOpcodes, index2Range } from '../../office-funcs/util'

  let results: string[]= []
  let resultsOftitle: string[] = []
  let range: number[] = []
  const difflib = require('difflib')
  const seq = new difflib.SequenceMatcher(null, '', '')

  onMount(() => {
    if ($interDiff.index < 0) {
      resultsOftitle.push('エラー')
      results.push('ファイルIDが不正です')
    } else {
      reset()
      const scon: ExtractedContent = $cxt.getRawContent('src')[Number($interDiff.index)]
      const tcon: ExtractedContent = $cxt.getRawContent('tgt')[Number($interDiff.index)]
      const longer = scon.exts.length >= tcon.exts.length ? scon.exts.length : tcon.exts.length
      let validCount = 0
      for (let i = 0; i < longer; i++) {
        let src = ''
        let tgt = ''
        let title = String(i)
        if (i < scon.exts.length) {
          src = scon.exts[i].value.join('\n')
          title = `${scon.exts[i].type} ${scon.exts[i].position}` 
        }
        if (i < tcon.exts.length) {
          tgt = tcon.exts[i].value.join('\n')
        }
        const result = compare(src, tgt)
        if (result === null) {
          continue
        } else {
          validCount++
          resultsOftitle.push(title)
          results.push(result)
        }
      }
      if (validCount > 0) {
          range = index2Range(validCount)
      } else {
        range = [0]
        resultsOftitle.push('結果なし')
        results.push('テキストは完全に一致しました')
      }
    }
  })

  function reset(): void {
    resultsOftitle = []
    results = []
    range =[]
  }

  function sanitize(text): string {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  function compare(src, tgt): string | null {
    const src_ = sanitize(src)
    const tgt_ = sanitize(tgt)
    seq.setSeq1(tgt_)
    seq.setSeq2(src_)
    const opcodes: Opcode[] = seq.getOpcodes()
    if (opcodes.length === 1 && opcodes[0][0] === 'equal') {
      return null
    } else {
      const diffed = applyOpcodes(tgt_, src_, opcodes)
      return diffed.replace(/\n/g, '<br />')
    }
  }
</script>

<div class="card m-3 p-3">
  <dl>
  {#each range as index}
    <dd class="is-size-4">{ resultsOftitle[index] }</dd>
    <dt>{@html results[index] }</dt>
    <hr />
  {/each}
  </dl>
</div>
