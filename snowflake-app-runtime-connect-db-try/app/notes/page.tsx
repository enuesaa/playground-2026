export const dynamic = 'force-dynamic';

import { findNotes } from '@/lib/models/note';

export default async function Page() {
  const notes = await findNotes();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          color: #f0f0f0;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .header {
          margin-bottom: 40px;
          border-bottom: 1px solid #1e1e1e;
          padding-bottom: 24px;
        }

        .header-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #6ee7b7;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .header-title {
          font-size: 22px;
          font-weight: 500;
          color: #f0f0f0;
        }

        .header-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #555;
          margin-top: 4px;
        }

        .notes-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .note-item {
          display: grid;
          grid-template-columns: 64px 1fr;
          border-left: 2px solid #1e1e1e;
          transition: border-color 0.15s;
        }

        .note-item:hover {
          border-left-color: #6ee7b7;
        }

        .note-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #444;
          padding: 18px 16px 18px 12px;
          line-height: 1;
          padding-top: 20px;
        }

        .note-content {
          padding: 16px 12px 16px 0;
          border-bottom: 1px solid #141414;
        }

        .note-title {
          font-size: 14px;
          font-weight: 500;
          color: #e8e8e8;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .note-title:empty::before {
          content: '(no title)';
          color: #333;
        }

        .note-body {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .empty {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #333;
          padding: 48px 0;
          text-align: center;
        }
      `}</style>

      <div className="container">
        <div className="header">
          <div className="header-label">snowflake / notes</div>
          <div className="header-title">Notes</div>
          <div className="header-count">{notes.length} records</div>
        </div>

        {notes.length === 0 ? (
          <div className="empty">no records found</div>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.ID} className="note-item">
                <span className="note-id">#{note.ID}</span>
                <div className="note-content">
                  <div className="note-title">{note.TITLE}</div>
                  {note.BODY && <div className="note-body">{note.BODY}</div>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
