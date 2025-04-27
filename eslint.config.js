import js from '@eslint/js';
import pluginJs from '@eslint/js';

import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      'simple-import-sort': simpleImportSort
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },
  pluginJs.configs.recommended
]);
