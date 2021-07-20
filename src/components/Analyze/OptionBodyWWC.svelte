<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte'
  import { wwcOpt} from '../../store/opt'
  
  const dispatch = createEventDispatcher()
  let btnText: string = '実行'

  let wwc: WWCRate = {
    dupli: 0.15,
    over95: 0.3,
    over85: 0.6,
    over75: 0.8,
    over50: 1,
    under49: 1,
  };
  
  onMount(() => {
    wwc.dupli = $wwcOpt.dupli
    wwc.over95 = $wwcOpt.over95
    wwc.over85 = $wwcOpt.over85
    wwc.over75 = $wwcOpt.over75
    wwc.over50　= $wwcOpt.over50
    wwc.under49 = $wwcOpt.under49
  })

  onDestroy(() => {
    setOptions()
  })

  function setOptions(): void {
    wwcOpt.set(wwc)
  }

</script>

<div class="container p-5">
  <div class="columns">
    <div class="column is-4 lbl">
      <p>重複による割合</p>
    </div>
    <div class="column is-8">
      <table class="table is-inline">
        <thead>
          <tr>
            <td>重複率</td>
            <td>文字数の重み</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.dupli} on:change={setOptions}/></td>
          </tr>
          <tr>
            <td>95-99%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over95} on:change={setOptions}/></td>
          </tr>
          <tr>
            <td>85-94%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over85} on:change={setOptions}/></td>
          </tr>
          <tr>
            <td>75-84%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over75} on:change={setOptions}/></td>
          </tr>
          <tr>
            <td>50-74%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.over50} on:change={setOptions}/></td>
          </tr>
          <tr>
            <td>~49%</td>
            <td><input class="input is-small" type="number" bind:value={wwc.under49} on:change={setOptions}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>