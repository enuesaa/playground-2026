export const dynamic = 'force-dynamic';

import { findNotes } from '@/lib/models/note';

export default async function Page() {
  const notes = await findNotes();

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.ID}>
          <strong>{note.TITLE}</strong>
          <p>{note.BODY}</p>
        </li>
      ))}
    </ul>
  );
}
