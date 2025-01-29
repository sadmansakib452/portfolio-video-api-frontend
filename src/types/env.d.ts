interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_SUPER_ADMIN_EMAIL: string
  readonly VITE_SUPER_ADMIN_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 