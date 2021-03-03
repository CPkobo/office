<script lang="ts">
  export let message: string = ''
</script>

<div class="err-message">
  <h4>正規表現エラー</h4>
  <p>{message}</p>
</div>

<style>
  div.err-message {
    margin-top: 0.5rem;
    font-weight: bold;
    color: red;
  }
</style>