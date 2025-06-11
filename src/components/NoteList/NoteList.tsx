import React from 'react';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => onDeleteNote(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
