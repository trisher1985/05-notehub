import axios from "axios";
import type { Note, NoteFormData } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes/";
const NOTES_PER_PAGE = 12;

interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
  totalNotes?: number; // Додано, якщо API повертає
}

interface NoteHubSearchParams {
  params: {
    search?: string;
    page: number;
    perPage: number;
  };
  headers: {
    authorization: string;
  };
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

// Додамо інтерцептор для авторизації (якщо використовується в багатьох місцях)
axios.interceptors.request.use((config) => {
  if (myToken) {
    config.headers.Authorization = `Bearer ${myToken}`;
  }
  return config;
});

export async function fetchNotes(
  query: string,
  page: number
): Promise<NoteHubResponse> {
  try {
    const params: NoteHubSearchParams["params"] = {
      page,
      perPage: NOTES_PER_PAGE,
    };
    if (query.trim() !== "") {
      params.search = query.trim();
    }
    const response = await axios.get<NoteHubResponse>(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
}

export async function removeNote(id: number): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw new Error("Failed to delete note. Please try again later.");
  }
}

export async function createNote(note: NoteFormData): Promise<Note> {
  try {
    const response = await axios.post<Note>(API_URL, note);
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw new Error("Failed to create note. Please try again later.");
  }
}