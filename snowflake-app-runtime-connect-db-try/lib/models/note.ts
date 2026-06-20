import { getConnection } from '../db';

export type Note = {
  ID: number;
  TITLE: string | null;
  BODY: string | null;
};

export async function findNotes(): Promise<Note[]> {
  const conn = await getConnection();
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText: 'SELECT ID, TITLE, BODY FROM DEST_DB."public"."notes" ORDER BY ID DESC LIMIT 50',
      complete: (err, _stmt, rows) => {
        if (err) reject(err);
        else resolve((rows ?? []) as Note[]);
      },
    });
  });
}
