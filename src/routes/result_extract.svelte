<script lang="ts">
import { onMount } from 'svelte'
import { cxt } from '../store/context'
import { showDetailedExtract } from '../store/controls'

import ExtractControls from '../components/Extract/ExtractControls.svelte'
import ExtractSimpleResult from '../components/Extract/ExtractSimpleResult.svelte'
import ExtractDetailedResult from '../components/Extract/ExtractDetailedResult.svelte'

import NgPage from '../components/NgPage.svelte'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte'
import FooterAdSet from '../components/ads/FooterAdSet.svelte'
import AdColumn from '../components/ads/AdColumn.svelte'

let pageOk: boolean = false

onMount(() => {
  if ($cxt.getRawContent('src') !== null) {
    pageOk = true
  }
})
</script>

{#if pageOk}
  <div class="columns">
    <div class="column is-9">
      {#if !$showDetailedExtract}
        <ExtractSimpleResult />
      {:else}
        <ExtractDetailedResult />
      {/if}
      <ExtractControls />
    </div>
    <AdColumn />
  </div>
{:else}
  <NgPage />
{/if}
<FooterAdSet />