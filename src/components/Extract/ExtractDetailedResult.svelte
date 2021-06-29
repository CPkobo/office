<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'

  import { cxt } from '../../store/context'
  
  import { index2Range } from '../../office-funcs/util'

  import ContentCard from './ExtractDetailedCard.svelte'
  
  let indexes: number[] = [0]

  onMount(() => {
    if ($cxt.getRawContent('src') === null) {
      goto('/')
    } else {
      indexes = index2Range($cxt.getContentsLength('src'))
    }
  })

</script>

{#each indexes as index}
  <ContentCard {index} />
{/each}