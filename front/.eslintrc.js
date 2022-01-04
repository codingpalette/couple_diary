module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 0,
    'no-extra-semi': 'error', // 확장자로 js와 jsx 둘다 허용하도록 수정
    'react/jsx-filename-extension': 0,
    'arrow-parens': ['warn', 'as-needed'], // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
    'no-unused-vars': ['off'], // 콘솔을 쓰면 에러가 나던 규칙 해제
    'no-console': ['off'], // export const 문을 쓸때 에러를 내는 규칙 해제
    'import/prefer-default-export': ['off'], // hooks의 의존성배열이 충분하지 않을때 강제로 의존성을 추가하는 규칙을 완화
    'react/jsx-props-no-spreading': 0,
    'eslint-disable-next-line': 0,
    'react-hooks/exhaustive-deps': 0,
  },
}
