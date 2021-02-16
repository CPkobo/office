<script lang="ts">
  import { onMount } from 'svelte'
  import { cxt } from '../store/context'
  import { showDetailedExtract } from '../store/controls'

  import ExtractControls from '../components/Extract/ExtractControls.svelte'
  import ExtractSimpleResult from '../components/Extract/ExtractSimpleResult.svelte'
  import ExtractDetailedResult from '../components/Extract/ExtractDetailedResult.svelte'

  import NgPage from '../components/NgPage.svelte'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte'
import AdRakutenSearch from '../components/ads/AdRakutenSearch.svelte'
  // import AdTemplateV from '../components/ads/AdTemplateV.svelte';

  let pageOk: boolean = false

  onMount(() => {
    if ($cxt.getRawContent('src') !== null) {
      pageOk = true
    }
  })

</script>

{#if pageOk}
  <div class="columns">
    <div class="column is-two-thirds">
      <ExtractControls />
      {#if !$showDetailedExtract}
        <ExtractSimpleResult />
      {:else}
        <ExtractDetailedResult />
      {/if}
    </div>
    <div class="column is-one-third">
      <!-- <AdTemplateV /> -->
      <AdRakutenVertical />
    </div>
  </div>
{:else}
  <NgPage />
{/if}
<AdRakutenSearch />