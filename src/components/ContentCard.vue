<template>
  <v-card
    shaped
    class="pa-5 ma-5">
    <v-card-title :class="isFormat">
      {{ $store.state.fileIO.context.src[index].name }}
      <v-btn @click="foldTable" class="ml-10" outlined small v-text="foldBtn"></v-btn>
      <v-btn @click="contentMoveUp" class="ml-3" small outlined>↑</v-btn>
      <v-btn @click="contentMoveDown" class="ml-3" small outlined>↓</v-btn>
    </v-card-title>
    <v-scroll-y-transition
     v-if="show"
    >
    <v-simple-table
      class="pa-3"
      dense
    >
      <thead>
        <tr>
          <th>場所</th>
          <th>翻訳対象</th>
          <th>{{ crtUnit }}数</th>
        </tr>
      </thead>
      <tbody v-if="$store.state.fileIO.context.src[index].format !== 'docx'">
        <tr
          v-for="(eText, idx) in $store.state.fileIO.context.src[index].exts"
          :key="'cons' + idx"
        >
          <td>{{ eText.type.split('-')[1] }}-{{ eText.position }}</td>
          <td>
            <input type="checkbox"
              v-model="actives[idx]"
              dense
              hide-details
            />
          </td>
          <td class="digit">{{ sums[idx] }} {{ crtUnit }}</td>
        </tr>
      </tbody>
      <tbody>
        <tr v-if="isFormat==='isPpt'">
          <td></td>
          <td>スライド小計</td>
          <td class="digit">{{ subTotal[0] }} {{ crtUnit }}</td>
        </tr>
        <tr v-if="isFormat==='isPpt'">
          <td></td>
          <td>ノート小計</td>
          <td class="digit">{{ subTotal[1] }} {{ crtUnit }}</td>
        </tr>
        <tr>
          <td></td>
          <td>合計</td>
          <td class="digit">{{ total }} {{ crtUnit }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    </v-scroll-y-transition>
    <v-card-actions>
      <v-btn @click="simpleCalcThisFile('chara')">文字数計算</v-btn>
      <v-btn @click="simpleCalcThisFile('word')">単語数計算</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ExtractedContent } from '../funcs/extract'

  export default Vue.extend({
    props: {
      'index': Number,
    },
    created() {
      if (this.$store.state.fileIO.context.src[this.index].name.endsWith('docx')) {
        this.isFormat = 'isWord'
      } else if (this.$store.state.fileIO.context.src[this.index].name.endsWith('xlsx')) {
        this.isFormat = 'isExcel'
      } else if (this.$store.state.fileIO.context.src[this.index].name.endsWith('pptx')) {
        this.isFormat = 'isPpt'
      }
    },
    data() {
      const con: ExtractedContent = this.$store.state.fileIO.context.src[this.index]
      const actives: boolean[] = []
      const sums: number[] = []
      for (let i = 0; i < con.exts.length; i++) {
        actives.push(con.exts[i].isActive)
        sums.push(0)
      }
      return {
        show: true,
        crtUnit: '文字',
        sums,
        actives,
        isFormat: ''
      }
    },
    watch: {
      actives() {
        this.setActives()
      }
    },
    methods: {
      foldTable() {
        this.show = !this.show
      },
      setActives() {
        this.$store.commit('fileIO/changeActives', {target: 'src', index: this.index, actives: this.actives})
      },
      getActives() {
        const con: ExtractedContent = this.$store.state.fileIO.context.src[this.index]
        const actives: boolean[] = []
        const sums: number[] = []
        for (let i = 0; i < con.exts.length; i++) {
          actives.push(con.exts[i].isActive)
          sums.push(0)
        }
        this.actives = actives
        this.sums = sums
      },
      contentMoveUp() {
        if (this.index === 0) {
          return
        } else {
          this.$store.commit('fileIO/contentMove', {fx: this.index, move: -1})
        }
      },
      contentMoveDown() {
        if (this.index === this.$store.state.fileIO.context.src.length) {
          return
        } else {
          this.$store.commit('fileIO/contentMove', {fx: this.index, move: 1})
        }
      },
      simpleCalcThisFile(unit: 'chara' | 'word') {
        if (unit === 'chara') {
          this.crtUnit = '文字'
        } else if (unit === 'word') {
          this.crtUnit = '単語'
        }
        console.log('143')
        this.sums = this.$store.state.fileIO.context.simpleCalcOneFile(unit, this.index, this.$store.state.fileIO.opt)
      }
    },
    computed: {
      foldBtn(): string {
        return this.show ? '折りたたむ' : ' 表示する '
      },
      subTotal(): number[] {
        const subT: number[] = [0, 0]
        if (this.isFormat === 'isPpt') {
          const exts = this.$store.state.fileIO.context.src[this.index].exts
          for (let i = 0; i < exts.length; i++) {
            if (exts[i].type === 'PPT-Note') {
              subT[1] += this.sums[i]
            } else {
              subT[0] += this.sums[i]
            }
          }
        }
        return subT
      },
      total(): number {
        let t = 0
        for (const s of this.sums) {
            t += s
          }
            return t
      },
    },
    mounted() {
      this.$store.subscribe((mutation: any, state: any) => {
        if (mutation.type === 'fileIO/contentMove') {
          this.getActives()
        } 
      })
      this.simpleCalcThisFile('chara')
    },

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
