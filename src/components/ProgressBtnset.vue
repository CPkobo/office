<template>
  <div>
    <v-btn 
      outlined
      :disabled="prev === 'none'"
      :to="'#' + prev"
    >
    &lt;&lt;前へ</v-btn>
    <v-btn
      outlined
      :disabled="next === 'none'"
      :to="'#' + next"
    >次へ&gt;&gt;</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    next: String,
    prev: String,
  }    
})
</script>