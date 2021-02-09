<template>
  <v-card class="pa-5">
    <v-card-title align-center>
      <v-icon>{{ 'mdi-information-outline' }}</v-icon>&nbsp;
      テキスト抽出 詳細設定
    </v-card-title>
    <v-row>
      <v-col cols="4" class="lbl">
        <label>出力ファイル名</label>
      </v-col>
      <v-col cols="3">
        <v-text-field
            label="ファイル名"
            dense
            v-model="name"
            suffix=".txt"
            outlined
            :disabled="use1st"
          />
      </v-col>
      <v-col cols="5">
        <v-switch
          label="一番上のファイル名を使用する"
          v-model="use1st"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>Wordの修正履歴</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="wordRev"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>修正前</v-btn>
          <v-btn>修正後</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>Excelの非表示シート</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="excelReadHidden"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>読み込まない</v-btn>
          <v-btn>読み込む</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="4" class="lbl">
        <label>Excelの色付きセル</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="excelReadFilled"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>読み込まない</v-btn>
          <v-btn>読み込む</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>PPTのノート</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="pptNote"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>抽出しない</v-btn>
          <v-btn>抽出する</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>セグメンテーション</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="segmentation"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>分割しない</v-btn>
          <v-btn>分割する</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="delimiters"
          label="分割規則"
          dense
          outlined
          :disabled="segmentation === 0"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>正規表現による除外</label>
      </v-col>
      <v-col cols="3">
        <v-btn-toggle
          v-model="excluding"
          color="primary"
          dense
          class="pl-3"
        >
          <v-btn>除外しない</v-btn>
          <v-btn>除外する</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="exclusion"
          label="正規表現"
          dense
          outlined
          :disabled="excluding === 0"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="lbl">
        <label>重複による割合</label>
      </v-col>
      <v-col cols="8">
        <v-simple-table dense>
          <thead>
            <tr>
              <td>重複</td>
              <td>95-99%</td>
              <td>85-94%</td>
              <td>75-84%</td>
              <td>50-74%</td>
              <td>0-49%</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><v-text-field
                v-model.number="wwc.dupli"
                dense
                hide-details
              /></td>
              <td><v-text-field
                v-model.number="wwc.over95"
                dense
                hide-details
              /></td>
              <td><v-text-field
                v-model.number="wwc.over85"
                dense
                hide-details
              /></td>
              <td><v-text-field
                v-model.number="wwc.over75"
                dense
                hide-details
              /></td>
              <td><v-text-field
                v-model.number="wwc.over50"
                dense
                hide-details
              /></td>
              <td><v-text-field
                v-model.number="wwc.under49"
                dense
                hide-details
              /></td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
        <v-btn
          color="secondary"
          @click="confirmOption"
        >
          この設定を使用する
        </v-btn>
        <v-btn
          color="error"
          @click="cancelOption"
        >
          キャンセル
        </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { OptionQue, ReadingOption } from '../office-funcs/option'
  import { WWCRate } from '../office-funcs/diff'

  export default Vue.extend({
    created() {
      this.name = this.$store.state.fileIO.opt.name
      this.use1st = this.$store.state.fileIO.opt.name === ''
      this.wordRev = this.$store.state.fileIO.opt.wordRev ? 1 : 0
      this.excelReadHidden = this.$store.state.fileIO.opt.excelReadHidden ? 1 : 0
      this.excelReadFilled = this.$store.state.fileIO.opt.excelReadFilled ? 1 : 0
      this.pptNote = this.$store.state.fileIO.opt.pptNote ? 1 : 0
      this.segmentation = this.$store.state.fileIO.opt.segmentation ? 1: 0
      this.delimiters = this.$store.state.fileIO.opt.delimiters
      this.excluding = this.$store.state.fileIO.opt.excluding ? 1 : 0
      this.exclusion = this.$store.state.fileIO.opt.exclusion
      this.wwc.dupli = this.$store.state.fileIO.wwc.dupli
      this.wwc.over95 = this.$store.state.fileIO.wwc.over95
      this.wwc.over85 = this.$store.state.fileIO.wwc.over85
      this.wwc.over75 = this.$store.state.fileIO.wwc.over75
      this.wwc.over50 = this.$store.state.fileIO.wwc.over50
      this.wwc.under49 = this.$store.state.fileIO.wwc.under49
    },
    data() {
      return {
        name: 'Extract',
        use1st: false,
        wordRev: 1,
        excelReadHidden: 0,
        excelReadFilled: 1,
        pptNote: 1,
        segmentation: 0,
        delimiters: '(\\。|\\. |\\! |\\? |\\！|\\？)',
        excluding: 0,
        exclusion: '^[０-９0-9]+$',
        wwc: {
          dupli: 0.15,
          over95: 0.3,
          over85: 0.6,
          over75: 0.8,
          over50: 1,
          under49: 1,
        },
      }
    },
    methods: {
      confirmOption(): void { 
        const opt = new ReadingOption({
          name: this.use1st ? '' : this.name,
          excluding: this.excluding === 1,
          exclusion: this.exclusion,
          delimiters: this.delimiters,
          segmentation: this.segmentation === 1,
          wordRev: this.wordRev === 1,
          excelReadHidden: this.excelReadHidden === 1,
          excelReadFilled: this.excelReadFilled === 1,
          pptNote: this.pptNote === 1,
        })
        const wwc: WWCRate = {
          dupli: this.wwc.dupli,
          over95: this.wwc.over95,
          over85: this.wwc.over85,
          over75: this.wwc.over75,
          over50: this.wwc.over50,
          under49: this.wwc.under49,
        }
        this.$store.commit('fileIO/setReadingOption', {opt, wwc, target: 'extract'})
        this.cancelOption()
      },
      cancelOption(): void {
        this.$store.commit('fileIO/closeOption')
      },
    },
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.lbl {
  text-align: right;
  padding-right: 3rem;
}
</style>
