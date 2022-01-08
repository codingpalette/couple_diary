import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  blockquote, body, button, code, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, pre, select, td, textarea, th, ul {margin:0;padding:0}
  fieldset, img {border:0}
  dl, li, menu, ol, ul {list-style:none}
  blockquote, q {quotes:none}
  blockquote:after, blockquote:before, q:after, q:before {content:"";content:none}
  button, input, select, textarea {vertical-align:middle;font-size:100%}
  button {border:0;background-color:transparent;cursor:pointer}
  table {border-collapse:collapse;border-spacing:0}
  body {-webkit-text-size-adjust:none}
  input:checked[type=checkbox] {background-color:#666;-webkit-appearance:checkbox}
  html input[type=button], input[type=email], input[type=password], input[type=reset], input[type=search], input[type=submit], input[type=tel], input[type=text] {-webkit-appearance:none;border-radius:0}
  input[type=search]::-webkit-search-cancel-button {-webkit-appearance:none}
  body {background:var(--baseBackground)}
  body, button, input, select, td, textarea, th {
    font-size:14px;
    line-height:1.5;
    font-family:Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, 맑은 고딕, sans-serif;
    font-weight:400;color:#333
  }
  a {color:#333}
  a, a:active, a:hover {text-decoration:none}
  address, caption, cite, code, dfn, em, var {font-style:normal;font-weight:400}
  html, body{
    width: 100%;
    height: 100%;
  }
`

export const colors = {
  White: '#fff',
  Black: '#000',

  Slate_50: '#f8fafc',
  Slate_100: '#f1f5f9',
  Slate_200: '#e2e8f0',
  Slate_300: '#cbd5e1',
  Slate_400: '#64748b',
  Slate_500: '#64748b',
  Slate_600: '#475569',
  Slate_700: '#334155',
  Slate_800: '#1e293b',
  Slate_900: '#0f172a',

  Gray_50: '#f9fafb',
  Gray_100: '#f3f4f6',
  Gray_200: '#e5e7eb',
  Gray_300: '#d1d5db',
  Gray_400: '#9ca3af',
  Gray_500: '#6b7280',
  Gray_600: '#4b5563',
  Gray_700: '#374151',
  Gray_800: '#1f2937',
  Gray_900: '#111827',

  Red_50: '#fef2f2',
  Red_100: '#fee2e2',
  Red_200: '#fecaca',
  Red_300: '#fca5a5',
  Red_400: '#f87171',
  Red_500: '#ef4444',
  Red_600: '#dc2626',
  Red_700: '#b91c1c',
  Red_800: '#991b1b',
  Red_900: '#7f1d1d',

  Yellow_50: '#fefce8',
  Yellow_100: '#fef9c3',
  Yellow_200: '#fef08a',
  Yellow_300: '#fde047',
  Yellow_400: '#facc15',
  Yellow_500: '#eab308',
  Yellow_600: '#ca8a04',
  Yellow_700: '#a16207',
  Yellow_800: '#854d0e',
  Yellow_900: '#713f12',

  Green_50: '#f0fdf4',
  Green_100: '#dcfce7',
  Green_200: '#bbf7d0',
  Green_300: '#86efac',
  Green_400: '#4ade80',
  Green_500: '#22c55e',
  Green_600: '#16a34a',
  Green_700: '#15803d',
  Green_800: '#166534',
  Green_900: '#14532d',

  Blue_50: '#eff6ff',
  Blue_100: '#dbeafe',
  Blue_200: '#bfdbfe',
  Blue_300: '#93c5fd',
  Blue_400: '#60a5fa',
  Blue_500: '#3b82f6',
  Blue_600: '#2563eb',
  Blue_700: '#1d4ed8',
  Blue_800: '#1e40af',
  Blue_900: '#1e3a8a',

  Purple_50: '#faf5ff',
  Purple_100: '#f3e8ff',
  Purple_200: '#e9d5ff',
  Purple_300: '#d8b4fe',
  Purple_400: '#c084fc',
  Purple_500: '#a855f7',
  Purple_600: '#9333ea',
  Purple_700: '#7e22ce',
  Purple_800: '#6b21a8',
  Purple_900: '#581c87',
}

export default GlobalStyle
