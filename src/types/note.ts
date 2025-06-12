export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}