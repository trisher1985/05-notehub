import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error('VITE_NOTEHUB_TOKEN is not defined');
  }
  return config;
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  try {
    const params: Record<string, any> = { page, perPage };
    if (search) params.search = search;

    const { data }: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/', { params });
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch notes: ${error.message || error}`);
  }
};

interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  try {
    const { data }: AxiosResponse<Note> = await axiosInstance.post('/', note);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message || error}`);
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const { data }: AxiosResponse<Note> = await axiosInstance.delete(`/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to delete note with ID ${id}: ${error.message || error}`);
  }
};
