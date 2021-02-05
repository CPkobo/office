<script lang="ts">
  import { goto } from '@sapper/app';
  import { srcs, tgts } from '../store/files'
  import OptionBodyCommon from './OptionBodyCommon.svelte'
  import OptionBodyExcel from './OptionBodyExcel.svelte';
  import OptionBodyPpt from './OptionBodyPPT.svelte';
  import OptionBodyWord from './OptionBodyWord.svelte';

  export let mode: String;

  let errMessage = ''
  let activePanel = 'common'

  function execution(): void {
    switch (mode) {
      case 'extract':
        console.log('after destroy?')
        execExtract()
          break;

      case 'align':
      console.log('after destroy?')
        execAlign()
          break;

      default:
        break;
    }
  }

  function execExtract(): void {
    const srcFileNums = $srcs.files.length;
    if (srcFileNums === 0) {
      errMessage = '最低 1ファイルは必要です'
    } else {
      goto('loading_extract')
    }
  }

  function execAlign(): void {
    const srcFileNums = $srcs.order.length
    const tgtFileNums = $tgts.order.length
    if (srcFileNums === 0 || tgtFileNums === 0) {
      errMessage = '最低 1ファイルは必要です'
    }else if (srcFileNums !== tgtFileNums) {
      errMessage = '原文と訳文のファイル数が違います'
    } else {
      let formatErr = false
      for (let i = 0; i < srcFileNums; i++) {
        const sox = $srcs.order[i]
        const sfName = $srcs.files[sox].name
        const sfFormat = sfName.substr(sfName.lastIndexOf('.'))
        const tox = $tgts.order[i]
        const tfName = $tgts.files[tox].name
        const tfFormat = tfName.substr(tfName.lastIndexOf('.'))
        if (sfFormat !== tfFormat) {
          errMessage = `原文${i + 1}と訳文${i + 1}のファイルの拡張子が違います`
          formatErr = true
          break
        }
      }
      if (!formatErr) {
        errMessage = 'これから'
      }
    }
  }
</script>

<div class="card m-3 p-5 is-fullwidth">
  <div class="level">
    <div class="level-itme">
      <h2>詳細設定</h2>
    </div>
    <div class="level-item">
      <nav class="tabs is-cnetered">
        <ul>
          <li class:is-active={activePanel === 'common'} on:click={() => activePanel = 'common'}><a>共通</a></li>
          <li class:is-active={activePanel === 'word'} on:click={() => activePanel = 'word'}><a>Word</a></li>
          <li class:is-active={activePanel === 'excel'} on:click={() => activePanel = 'excel'}><a>Excel</a></li>
          <li class:is-active={activePanel === 'ppt'} on:click={() => activePanel = 'ppt'}><a>PPT</a></li>
        </ul>
      </nav>
    </div>
  </div>
  {#if activePanel === 'common'}
    <OptionBodyCommon {mode} on:execute={execution} />
  {:else if activePanel === 'word'}
    <OptionBodyWord {mode} on:execute={execution} />
  {:else if activePanel === 'excel'}
    <OptionBodyExcel on:execute={execution} />
  {:else if activePanel === 'ppt'}
    <OptionBodyPpt on:execute={execution} />
  {/if}
  
  {#if errMessage !== ''}
  <div class="container">
    <div class="notification is-info">
      <button class="delete" on:click={() => errMessage = ''}></button>
        {errMessage}
    </div>
  </div>
  {/if}
</div>

