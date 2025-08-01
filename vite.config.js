import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// reemplazá esto con el nombre de tu repositorio
const repoName = 'jordivann.github.io';

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
});
