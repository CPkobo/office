<template>
  <v-container>
    <div v-if="!$store.state.fileIO.hasExtracted">
      <p>分析前にテキストの抽出が必要です
        <v-btn
          class="ma-2"
          color="accent"
          to="/extract"
          outlined
        >テキスト抽出ツールへ&gt;&gt;</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          @click="loadFromBrowser"
        >ブラウザから読み込む</v-btn>
      </p>
    </div>
    <div v-if="$store.state.fileIO.hasExtracted">
      <content-card
        v-for="(con, cx) in $store.state.fileIO.context.src"
        :key="'con'+cx"
        :index="cx" />
      <v-btn
        block
        x-large
        color="primary"
        @click="createDiffInfo"
      >{{ createBtn }}</v-btn>

      <v-row v-if="isAnalyzed">
        <v-btn
          class="ma-2"
          color="secondary"
          @click="getDiffCalc('wwc-chara')"
        >文字数カウント</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          @click="getDiffCalc('wwc-word')"
        >単語数カウント</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          @click="getDiffdata"
        >結果ファイル作成</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ContentCard from '../ContentCard.vue'

  import { WWCRate, WWCInfo, WWCReport,
          DiffInfo, DiffSeg, SimilarSegment } from '../office-funcs/diff'

  export default Vue.extend({
    data() {
      const diff = new DiffInfo()
      return {
        diff,
        isAnalyzed: false,
        fileName: 'Extract',
        optionShow: false,
      }
    },
    computed: {
      createBtn(): string {
        return this.isAnalyzed ? '再分析' : '分析実行'
      }
    },
    components: {
      ContentCard,
    },
    methods: {
      loadFromBrowser() {
        const jsonStr = window.localStorage.getItem('src-context')
        if (jsonStr !== undefined) {
          this.$store.commit('fileIO/readSrcFromBrowser', jsonStr)
        } else {
          this.$store.commit('raiseNotice', 'データが保存されていません')
        }
      },
      createDiffInfo() {
        const src = this.$store.state.fileIO.context.getRawContent('src')
          if (src === null) {
            this.$store.commit('raiseNotice', 'ファイルが読み込まれていません')
            return
          }
          this.diff.analyze(src)
          this.isAnalyzed = true
      },
      getDiffdata() {
        if (!this.isAnalyzed) {
          this.createDiffInfo()
        }
        const report: string = this.diff.exportResult('diff', 'json')
        const blob = new Blob([report], { type: 'application/json;charset=utf-8' })
        const downurl = URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.href = downurl
        link.download = 'diff.json'
        link.click()
      },
      getDiffCalc(unit: 'wwc-chara' | 'wwc-word') {
        if (!this.isAnalyzed) {
          this.createDiffInfo()
        }
        const report: string = this.diff.exportResult(unit, 'human', this.$store.state.fileIO.wwc)
        const blob = new Blob([report], { type: 'tsv/plain;charset=utf-8' })
        const downurl = URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.href = downurl
        link.download = `report.tsv`
        link.click()
      }
    }
  })
</script>
