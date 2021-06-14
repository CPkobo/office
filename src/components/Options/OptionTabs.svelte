<script lang="ts">
  import { goto } from '@sapper/app';
  
  import { srcs, tgts } from '../../store/files'
  import { cxt } from '../../store/context'
  import { commonOpt, excelOpt, pptOpt, wordOpt, wordOpt2 } from '../../store/opt';

  import OptionBodyCommon from './OptionBodyCommon.svelte'
  import OptionBodyExcel from './OptionBodyExcel.svelte';
  import OptionBodyPpt from './OptionBodyPPT.svelte';
  import OptionBodyWord from './OptionBodyWord.svelte';

  import { blobContentsReader, path2FormatClassify } from '../../office-funcs/util'

  export let mode: string;

  let errMessage = ''
  let activePanel = 'common'

  function execution(): void {
    switch (mode) {
      case 'extract':
        execExtract()
          break;

      case 'align':
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
      // goto('loading_extract')
      const opq: OptionQue = {
        common: $commonOpt,
        word: $wordOpt,
        excel: $excelOpt,
        ppt: $pptOpt
      }
      blobContentsReader($srcs.files, $srcs.order, opq).then((exConts: ExtractedContent[]) => {
        console.log(opq.ppt)
        $cxt.readContent(exConts)
        // console.log($cxt.getRawContent('src'))
        goto('result_extract')
      })
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
        const sfFormat = path2FormatClassify(sfName)
        const tox = $tgts.order[i]
        const tfName = $tgts.files[tox].name
        const tfFormat = path2FormatClassify(tfName)
        if (sfFormat !== tfFormat) {
          console.log(sfFormat)
          console.log(tfFormat)
          errMessage = `原文${i + 1}と訳文${i + 1}のファイルの拡張子が違います`
          formatErr = true
          break
        }
      }
      if (!formatErr) {
        const prs: Promise<ExtractedContent[]>[] = []
        const opq: OptionQue = {
          common: $commonOpt,
          word: $wordOpt,
          excel: $excelOpt,
          ppt: $pptOpt
        }
        const opq2: OptionQue = {
          common: $commonOpt,
          word: $wordOpt2,
          excel: $excelOpt,
          ppt: $pptOpt
        }        
        prs.push(blobContentsReader($srcs.files, $srcs.order, opq))
        prs.push(blobContentsReader($tgts.files, $tgts.order, opq))
        Promise.all(prs).then((res: ExtractedContent[][]) => {
          $cxt.readContent(res[0], res[1])
          goto('result_align')
        }).catch((failure: ReadFailure) => {
          console.log(failure.detail)
        })
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
        <ul class="buttons">
          <li>
            <button
              class:is-active={activePanel === 'common'}
              class="button is-outlined m-2"
              on:click={() => activePanel = 'common'}
            >共通</button>
          </li>
          <li>
            <button
            class:is-active={activePanel === 'word'}
            class="button is-outlined m-2"
            on:click={() => activePanel = 'word'}
          >Word</button>
          </li>
          <li>
            <button
              class:is-active={activePanel === 'excel'}
              class="button is-outlined m-2"
              on:click={() => activePanel = 'excel'} 
            >Excel</button>
          </li>
          <li>
            <button
              class:is-active={activePanel === 'ppt'}
              class="button is-outlined m-2"
              on:click={() => activePanel = 'ppt'}
            >PPT</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  {#if activePanel === 'common'}
    <OptionBodyCommon on:execute={execution} />
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

