<template>
  <v-card class="pa-3 ma-3">
    <v-card-title>
      セグメント分割
    </v-card-title>
    <v-row>
      <v-col cols="3" class="pa-5">
        <v-text-field
          v-model="delimiters"
          outlined
          dense
          label="分割文字（正規表現）"
        />
        <v-btn
          @click="execSegmentaion"
          color="primary"
          block
        >分割実行</v-btn>
        <v-btn
          @click="applyStore"
          color="secondary"
          block
          class="mt-2"
        >設定反映</v-btn>
      </v-col>
      <v-col cols="9" class="pa-5">
        <v-textarea
          v-model="text"
          outlined
          label="対象文字列"
        />
      </v-col>
    </v-row>
    <v-row>
      <ol>
        <li class="ma-2" v-for="(tt, tx) in result" :key="'seg-' + tx">{{ tt }}</li>
      </ol>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { applySegRules } from '../office-funcs/util'
  import { ReadingOption, OptionQue } from '../office-funcs/option'

  export default Vue.extend({
    data() {
      const result: string[] = []
      return {
        delimiters: '',
        text: '',
        result,
      }
    },
    created() {
      this.delimiters = this.$store.state.fileIO.opt.delimiters
    },
    methods: {
      execSegmentaion() {
        const segTestOption: OptionQue = {
          name: 'Seg-TEST',
          segmentation: true,
          delimiters: this.delimiters,
          excluding: false,
          exclusion: '',
          wordRev: false,
          excelReadHidden: false,
          excelReadFilled: true,
          pptNote: false,
        }
        const opt = new ReadingOption(segTestOption)
        this.result = applySegRules([this.text], opt)
      },
      applyStore() {
        this.$store.commit('fileIO/applySegRules', this.delimiters)
      }
    }
  })
</script>

