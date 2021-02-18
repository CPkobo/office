<script lang="ts">
  import { onMount } from 'svelte'

  import { cxt } from '../store/context'
  import { interDiff } from '../store/controls'

  import AlignResultCard from '../components/Align/AlignResultCard.svelte'
  import InterFileCard from '../components/Align/InterFileCard.svelte'
  import NgPage from '../components/NgPage.svelte'
  import AdRakutenVertical from '../components/ads/AdRakutenVertical.svelte';
  import AdRakutenSearch from '../components/ads/AdRakutenSearch.svelte';

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
      {#if $interDiff.show}
			  <InterFileCard />
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