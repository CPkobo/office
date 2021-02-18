import { writable } from 'svelte/store'

export const showDetailedExtract = writable(false)

export const interDiff = writable({
  index: -1,
  show: false,
})