/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTEHUB_TOKEN: string;// Bearer токен v4
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
