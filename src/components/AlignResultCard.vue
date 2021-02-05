<template>
  <v-card
    class="pa-5 ma-5">
    <v-card-title>対訳表 作成結果</v-card-title>
    <v-simple-table
      class="pa-3"
      dense
    >
      <thead>
        <tr>
          <th>フォーマット</th>
          <th>原文ファイル名</th>
          <th>訳文ファイル名</th>
          <th colspan="2">段落｜シート｜スライド</th>
          <th colspan="2">表組｜テキストボックス｜ノート</th>
          <th colspan="2">その他</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(spair, idx) in statsList"
          :key="'stats' + idx"
          :class="{
            isWord: spair.format === 'docx',
            isExcel: spair.format === 'xlsx',
            isPpt: spair.format === 'pptx',
          }"
        >
          <td>{{ spair[0].format }}
          <td>{{ spair[0].name }}</td>
          <td>{{ spair[1].name }}</td>
          <td class="digit">{{ spair[0].doc_para + spair[0].xl_sheet + spair[0].ppt_slide}}</td>
          <td class="digit">{{ spair[1].doc_para + spair[1].xl_sheet + spair[1].ppt_slide}}</td>
          <td class="digit">{{ spair[0].doc_table + spair[0].xl_shape + spair[0].ppt_note}}</td>
          <td class="digit">{{ spair[1].doc_table + spair[1].xl_shape + spair[1].ppt_note}}</td>
          <td class="digit">{{ spair[0].ppt_dgm }}</td>
          <td class="digit">{{ spair[1].ppt_dgm }}</td>
        </tr>
      </tbody>
      <!-- <tbody>
        <tr>
          <td>合計</td>
          <td class="digit">{{ wordTotal }} 単語</td>
          <td class="digit">{{ charaTotal }} 文字</td>
        </tr>
      </tbody> -->
    </v-simple-table>
    <v-card-actions>
      <v-btn
        class="ma-2"
        color="success"
        @click="downFile"
      >TSV ダウンロード</v-btn>
      <v-btn
        class="ma-2"
        color="secondary"
        @click="saveInBrowser"
      >ブラウザに保存</v-btn>
      <v-btn
        class="ma-2"
        color="secondary"
        @click="resetAlignContext"
      >戻る</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ExtractedContent } from '../funcs/extract'
  import { FileStats } from '../funcs/stats'

  export default Vue.extend({
    data() {
      const statsList: FileStats[][] = []
      return {
        statsList,
      }
    },
    created() {
      this.statsList = this.$store.state.fileIO.context.getAlignStats()
    },
    methods: {
      downFile(): void {
        this.$store.commit('fileIO/downloadClick', 'align')
        // let link = document.createElement('a')
        // link.href = this.$store.state.fileIO.downurl2
        // link.download = 'align.tsv'
        // link.click()
      },
      saveInBrowser(): void {
        window.localStorage.setItem('src-context', JSON.stringify(this.$store.state.fileIO.context.getRawContent('src')))
        window.localStorage.setItem('tgt-context', JSON.stringify(this.$store.state.fileIO.context.getRawContent('tgt')))
      },
      resetAlignContext(): void {
        this.$store.commit('fileIO/resetAlignContext')
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
