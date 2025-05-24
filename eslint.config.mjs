import js from '@eslint/js';

import prettier from 'eslint-plugin-prettier';
import tseslint, { parser } from 'typescript-eslint';
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
  {
    // 무시할 파일
    ignores: ['dist', 'node_modules', '.next', 'out'],

    // eslint 대상 파일
    files: ['**/*.{js,jsx,ts,tsx}'],

    // 언어 설정
    languageOptions: {
      parser: tseslint.parser,
      // ecma는 최신 버전
      ecmaVersion: 'latest',
      // 모듈(esm) 사용
      sourceType: 'module',
      // 전역 설정
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
      // parser 옵션
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },

    // 설정
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
        // 컴포넌트 파일명은 PascalCase
        components: '^[A-Z][a-zA-Z0-9]*$',
        // 일반 파일명은 camelCase
        utils: '^[a-z][a-zA-Z0-9]*$',
      },

      folders: {
        // 폴더명은 kebab-case
        pattern: '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      },
    },

    // 플러그인 이름 지정
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
    },

    // 규칙칙
    rules: {
      // js 권장 설정
      ...js.configs.recommended.rules,

      // reactHooks 권장 설정
      ...reactHooks.configs.recommended.rules,

      //next.js 권장 설정
      ...nextjs.configs.recommended.rules,
      ...nextjs.configs['core-web-vitals'].rules,

      // var 금지
      'no-var': 'error',

      // 상수는 SCREAMING_SNAKE_CASE

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

      // Prettier 랑 겹치는 포매팅
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

      // 콜백 선언은 화살표 함수: 언제나
      'prefer-arrow-callback': 'error',

      // ?
      'react/jsx-no-target-blank': 'off',

      // React Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 사용하지 않는 변수 금지
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      // JSX에서 변수 사용 시 오류 방지
      'react/jsx-uses-vars': 'error',

      // 일치 비교 연산자(===) 강제
      eqeqeq: ['error', 'always'],

      // 컴포넌트는 화살표 함수 또는 함수 표현식 사용, 함수 선언식 금지
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-expression', `arrow-function`],
          unnamedComponents: 'arrow-function',
        },
      ],

      // 함수는 화살표, 선언 금지
      'func-style': ['error', 'expression'],

      // 컨벤션: 임포트 순서 정렬
      'import/order': [
        'error',
        {
          // 그룹 구분 사용
          distinctGroup: true,
          // 임포트 그룹 사이 개행 없음
          'newlines-between': 'never',
          pathGroupsExcludedImportTypes: ['react'],
          // 정렬 순서
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          // 그룹 정의
          groups: [
            'builtin', // Node.js 내장 모듈
            'external', // npm 패키지
            'internal', // 프로젝트 내부 모듈
            'parent', // 상위 디렉토리
            'sibling', // 같은 디렉토리
            'index', // index 파일
            'object', // require 호출
            'type', // TypeScript type import
          ],
          pathGroups: [
            // external
            {
              // react
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              // react-*
              pattern: '{react-*,react-*/**, react/*}',
              group: 'external',
              position: 'before',
            },
            // internal
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
          // "consolidateIslands": 'inside-groups',
        },
      ],
    },
  },
];

export default eslintConfig;
