<script lang="ts">
  import { onMount } from 'svelte'

  import { cxt, priorityVer } from '../../store/context'

  import { index2Range, path2Format } from '../../office-funcs/util'

  let ver: number = 0
  let contentsLength = 0
  let indexes: number[] = []
  let cons: ExtractedContent[];
  

  onMount(() => {
    ver = $priorityVer
    contentsLength = $cxt.getContentsLength('src')
    indexes = index2Range(contentsLength)
    cons = $cxt.getRawContent('src')
  })

  function fileUp(index: number): void {
    if (index === 0) {
      return
    } else {
      $cxt.changeFilePriority('src', index, -1)
      // $priorityVer++
    }
  }

  function fileDown(index: number): void {
    if (index >= contentsLength) {
      return
    } else {
      $cxt.changeFilePriority('src', index, 1)
      // $priorityVer++
    }
  }

</script>


<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>番号</th>
      <th>ファイル名</th>
      <th>拡張子</th>
    </tr>
  </thead>
  <tbody>
    {#each indexes as index}
      <tr
        class:is-word={cons[index].format === 'docx'}
        class:is-excel={cons[index].format === 'xlsx'}
        class:is-ppt={cons[index].format === 'pptx'}
      >
        <td>{index + 1}</td>
        <td>{cons[index].name}</td>
        <td>{path2Format(cons[index].name)}</td>
        <td on:click={() => fileUp(index)}>↑</td>
        <td on:click={() => fileDown(index)}>↓</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
</style>
  