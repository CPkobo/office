declare interface FilesInfo {
  files: File[];
  order: number[];
}

declare type ClassifiedFormat = 'is-word' | 'is-excel' | 'is-ppt' | ''

declare type CountType = 'unit' | 'chara'