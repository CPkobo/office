<script lang="ts">
  import { cxt, extractSums } from '../../store/context'

  const fileLength = $cxt.getContentsLength('src')
</script>

<div class="card p-5 m-5">
  <header class="card-header">
    <h1 class="card-header-title">抽出結果 全 {fileLength} ファイル</h1>
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
          <td class="digit">{ $extractSums.wordSums[idx] } 単語</td>
          <td class="digit">{ $extractSums.charaSums[idx] } 文字</td>
        </tr>
        {/each}
      </tbody>
      <tbody>
        <tr>
          <td>合計</td>
          <td class="digit">{ $extractSums.wordTotal } 単語</td>
          <td class="digit">{ $extractSums.charaTotal } 文字</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
