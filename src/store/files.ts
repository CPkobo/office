import { writable } from 'svelte/store'

function createFileStore() {
  const info: FilesInfo = {
    files: [],
    order: [],
  }
  const { subscribe, set, update } = writable(info)

  return {
    subscribe,
    setFiles: (added: File[]) => {
      update(self => {
        const shorterNumber = self.order.length
        self.files.push(...added)
        const longerNumber = self.files.length
        const longerOrder = [...Array(longerNumber).keys()]
        longerOrder.splice(0, shorterNumber)
        self.order.push(...longerOrder)
        console.log(self)
        return self
      })
    },
    fileUp: (index: number) => {
      update(self => {
        const moving = self.order[index]
        self.order.splice(index, 1)
        self.order.splice(index - 1, 0, moving)
        return self
      })
    },
    fileDown: (index: number) => {
      update(self => {
        const moving = self.order[index]
        self.order.splice(index, 1)
        self.order.splice(index + 1, 0, moving)
        return self
      })
    },
    fileRemove: (index: number) => {
      update(self => {
        const fileName = self.files[index].name
        self.files = [...self.files].filter(val => {
          return val.name !== fileName
        })
        self.order = self.order.map((val: number) => {
          if (val > index) {
            return val - 1
          } else if (val < index) {
            return val
          }
        }).filter((val: number) => {
          return val !== undefined
        })
        return self
      })
    },
    fileReset: () => {
      set({
        files: [],
        order: [],
      })
    },
  }
}

export const srcs = createFileStore()
export const tgts = createFileStore()