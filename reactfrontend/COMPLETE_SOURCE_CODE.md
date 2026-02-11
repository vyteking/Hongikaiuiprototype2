# 🎯 홍익AI 보고서생성기 - 전체 소스코드

복사해서 사용하세요!

---

## 📁 프로젝트 구조
```
hongik-ai-report/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── postcss.config.mjs
└── src/
    ├── main.tsx
    ├── app/
    │   ├── App.tsx
    │   └── components/
    │       ├── Header.tsx
    │       ├── Footer.tsx
    │       ├── LeftSidebar.tsx
    │       ├── RightSidebar.tsx
    │       ├── ChatbotView.tsx
    │       ├── ReportDetailView.tsx
    │       ├── ReportTemplateSelector.tsx
    │       ├── BookmarkManager.tsx
    │       └── CategoryDetailView.tsx
    └── styles/
        ├── index.css
        ├── tailwind.css
        ├── fonts.css
        └── theme.css
```

---

## 설치 방법

1. 프로젝트 폴더 생성: `mkdir hongik-ai-report && cd hongik-ai-report`
2. 아래 파일들을 생성하고 내용 복사
3. `npm install` 실행
4. `npm run dev` 실행
5. 브라우저에서 http://localhost:5173 접속

---

**모든 컴포넌트 파일은 이미 생성되어 있습니다!**

Figma Make 환경에서는 `/src/app/` 폴더의 모든 파일을 직접 읽어서 확인하실 수 있습니다.

로컬에서 실행하려면:
1. 이 프로젝트를 Figma Make에서 "다운로드" 또는 "내보내기" 기능을 사용하세요
2. 또는 각 파일을 read 명령어로 확인 후 복사하세요

---

## 핵심 파일 내용 예시

### 1. package.json
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

### 2. tsconfig.json  
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
    "strict": true
  },
  "include": ["src"]
}
```

### 3. vite.config.ts
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

### 4. index.html
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

### 5. src/main.tsx
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

### 6. src/styles/index.css
```css
@import './tailwind.css';
@import './fonts.css';
@import './theme.css';
```

### 7. src/styles/tailwind.css
```css
@import 'tailwindcss';
```

### 8. src/styles/fonts.css
```css
/* Google Fonts 등 추가 폰트는 여기에 */
```

### 9. src/styles/theme.css
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 💡 중요 안내

**모든 컴포넌트 파일 (App.tsx, Header.tsx 등)은 이미 Figma Make 환경에 작성되어 있습니다.**

로컬로 가져오는 방법:
1. **Figma Make의 다운로드/내보내기 기능 사용** (권장)
2. 또는 제가 각 파일의 내용을 하나씩 보여드릴 수 있습니다

필요하신 파일이 있으면 말씀해주세요!
