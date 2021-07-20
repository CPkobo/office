<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import { srcs } from '../../store/files'
  import { cxt, priorityVer } from '../../store/context'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../../store/opt'

  import { path2FormatClassify } from '../../office-funcs/util'

  export let index: number;
  let ver = 0
  let isFormat: ClassifiedFormat = ''
  let unit: 'chara' | 'word' = 'chara'
  const unitDisplay = {
    'chara': '文字',
    'word': '単語'
  }
  let show = true
  let actives: boolean[] = []
  let sums: number[] = []
  let partial: number = 0
  let mainPart: number = 0
  let total: number = 0

  let con: ExtractedContent;


  // const con: ExtractedContent = $cxt.getRawContent('src')[index]

  $: {
    $cxt.changeActives('src', index, actives)
    simpleCalcThisFile(unit)
  }
  $: foldBtn = show ? '_' : '■'
  $: {
    ver = $priorityVer
    initialize()
  }

  onMount(() => {
    ver = $priorityVer
    initialize()
  })
  
  function foldTable() {
    show = !show
  }

  function initialize() {
    con = $cxt.getRawContent('src')[index]
    isFormat = path2FormatClassify(con.name)
    setActives()
    simpleCalcThisFile(unit)
  }

  function setActives() {
    actives = []
    for (let i = 0; i < con.exts.length; i++) {
      actives.push(con.exts[i].isActive)
    }
  }

  function contentMoveUp() {
    if (index === 0) {
      return
    } else {
      $cxt.changeFilePriority('src', index, -1)
      $priorityVer++
    }
    
  }
  
  function contentMoveDown() {
    if (index === $srcs.files.length) {
      return
    } else {
      $cxt.changeFilePriority('src', index, 1)
      $priorityVer++
    }
    
  }

  function simpleCalcThisFile(unit_: 'chara' | 'word') {
    unit = unit_
    const opq: OptionQue = {
      common: $commonOpt,
      word: $wordOpt,
      excel: $excelOpt,
      ppt: $pptOpt,
    }
    const sumData = $cxt.simpleCalcOneFile(unit, index, opq)
    sums = sumData.subs
    total = sumData.sum
    if (isFormat === 'is-ppt') {
      partial = sumData.partial
      mainPart = total - partial
    }
  }
    
</script>

  <div class="column is-half">
    <div class="card p-5 m-5">
      <header class="columns card-header p-2"
        class:is-word = {isFormat === 'is-word'}
        class:is-excel = {isFormat === 'is-excel'}
        class:is-ppt = {isFormat === 'is-ppt'}
      >
        <h2 class="subtitle">{index + 1}:{ con.name }({total} {unitDisplay[unit]})</h2>
      </header>
      <!-- <v-scroll-y-transition
        v-if="show"
      > -->
      <button class="button ml-10 is-small" on:click={foldTable}>{foldBtn}</button>
      <button class="button ml-10 is-small" on:click={contentMoveUp}>↑</button>
      <button class="button ml-10 is-small" on:click={contentMoveDown}>↓</button>
      {#if show}
      <div class="card-content" in:fade out:fade>
      <table id="detailed" class="table is-striped is-narrow p-1" width="90%">
        <thead>
          <tr>
            <th>翻訳対象</th>
            <th>場所</th>
            <th>{ unitDisplay[unit] }数</th>
          </tr>
        </thead>
        {#if isFormat !== 'is-word'}
        <tbody>
          {#each con.exts as eText, idx}
          <tr>
            <td class="is-check">
              <input type="checkbox" bind:checked={actives[idx]} />
            </td>
            <td>{ eText.type.split('-')[1] }-{ eText.position }</td>
            <td class="digit">{ sums[idx] } { unitDisplay[unit] }</td>
          </tr>
          {/each}
        </tbody>
        {/if}
        <tbody>
          {#if isFormat ==='is-ppt'}
          <tr>
            <td></td>
            <td>スライド小計</td>
            <td class="digit">{ mainPart } { unitDisplay[unit] }</td>
          </tr>
          <tr>
            <td></td>
            <td>ノート小計</td>
            <td class="digit">{ partial } { unitDisplay[unit] }</td>
          </tr>
          {/if}
          <tr>
            <td></td>
            <td>合計</td>
            <td class="digit">{ total } { unitDisplay[unit] }</td>
          </tr>
        </tbody>
      </table>
      </div>
      {/if}
      <!-- </v-scroll-y-transition> -->
      <section class="card-footer">
        <button class="button card-footer-item" on:click={() => simpleCalcThisFile('chara')}>文字数計算</button>
        <button class="button card-footer-item" on:click={() => simpleCalcThisFile('word')}>単語数計算</button>
      </section>
    </div>
  </div>

<style>
table#detailed {
  margin: auto;
}
</style>
