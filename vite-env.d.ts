/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_TOKEN: string;
    // Добавь сюда другие переменные, если будут
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  