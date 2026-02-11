import { Moon, Sun, ZoomIn, ZoomOut, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900 border-t border-gray-700 z-40 flex items-center justify-between px-6 text-sm text-gray-300">
      {/* Left: Current Time */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
      
      {/* Center: Service Info */}
      <div className="flex items-center gap-4 text-xs">
        <span>© 2026 홍익AI</span>
        <span className="text-red-400">보안등급: 2급</span>
        <span>Ver 1.0.2</span>
      </div>
      
      {/* Right: Display Options */}
      <div className="flex items-center gap-2">
        <button 
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          aria-label="축소"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          aria-label="확대"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-600 mx-1" />
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          aria-label="테마 전환"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </footer>
  );
}
