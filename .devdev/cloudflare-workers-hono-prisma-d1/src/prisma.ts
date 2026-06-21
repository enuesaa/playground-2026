import { PrismaClient } from './generated/prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

const prismaClients = {
  async fetch(db: D1Database) {
    const adapter = new PrismaD1(db)
    return new PrismaClient({ adapter })
  },
}

export default prismaClients
