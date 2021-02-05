<script lang="ts">
    import { onMount } from 'svelte'
    import { srcs } from '../store/files'
    import { commonOpt, wordOpt, excelOpt, pptOpt } from '../store/opt'
    
    import { cxt } from '../store/context'

    onMount(async () => {
        console.log('9')
        const opq: OptionQue = {
            common: $commonOpt,
            word: $wordOpt,
            excel: $excelOpt,
            ppt: $pptOpt,
        }
        cxt.execExtract($srcs.files, $srcs.order, opq)
    })

</script>