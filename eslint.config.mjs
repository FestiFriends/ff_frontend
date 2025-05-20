import js from "@eslint/js";

import prettier from 'eslint-plugin-prettier';
import tseslint, { parser } from 'typescript-eslint'
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import filenamesPlugin from 'eslint-plugin-filenames';
import foldersPlugin from 'eslint-plugin-folders';
import stylisticJs from '@stylistic/eslint-plugin-js';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const eslintConfig = [
  {
    ignores: ['dist', 'node_modules', '.next', 'out'],
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        React: 'readonly', 
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
        typescript: { }
      },
      'filenames': {
        // 컴포넌트 파일명은 PascalCase
        'components': '^[A-Z][a-zA-Z0-9]*$',
        // 일반 파일명은 camelCase
        'utils': '^[a-z][a-zA-Z0-9]*$',
      },
      'folders': {
        // 폴더명은 kebab-case
        'pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettier,
      'react': react,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      'filenames': filenamesPlugin,
      'folders': foldersPlugin,
      '@stylistic/js': stylisticJs,
    },

      rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // var 금지
      'no-var': 'error',

      // 상수는 SCREAMING_SNAKE_CASE
      
      // prettier 

      // 문자열 작은 따옴표 => prettier
      'quotes': ['error', 'single'],

      // 인덴트: space 2개 => prettier
      'indent': ['error', 2],

      // 세미콜론:  무조건 사용 => prettier
      'semi': ['error', 'always'],
      
      // for...in 비권장, for...of 권장
      'no-restricted-syntax': [
        'error',
        {
          'selector': 'ForInStatement',
          'message': 'for...in is not recommended. Use for...of or high-level iteration methods instead.'
        }
      ],

      // 객체 생성자 사용 금지
      'no-new-object': 'error',

      // 유효하지 않은 객체 키는 따옴표 사용
      'quote-props': ['error', 'as-needed'],

      // new Array() 생성자 사용 금지
      'no-array-constructor': 'error',
      

      // 인라인 함수 지양
      'react/jsx-no-bind': ['error', {
        'allowArrowFunctions': true,
        'allowFunctions': false,
        'allowBind': false
      }],

      // 함수 뒤에 공백
      'space-before-function-paren': ['error', 'always'],
      // 예약어 뒤에 공백 명시
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      // 쉼표 뒤에 공백
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      // 연산자 뒤에 공백
      'space-infix-ops': 'error', 

      // 배열 요소 개행 일관성 유지
      "array-bracket-newline": ["error", "consistent"],
      "array-element-newline": ["error", "consistent"],
      
      // React 17+ JSX Transform 사용
      'react/react-in-jsx-scope': 'off',
      
      // Prettier 포맷팅 
      'prettier/prettier': ['error',{
        "experimentalOperatorPosition": "start",
      }],
      
      // 화살표 함수: 중괄호 생략 가능
      'arrow-body-style': ["error", "as-needed"],
      
      // 콜백 선언은 화살표 함수: 언제나
      'prefer-arrow-callback': 'error',
      
      // ?
      'react/jsx-no-target-blank': 'off',
      
      // React Fast Refresh
      'react-refresh/only-export-components': ['warn',
        { allowConstantExport: true }],
      
      // 사용하지 않는 변수 금지
      'no-unused-vars': 'error',
      // JSX에서 변수 사용 시 오류 방지
      "react/jsx-uses-vars": "error",

      // 일치 비교 연산자(===) 강제
      'eqeqeq': ['error', 'always'],
      
      // 컴포넌트는 화살표 함수 또는 함수 표현식 사용, 함수 선언식 금지
      'react/function-component-definition': ['error', { 
        namedComponents: ['function-expression', `arrow-function`], 
        unnamedComponents: 'arrow-function', 
      }],
      
      // 함수는 화살표, 선언 금지
      'func-style': ['error', 'expression'],
      
      // 연산자 줄바꿈은 연산자 앞에 (= 제외)
      'operator-linebreak': ['error', 'before', {'overrides' : {'=': 'after',}}],
      
      // 객객체 중괄호 개행 일관성, 속성이 여러줄일 경우 줄마다 하나씩 바꿈, 객수는 제한이 어려움
      'object-curly-newline': ['error', {
        'ObjectExpression': { 'multiline': true, 'consistent': true },
        'ObjectPattern': { 'multiline': true, 'consistent': true },
        'ImportDeclaration': { 'multiline': true, 'consistent': true },
        'ExportDeclaration': { 'multiline': true, 'consistent': true }
      }],
      

      
      // 컨벤션: 임포트 순서 정렬
      'import/order': ['error',{
        // 그룹 구분 사용
        "distinctGroup": true,
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
          'builtin',   // Node.js 내장 모듈
          'external',  // npm 패키지
          'internal',  // 프로젝트 내부 모듈
          'parent',    // 상위 디렉토리
          'sibling',   // 같은 디렉토리
          'index',     // index 파일
          'object',    // require 호출
          'type',      // TypeScript type import
        ],
        pathGroups: [
          // external
          { // react
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          { // react-* 
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
      }]
    },
  }, 
];

export default eslintConfig;