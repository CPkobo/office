import { writable } from 'svelte/store'

import { ExtractContext } from '../office-funcs/extract'
import { DiffInfoBrowser } from '../office-funcs/diff-brs'
import { TovisBrowser } from '../office-funcs/tovis-brs'

const context = new ExtractContext()
const diff = new DiffInfoBrowser()
const tovis = new TovisBrowser()
const wordSums: number[] = [0]
const charaSums: number[] = [0]
const wordTotal: number = 0
const charaTotal: number = 0
export const cxt = writable(context)
export const priorityVer = writable(0)
export const extractSums = writable({wordSums, charaSums, wordTotal, charaTotal})

export const df = writable(diff)
export const tvs = writable(tovis)