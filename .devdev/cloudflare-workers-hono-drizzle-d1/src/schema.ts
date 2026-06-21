import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('Note', {
  id: text('id').primaryKey(),
  title: text('title').notNull().unique(),
  desc: text('desc'),
})
