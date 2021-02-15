<script lang="ts">
  import { onMount } from 'svelte'
  import { cxt } from '../store/context'

  import AlignResultCard from '../components/Align/AlignResultCard.svelte'
  import NgPage from '../components/NgPage.svelte'
  import AdTemplateV from '../components/ads/AdTemplateV.svelte';

  let pageOk: boolean = false

  onMount(() => {
    if ($cxt.getRawContent('src') !== null && $cxt.getRawContent('tgt') !== null) {
      pageOk = true
    }
  })


</script>

{#if pageOk}
  <div class="columns">
    <div class="column is-two-thirds">
      <AlignResultCard />
    </div>
    <div class="column is-one-third">
      <AdTemplateV />
    </div>
  </div>
{:else}
  <NgPage />
{/if}