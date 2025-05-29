import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import filenamesPlugin from 'eslint-plugin-filenames';
import foldersPlugin from 'eslint-plugin-folders';
import stylisticJs from '@stylistic/eslint-plugin-js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextjs from '@next/eslint-plugin-next';

const eslintConfig = [
  // 무시할 파일들
  {
    ignores: ['dist', 'node_modules', '.next', 'out'],
  },

  // JavaScript 기본 권장 설정
  js.configs.recommended,

  // TypeScript 권장 설정들
  ...tseslint.configs.recommended,

  // 메인 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        },
        typescript: {},
      },
      filenames: {
        components: '^[A-Z][a-zA-Z0-9]*$',
        utils: '^[a-z][a-zA-Z0-9]*$',
      },
      folders: {
        pattern: '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      react: react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      filenames: filenamesPlugin,
      folders: foldersPlugin,
      '@stylistic/js': stylisticJs,
      '@next/next': nextjs,
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      // React 기본 권장 규칙들
      ...react.configs.recommended.rules,

      // React Hooks 권장 설정
      ...reactHooks.configs.recommended.rules,

      // JSX A11y 권장 설정
      ...jsxA11y.configs.recommended.rules,

      // Next.js 권장 설정
      ...nextjs.configs.recommended.rules,
      ...nextjs.configs['core-web-vitals'].rules,

      // var 금지
      'no-var': 'error',

      // for...in 비권장, for...of 권장
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for...in is not recommended. Use for...of or high-level iteration methods instead.',
        },
      ],

      // 객체 생성자 사용 금지
      'no-new-object': 'error',

      // 유효하지 않은 객체 키는 따옴표 사용
      'quote-props': ['error', 'as-needed'],

      // new Array() 생성자 사용 금지
      'no-array-constructor': 'error',

      // 인라인 함수 지양
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],

      // React 17+ JSX Transform 사용
      'react/react-in-jsx-scope': 'off',

      // Prettier 설정
      'prettier/prettier': [
        'error',
        {
          experimentalOperatorPosition: 'start',
          singleAttributePerLine: true,
          experimentalTernaries: false,
        },
      ],

      // 화살표 함수: 중괄호 생략 가능
      'arrow-body-style': ['error', 'as-needed'],

      // 콜백 선언은 화살표 함수
      'prefer-arrow-callback': 'error',

      // React target blank 규칙 비활성화
      'react/jsx-no-target-blank': 'off',

      // React Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 기본 unused vars 규칙 비활성화 (TypeScript 전용 사용)
      // 'no-unused-vars': 'off',

      // TypeScript 전용 unused vars 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // argsIgnorePattern: '^_',
          // varsIgnorePattern: '^(T|K|V|U|E|Key|value)$',
        },
      ],

      // JSX에서 변수 사용 시 오류 방지
      'react/jsx-uses-vars': 'error',

      // 일치 비교 연산자(===) 강제
      eqeqeq: ['error', 'always'],

      // 컴포넌트는 화살표 함수 또는 함수 표현식 사용
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-expression', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],

      // 함수는 표현식 형태 권장
      'func-style': ['warn', 'expression'],

      // 임포트 순서 정렬
      'import/order': [
        'error',
        {
          distinctGroup: true,
          'newlines-between': 'never',
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{react-*,react-*/**, react/*}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: './routes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{./store/**,../store/**,../../store/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{./context/**,../context/**,../../context/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**/*Provider, ./*Provider',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{./hooks/**,../hooks/**,../../hooks/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{./services/**,../services/**,../../services/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './**/*.css',
              group: 'sibling',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
