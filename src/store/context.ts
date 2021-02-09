import { writable } from 'svelte/store'

import { ExtractContext } from '../office-funcs/extract'

const context = new ExtractContext()
export const cxt = writable(context)