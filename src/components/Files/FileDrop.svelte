<script lang="ts">

  import { srcs, tgts } from '../../store/files'

  import { path2Format } from '../../office-funcs/util'

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
      if (ev.dataTransfer.files !== null && ev.dataTransfer.files.length > 0) {
        fileRegister(ev.dataTransfer.files)
      }
    }
  }

  function fileSelected(ev: Event): void {
    if ((ev.target as HTMLInputElement).files && (ev.target as HTMLInputElement).files.length) {
      fileRegister((ev.target as HTMLInputElement).files)
    }
  }

  function divClick(): void {
    document.getElementById('upload_file').click()
  }

  function fileRegister(fileList: FileList) {
    const okFiles: File[] = []
    for (let i = 0; i < fileList.length; i++) {
      const format = path2Format(fileList[i].name).toLowerCase()
      if (allowedFormat.indexOf(format) !== -1) {
        okFiles.push(fileList[i])
      }
    }
    if (okFiles.length !== 0) {
      if (isSrcOrTgt === 'src') {
        srcs.setFiles(okFiles)
      } else {
        tgts.setFiles(okFiles)
      }
    }
  }

  function fileReset(): void {
    if (isSrcOrTgt === 'src') {
      srcs.fileReset()
    } else {
      tgts.fileReset()
    }
  }
</script>

<div class="columns">
  <div class="column is-11">
    <div
      on:dragenter={dragEnter}
      on:dragleave={dragLeave}
      on:dragover|preventDefault
      on:drop|preventDefault={fileDroped}
      class:enter="{isEnter}"
      class="drop_zone"
      on:click={divClick}
    >
      <label for="upload_file_{isSrcOrTgt}" class="drop_label">
        {isWhich}ファイル：クリックして選択 または ドロップ
        <input type="file" multiple style="display:none" id="upload_file_{isSrcOrTgt}" on:change={(ev) => fileSelected(ev)}>
      </label>
    </div>
  </div>
  <div class="column is-1">
    <button class="button is-small is-danger" on:click={fileReset}>リセット</button>
  </div>
</div>

<style>

.drop_zone{
    display: block;
    width: 90%;
    height: 120px;
    border: 5px dotted black;
    border-radius: 1rem;
    margin: 0 auto;
    padding: auto;
    font-weight: bolder;
    background: #F5F5F5;
    text-align: center;
    padding-top: 0.5rem;
}

.enter {
    background: lightblue;
}

.drop_label {
  margin-top: 50px;
  vertical-align: middle;
}

</style>