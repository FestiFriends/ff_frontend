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
  { ignores: ['dist', 'node_modules', '.next', 'out'] },

  js.configs.recommended, // JavaScript 기본 권장 설정
  ...tseslint.configs.recommended, // TypeScript 권장 설정들

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
      parserOptions: { ecmaFeatures: { jsx: true, tsx: true } },
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
      ...react.configs.recommended.rules, // React 기본 권장 규칙들
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 설정
      ...jsxA11y.configs.recommended.rules, // JSX A11y 권장 설정
      ...nextjs.configs.recommended.rules, // Next.js 권장 설정
      ...nextjs.configs['core-web-vitals'].rules,

      /************************ js ************************/
      'no-var': 'error', // var 금지
      'no-new-object': 'error', // 객체 생성자 사용 금지
      'quote-props': ['error', 'as-needed'], // 유효하지 않은 객체 키는 따옴표 사용
      'no-array-constructor': 'error', // new Array() 생성자 사용 금지
      'arrow-body-style': ['error', 'as-needed'], // 화살표 함수는 중괄호 생략 가능
      'prefer-arrow-callback': 'error', // 콜백 선언은 화살표 함수로만
      eqeqeq: ['error', 'always'], // 일치 비교 연산자(===) 강제
      'func-style': ['warn', 'expression'], // 함수는 표현식 형태 권장
      // for...in 비권장, for...of 권장
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for...in is not recommended. Use for...of or high-level iteration methods instead.',
        },
      ],

      /******************* react & jsx *******************/
      'react/prop-types': 'off', // react prop 검증 건너뛰기 => ts면 필요 없음
      'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform 사용
      'react/jsx-no-target-blank': 'off', // target blank 금지
      'react/jsx-uses-vars': 'error', // JSX에서 변수 사용 시 오류 방지
      // 인라인 함수 지양
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      // React Fast Refresh, 컴포넌트만 내보내기 허용
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 컴포넌트는 화살표 함수 또는 함수 표현식 사용
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-expression', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],

      /******************* typescript *******************/
      '@typescript-eslint/no-unused-vars': ['error'], // 사용하지 않는 변수 금지
      // 헝가리안 케이스 금지
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],

      /******************* prettier *******************/
      'prettier/prettier': [
        'error',
        {
          experimentalOperatorPosition: 'start',
          singleAttributePerLine: true,
          experimentalTernaries: false,
        },
      ],

      /******************* import/order *******************/
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
            { pattern: '@/**', group: 'internal', position: 'before' },
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
