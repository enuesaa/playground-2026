export interface NoteTable {
  id: string
  title: string
  desc: string | null
}

export interface Database {
  Note: NoteTable
}
