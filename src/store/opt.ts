import { writable } from 'svelte/store'
import { ReadingOption } from '../office-funcs/option'

const {common, word, excel, ppt} = new ReadingOption({}).createOptionQue()
const word2: WordOption = {
  afterRev: true
}

const browserOption = {
  isAutoDown: true,
  hasAd: true,
  // use1st: common.name === '',
}

const defaultWWC: WWCRate = {
  dupli: 0.15,
  over95: 0.3,
  over85: 0.6,
  over75: 0.8,
  over50: 1,
  under49: 1,
}

export const commonOpt = writable(common)
export const wordOpt = writable(word)
export const excelOpt = writable(excel)
export const pptOpt = writable(ppt)
export const wordOpt2 = writable(word2)
export const browserOpt = writable(browserOption)
export const wwcOpt = writable(defaultWWC)
