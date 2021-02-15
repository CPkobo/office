<script lang="ts">
  import AdTemplateV from '../components/ads/AdTemplateV.svelte';
</script>

<div class="content">
  <h1>CATOVIS Office スタートページ</h1>
  <p>上部メニューバーの「メニュー」をクリックするか、下記のリストから実行したい処理を選んでください</p>
  <ul>
    <li><a href="/extract">テキスト抽出</a></li>
    <li><a href="/align">対訳表作成</a></li>
    <li><a href="/regexp">正規表現ラボ</a></li>
    <li><a href="/analyze">類似度解析</a></li>
    <li><a href="/diff">差分抽出</a></li>
    <li><a href="/license">ライセンス</a></li>
  </ul>
</div>