<script lang="ts">
import { applyOpcodes, cnm } from '../office-funcs/util'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte'
import FooterAdSet from '../components/ads/FooterAdSet.svelte'
import AdColumn from '../components/ads/AdColumn.svelte'

let results: string= ''
let inputing: boolean = true
let src: string = ''
let tgt: string = ''
const difflib = require('difflib')
const seq = new difflib.SequenceMatcher(null, '', '')

$: btnText = inputing ? '比較' : '戻る'

function handleCompareOrBack() {
  if (inputing) {
    compare()
  } else {
    clearResults()
  }
}

function clearResults() {
  results = ''
  inputing = true
}

function sanitize(text): string {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function compare() {
  clearResults()
  const src_ = sanitize(src)
  const tgt_ = sanitize(tgt)
  seq.setSeq1(tgt_)
  seq.setSeq2(src_)
  const opcodes: Opcode[] = seq.getOpcodes()
  const diffed = applyOpcodes(tgt_, src_, opcodes)
  results = diffed.replace(/\n/g, '<br />')
  inputing = false
}
</script>

{#if inputing}
<div class="columns">
  <div class="column is-5">
    <textarea rows="25" bind:value={src} />
    <button class="button is-outlined" on:click={() => src = ""}>クリア</button>
  </div>
  <div class="column is-5">
    <textarea rows="25" bind:value={tgt} />
    <button class="button is-outlined" on:click={() => tgt = ""}>クリア</button>
  </div>
  <AdColumn colsize={2}/>
</div>
{:else}
<div class="card m-5 p-5" width="100%">
  <p class="diff-res">{@html results}</p>
</div>
{/if}
<button class="button" on:click={handleCompareOrBack}>{btnText}</button>
<FooterAdSet />

<style>
textarea {
  width: 100%;
  border: 1px solid;
  padding: 5px;
}

</style>