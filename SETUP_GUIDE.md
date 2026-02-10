# 홍익AI 보고서생성기 - 로컬 설치 가이드

## 📦 빠른 설치 (Windows)

### 1. Node.js 설치
- https://nodejs.org/ 에서 LTS 버전 다운로드 및 설치

### 2. 프로젝트 폴더 생성
```cmd
mkdir hongik-ai-report
cd hongik-ai-report
```

### 3. 필수 파일 생성

#### package.json
파일 생성 후 아래 내용 붙여넣기:
```json
{
  "name": "hongik-ai-report",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.487.0",
    "recharts": "^2.15.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.12",
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.1.12",
    "vite": "^6.3.5",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "typescript": "^5.6.3"
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### index.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>홍익AI 보고서생성기</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### 4. 폴더 구조 생성
```cmd
mkdir src
mkdir src\app
mkdir src\app\components
mkdir src\styles
```

### 5. 핵심 파일 생성

#### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### src/styles/index.css
```css
@import './tailwind.css';
@import './fonts.css';
@import './theme.css';
```

#### src/styles/tailwind.css
```css
@import 'tailwindcss';
```

#### src/styles/fonts.css
```css
/* 폰트 import는 여기에 추가 */
```

#### src/styles/theme.css
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}
```

### 6. 컴포넌트 파일들 생성

이제 `src/app/components/` 폴더에 다음 파일들을 생성하세요:
- Header.tsx
- Footer.tsx
- LeftSidebar.tsx
- RightSidebar.tsx
- ChatbotView.tsx
- ReportDetailView.tsx
- ReportTemplateSelector.tsx
- BookmarkManager.tsx
- CategoryDetailView.tsx

각 파일의 내용은 제가 작성한 코드를 복사해서 붙여넣으시면 됩니다.

### 7. 패키지 설치 및 실행
```cmd
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속!

---

## 🚨 문제 해결

### 포트가 이미 사용 중
- Vite가 자동으로 다른 포트 (5174, 5175 등)를 사용합니다

### 타입 에러 발생
```cmd
npm install --save-dev @types/react @types/react-dom typescript
```

### node_modules 폴더 삭제 후 재설치
```cmd
rmdir /s /q node_modules
npm install
```
