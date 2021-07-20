<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'

  import { cxt } from '../../store/context'
  
  import { index2Range } from '../../office-funcs/util'

  import ContentCard from './ExtractDetailedCard.svelte'
  
  let indexes: number[] = [0]
  let steped: number[] = []
  let limit: number = 0

  onMount(() => {
    if ($cxt.getRawContent('src') === null) {
      goto('/')
    } else {
      indexes = index2Range($cxt.getContentsLength('src'))
      limit = indexes.length - 1
      steped = indexes.filter((val) => {
        return val % 2 === 0
      })
    }
  })

</script>

{#each steped as sx}
<div class="columns">
  <ContentCard index={sx} />
  {#if sx + 1 <= limit}
    <ContentCard index={sx + 1} />
  {/if}
</div>
{/each}