<script lang="ts">
  import { srcs, tgts } from '../../store/files'

  import { path2Format } from '../../office-funcs/util'

  export let isSrcOrTgt: String;
  let isWhich: FilesInfo = {
    files: [],
    order: []
  }

  $: isWhich = isSrcOrTgt === 'src' ? $srcs : $tgts

  function fileUp(index: number): void {
    if (index === 0) {
      return
    } else {
      if (isSrcOrTgt === 'src') {
        srcs.fileUp(index)
      } else {
        tgts.fileUp(index)
      }
    }
  }

  function fileDown(index: number): void {
    if (isSrcOrTgt === 'src') {
      if (index === $srcs.order.length) {
        return 
      } else {
        srcs.fileDown(index)
      }
    } else {
      if (index === $tgts.order.length) {
        return
      } else {
        tgts.fileDown(index)
      }
    }
  }

  function fileRemove(index: number): void {
    if (isSrcOrTgt === 'src') {
      srcs.fileRemove(index)
    } else {
      tgts.fileRemove(index)
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
    {#each isWhich.order as ox, idx}
      <tr
        class:is-word={isWhich.files[ox].name.match(/.*.doc(x|m)$/i)}
        class:is-excel={isWhich.files[ox].name.match(/.*.xls(x|m)$/i)}
        class:is-ppt={isWhich.files[ox].name.match(/.*.ppt(x|m)$/i)}
      >
        <td>{idx + 1}</td>
        <td>{isWhich.files[ox].name}</td>
        <td>{path2Format(isWhich.files[ox].name)}</td>
        <td><button class="button is-small" on:click={() => fileUp(idx)}>↑</button>
        <td><button class="button is-small" on:click={() => fileDown(idx)}>↓</button>
        <td><button class="button is-small is-danger is-outlined" on:click={() => fileRemove(idx)}>×</button>
      </tr>
    {/each}
  </tbody>
</table>

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
  
  </style>
  