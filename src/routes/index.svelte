<script lang="ts">
import CatovisLogo from '../components/CatovisLogo.svelte';
import { getVer } from '../office-funcs/util'

let description: string = '項目を選択してください'
function writeDescription(target) {
  switch (target) {
    case 'extract':
      description = 'Word / Excel / PPT からテキストを抽出し、文字数をカウントします'
      break;
    case 'align':
      description = '原文・訳文のWord / Excel / PPT からテキストを抽出し、対訳表を作成します'
      break;
    case 'analyze':
      description = '抽出をしたテキストについて、類似の文が出現する割合を計算します'
      break;
    case 'regexp':
      description = '文の区切りや、読み込みをスキップするための正規表現を検証します'
      break;
    case 'diff':
      description = '2つの文章の相違点を文字単位で表示します'
      break;
    case 'license':
      description = 'CATOVIS Officeに使用しているツールのライセンスです'
      break;
    default:
      description = '項目を選択してください'
      break;
  }
}
</script>

<div class="content">
  <h1>CATOVIS Office スタートページ </h1>
  <h2>【Ver. {getVer()} 】</h2>
  <p>上部メニューバーの「メニュー」をクリックするか、下記のリストから実行したい処理を選んでください</p>
  <ul>
    <li 
      on:mouseenter={() => writeDescription('extract')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/extract">テキスト抽出</a></li>
    <li
      on:mouseenter={() => writeDescription('align')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/align">対訳表作成</a></li>
    <li
      on:mouseenter={() => writeDescription('regexp')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/regexp">正規表現ラボ</a></li>
    <li
      on:mouseenter={() => writeDescription('analyze')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/analyze">類似度解析</a></li>
    <li
      on:mouseenter={() => writeDescription('diff')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/diff">差分抽出</a></li>
    <li
      on:mouseenter={() => writeDescription('license')}
      on:mouseleave={() => writeDescription('')}
    ><a href="/license">ライセンス</a></li>
  </ul>
  <div>
    <p>{description}</p>
  </div>
</div>

<!-- <a href="test">
  <CatovisLogo />
</a> -->
<CatovisLogo />