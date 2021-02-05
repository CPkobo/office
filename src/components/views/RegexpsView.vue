<template>
  <v-flex>
    <v-container fluid>
      <seg-playground />
      <exclusion-playground class="ma-2" />
    </v-container>
  </v-flex> 
</template>

<script lang="ts">
  import Vue from 'vue'
  import SegPlayground from '../SegPlayground.vue'
  import ExclusionPlayground from '../ExclusionPlayground.vue'

  export default Vue.extend({
    components: {
      SegPlayground,
      ExclusionPlayground,
    },
  })
</script>
