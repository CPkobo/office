<script lang="ts">
  import Adsense from './Adsense.svelte'
</script>

<div class="card myad">
  <Adsense />
  <footer class="card-footer">【PR】</footer>
</div>

<style>
  div.myad {
    min-width: 200px;
    max-width: 350px;
    margin-left: auto;
    margin-right: 1rem;
    min-height: 350px;
		max-height: 600px;
		/* display: flex; */
    position: sticky;
    top: 125px;
    /* border: 1px solid; */
  }
</style>