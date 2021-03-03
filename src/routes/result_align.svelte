<script lang="ts">
import { onMount } from 'svelte'

import { cxt } from '../store/context'
import { interDiff } from '../store/controls'

import AlignResultCard from '../components/Align/AlignResultCard.svelte'
import InterFileCard from '../components/Align/InterFileCard.svelte'
import NgPage from '../components/NgPage.svelte'
import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte';
import FooterAdSet from '../components/ads/FooterAdSet.svelte'
import AdColumn from '../components/ads/AdColumn.svelte'

let pageOk: boolean = false

onMount(() => {
  if ($cxt.getRawContent('src') !== null && $cxt.getRawContent('tgt') !== null) {
    pageOk = true
  }
})
</script>

{#if pageOk}
  <div class="columns">
    <div class="column is-9">
      <AlignResultCard />
      {#if $interDiff.show}
			  <InterFileCard />
		  {/if}
    </div>
    <AdColumn />
  </div>
{:else}
  <NgPage />
{/if}
<FooterAdSet />