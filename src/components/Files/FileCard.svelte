<script lang="ts">
  import FileDrop from './FileDrop.svelte'
  import FileListTable from './FileListTable.svelte'

  export let isSrcOrTgt: string;

</script>

<div class="card m-3 p-5">
  <FileDrop {isSrcOrTgt} />
  <FileListTable {isSrcOrTgt} />
</div>