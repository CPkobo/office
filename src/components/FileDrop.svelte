<script lang="ts">

  import { srcs, tgts } from '../store/files'

  export let isSrcOrTgt;

  const allowedFormat = [ 'docx', 'docm', 'xlsx', 'xlsm', 'pptx', 'pptm']
  let isEnter = false;
  $: isWhich = isSrcOrTgt === 'tgt' ? '訳文' : '原文'

  function dragEnter(): void {
    isEnter = true;
  };
  function dragLeave(): void {
    isEnter = false;
  };
  function fileDroped(ev: DragEvent): void {
    isEnter = false;
    if (ev.dataTransfer !== null) {
      if (ev.dataTransfer.files !== null) {
        const files = [...ev.dataTransfer.files].filter(val => {
          const nameEls: string[] = val.name.split('.')
          const formatName = nameEls[nameEls.length - 1].toLowerCase()
          if (allowedFormat.indexOf(formatName) !== -1) {
            return val
          }
        })
        if (files.length !== 0) {
          if (isSrcOrTgt === 'src') {
            srcs.setFiles(files)
          } else {
            tgts.setFiles(files)
          }
        }
      }
    }
  }
</script>

<div
  on:dragenter={dragEnter}
  on:dragleave={dragLeave}
  on:dragover|preventDefault
  on:drop|preventDefault={fileDroped}
  class:enter="{isEnter}"
  class="drop_zone"
>
  <label for="upload_file" class="drop_label">
    ここに{isWhich}ファイルをドロップしてください
    <input type="file" style="display:none">
  </label>
</div>

<style>

.drop_zone{
    display: block;
    width: 90%;
    height: 80px;
    border: 5px dotted black;
    border-radius: 1rem;
    margin: 0 auto;
    font-weight: bolder;
    background: #F5F5F5;
    text-align: center;
    padding-top: 0.5rem;
}

.enter {
    background: lightblue;
}

</style>