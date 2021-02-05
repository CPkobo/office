<template>
  <v-container>
    <div v-if="!$store.state.fileIO.hasAligned">
    <file-card id="files1" :isSrcOrTgt="'src'" :mode="'align'" :next="'files2'" :prev="'none'" />
    <hr />
    <file-card id="files2" :isSrcOrTgt="'tgt'" :mode="'align'" :next="'option'" :prev="'prev'" />
    <hr />
    <option-card id="option" :mode="'align'" />
    </div>
    <div v-if="$store.state.fileIO.hasAligned">
      <align-result />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FileCard from '../FileCard.vue'
  import OptionCard from '../OptionCard.vue'
  import AlignResult from '../AlignResultCard.vue'

  export default Vue.extend({
    components: {
      FileCard,
      OptionCard,
      AlignResult,
    },
  })
</script>

<style scoped>

hr {
  border-top: 1px dashed teal;
  border-bottom: 1px dashed teal;
}

</style>