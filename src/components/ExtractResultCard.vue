<template>
  <v-card
    class="pa-5 ma-5">
    <v-card-title>抽出結果</v-card-title>
    <v-simple-table
      class="pa-3"
      dense
    >
      <thead>
        <tr>
          <th>ファイル名</th>
          <th>単語数</th>
          <th>文字数</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ext, idx) in $store.state.fileIO.context.src"
          :key="'cons' + idx"
          :class="{
            isWord: ext.format === 'docx',
            isExcel: ext.format === 'xlsx',
            isPpt: ext.format === 'pptx',
          }"
        >
          <td>{{ ext.name }}</td>
          <td class="digit">{{ wordSums[idx] }} 単語</td>
          <td class="digit">{{ charaSums[idx] }} 文字</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>合計</td>
          <td class="digit">{{ wordTotal }} 単語</td>
          <td class="digit">{{ charaTotal }} 文字</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card-actions>
      <v-btn
          class="ma-2"
          color="success"
          @click="downFile"
        >TXT ダウンロード</v-btn>
        <v-btn
          class="ma-2"
          color="secondary"
          @click="saveInBrowser"
        >ブラウザに保存</v-btn>
        <v-btn
          class="ma-2"
          color="info"
          @click="recalc"
        >再計算</v-btn>
        <v-btn
          class="ma-2"
          color="accent"
          @click="setMode(2)"
          to="/"
          nuxt
          outlined
        >分析へ&gt;&gt;</v-btn>
        <v-btn
        class="ma-2"
        color="secondary"
        @click="resetExtractContext"
      >戻る</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ExtractedContent } from '../funcs/extract'

  export default Vue.extend({
    data() {
      return {
        wordSums: [0],
        charaSums: [0],
        wordTotal: 0,
        charaTotal: 0,
      }
    },
    created() {
      this.recalc()
    },
    methods: {
      setMode(modeIndex: number) {
        this.$store.commit('setMode', modeIndex)
      },
      saveInBrowser() {
        window.localStorage.setItem('src-context', JSON.stringify(this.$store.state.fileIO.context.getRawContent('src')))
      },
      downFile(): void {
        this.$store.commit('fileIO/downloadClick', 'extract')
        // let link = document.createElement('a')
        // link.href = this.$store.state.fileIO.downurl1
        // link.download = 'extract.txt'
        // link.click()
      },
      recalc() {
        if (this.$store.state.fileIO.context === null) {
          return
        }
        const wordSums: number[] = []
        const charaSums: number[] = []
        const words = this.$store.state.fileIO.context.simpleCalc(
          'word', this.$store.state.fileIO.opt)
        const charas = this.$store.state.fileIO.context.simpleCalc(
          'chara', this.$store.state.fileIO.opt)
        this.wordTotal = Number(words[1].split('\t')[1])
        this.charaTotal = Number(charas[1].split('\t')[1])
        // ヘッダー行とサマリー行を読み飛ばすために i = 2 からスタート
        for (let i = 2; i < words.length; i++) {
          const eachWord: number = Number(words[i].split('\t')[1])
          const eachChara: number = Number(charas[i].split('\t')[1])
          wordSums.push(eachWord)
          charaSums.push(eachChara)
        }
        this.wordSums = wordSums
        this.charaSums = charaSums
      },
      resetExtractContext(): void {
        this.$store.commit('fileIO/resetExtractContext')
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isWord {
  background-color: lightblue;
}

.isExcel {
  background-color: lightgreen;
}

.isPpt {
  background-color: lightsalmon;
}

td.digit {
  text-align: right;
}
</style>
