<script lang="ts">
  import { onMount } from 'svelte'

  import { srcs } from '../store/files'
  import { cxt } from '../store/context'
  import { commonOpt, wordOpt, excelOpt, pptOpt, browserOpt } from '../store/opt'

  // import { ExtractedContent } from '../office-funcs/extract'

  export let index: number;
  let isFormat = 'is-word'
  let crtUnit = '文字'
  let show = true
  let actives: boolean[] = []
  let sums: number[] = []

  const con: ExtractedContent = $cxt.getRawContent('src')[index]

  onMount(() => {
    if (con.name.endsWith('docx')) {
      isFormat = 'is-word'
    } else if (con.name.endsWith('xlsx')) {
      isFormat = 'is-excel'
    } else if (con.name.endsWith('pptx')) {
      isFormat = 'is-ppt'
    }
    for (let i = 0; i < con.exts.length; i++) {
      actives.push(con.exts[i].isActive)
      sums.push(0)
    }
  })
  
  // actives() {
  //     setActives()
  //   }
  // },
  function foldTable() {
    show = !show
  }
  
  // function setActives() {
  //   $store.commit('fileIO/changeActives', {target: 'src', index: index, actives: actives})
  // }
  
  function getActives() {
    // const con: ExtractedContent = $srcs[index]
    const actives_: boolean[] = []
    const sums_: number[] = []
    for (let i = 0; i < con.exts.length; i++) {
      actives.push(con.exts[i].isActive)
      sums.push(0)
    }
    actives = actives_
    sums = sums_
  }

  function contentMoveUp() {
    if (index === 0) {
      return
    } else {
      srcs.fileUp(index)
    }
  }
  
  function contentMoveDown() {
    if (index === $srcs.files.length) {
      return
    } else {
      srcs.fileDown(index)
    }
  }

  function simpleCalcThisFile(unit: 'chara' | 'word') {
    if (unit === 'chara') {
      crtUnit = '文字'
    } else if (unit === 'word') {
      crtUnit = '単語'
    }
    const opq: OptionQue = {
      common: $commonOpt,
      word: $wordOpt,
      excel: $excelOpt,
      ppt: $pptOpt,
    }
    sums = $cxt.simpleCalcOneFile(unit, index, opq)
  }
  
  $: foldBtn = show ? '折りたたむ' : ' 表示する '
  $: subTotal = () => {
      const subT: number[] = [0, 0]
      if (isFormat === 'is-ppt') {
        const exts = $srcs[index].exts
        for (let i = 0; i < exts.length; i++) {
          if (exts[i].type === 'PPT-Note') {
            subT[1] += sums[i]
          } else {
            subT[0] += sums[i]
          }
        }
      }
      return subT
    }
  
  $: total = () => {
    let t = 0
    for (const s of sums) {
      t += s
    }
    return t
  }
  
  // mounted() {
  //   $store.subscribe((mutation: any, state: any) => {
  //     if (mutation.type === 'fileIO/contentMove') {
  //       getActives()
  //     } 
  //   })
  //   simpleCalcThisFile('chara')
  // },
</script>

<div class="card p-5 m-5">
  <header class="card-header" class:isFormat>
    { $srcs[index].name }
    <button class="button ml-10" on:click={foldTable}>{foldBtn}</button>
    <button class="button ml-10" on:click={contentMoveUp}>↑</button>
    <button class="button ml-10" on:click={contentMoveDown}>↓</button>
  </header>
  <!-- <v-scroll-y-transition
    v-if="show"
  > -->
  <table class="table p-3">
    <thead>
      <tr>
        <th>場所</th>
        <th>翻訳対象</th>
        <th>{ crtUnit }数</th>
      </tr>
    </thead>
    {#if isFormat !== 'is-word'}
    <tbody>
      {#each con.exts as eText, idx}
      <tr>
        <td>{ eText.type.split('-')[1] }-{ eText.position }</td>
        <td>
          <input type="checkbox" bind:checked={actives[idx]} />
        </td>
        <td class="digit">{ sums[idx] } { crtUnit }</td>
      </tr>
      {/each}
    </tbody>
    {/if}
    <tbody>
      {#if isFormat ==='is-ppt'}
      <tr>
        <td></td>
        <td>スライド小計</td>
        <td class="digit">{ subTotal[0] } { crtUnit }</td>
      </tr>
      <tr>
        <td></td>
        <td>ノート小計</td>
        <td class="digit">{ subTotal[1] } { crtUnit }</td>
      </tr>
      {/if}
      <tr>
        <td></td>
        <td>合計</td>
        <td class="digit">{ total } { crtUnit }</td>
      </tr>
    </tbody>
  </table>
  <!-- </v-scroll-y-transition> -->
  <section class="card-footer">
    <button on:click={() => simpleCalcThisFile('chara')}>文字数計算</button>
    <button on:click={() => simpleCalcThisFile('word')}>単語数計算</button>
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
