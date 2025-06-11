/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string; // API ключ v3
  readonly VITE_TMDB_TOKEN: string;
  readonly VITE_NOTEHUB_TOKEN: string;// Bearer токен v4
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
