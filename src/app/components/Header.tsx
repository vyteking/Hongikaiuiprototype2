import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

export function Header({ onToggleLeftSidebar, onToggleRightSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 z-50 flex items-center justify-between px-6 shadow-lg">
      {/* Left: Hamburger Menu */}
      <button 
        onClick={onToggleLeftSidebar}
        className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
        aria-label="메뉴 토글"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
      
      {/* Center: Service Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">홍</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          홍익AI 보고서생성기
        </h1>
      </div>
      
      {/* Right: User Profile */}
      <button 
        onClick={onToggleRightSidebar}
        className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-lg transition-colors"
        aria-label="사용자 메뉴"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-blue-400">
          <User className="w-5 h-5 text-white" />
        </div>
      </button>
    </header>
  );
}
