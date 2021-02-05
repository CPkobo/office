<template>
  <v-card class="pa-3 ma-3">
    <v-card-title>
      除外事例
    </v-card-title>
    <v-row>
      <v-col cols="3" class="pa-5">
        <v-text-field
          v-model="exclusion"
          outlined
          dense
          label="除外文字（正規表現）"
        />
        <v-btn
          @click="execExclusion"
          color="primary"
          block
        >除外実行</v-btn>
        <v-btn
          @click="applyStore"
          color="secondary"
          block
          class="mt-2"
        >設定反映</v-btn>
      </v-col>
      <v-col cols="9" class="pa-5">
        <v-simple-table
          dense
        >
          <thead>
            <tr>
              <th>番号</th>
              <th>対象文字列</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tt, tx) in texts" :key="'ex-' + tx">
              <td>{{ tx + 1 }}</td>
              <td>
                <v-text-field v-model="texts[tx]"></v-text-field>
              </td>
              <td>
                {{ results[tx] }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        exclusion: '',
        texts: ['', '', '', '', '', ],
        results: ['', '', '', '', '', ],
      }
    },
    created() {
      this.exclusion = this.$store.state.fileIO.opt.exclusion
    },
    methods: {
      execExclusion() {
        const ex = new RegExp(this.exclusion)
        const results: string[] = ['', '', '', '', '', ]
        for (let i = 0; i < this.texts.length; i++) {
          if (this.texts[i] === '') {
            continue
          } else if (ex.test(this.texts[i])) {
            results[i] = '除外されます'
          } else {
            results[i] = '除外されません'
          }
        }
        this.results = results
      },
      applyStore() {
        this.$store.commit('fileIO/applyExclusionRules', this.exclusion)
      }
    }
  })
</script>

