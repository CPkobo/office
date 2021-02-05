<template>
  <v-container>
    <div v-if="!$store.state.fileIO.hasExtracted">
      <file-card id="files1" :isSrcOrTgt="'src'" :next="'option'" :prev="'none'"/>
      <hr />
      <option-card id="option" :mode="'extract'"/>
    </div>
    <div v-if="$store.state.fileIO.hasExtracted">
      <extract-result />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FileCard from '../FileCard.vue'
  import ExtractResult from '../ExtractResultCard.vue'
  import OptionCard from '../OptionCard.vue'

  export default Vue.extend({
    components: {
      FileCard,
      ExtractResult,
      OptionCard,
    },
  })
</script>

<style scoped>

hr {
  border-top: 1px dashed teal;
  border-bottom: 1px dashed teal;
}

</style>