import { Settings, Bell, LogOut, User, Building2, Briefcase } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed right-0 top-16 bottom-12 w-80 bg-gray-900 border-l border-gray-700 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* User Profile */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">김홍익</h3>
                <p className="text-sm text-gray-400">이사</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span>홍익AI 주식회사</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span>경영지원본부</span>
              </div>
            </div>
          </div>
          
          {/* User Options */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>내 설정</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span>알림 설정</span>
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-700">
              <button className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </button>
            </div>
          </nav>
          
          {/* Usage Stats */}
          <div className="mt-auto pt-6 border-t border-gray-700">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">
              이번 달 사용량
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>생성한 보고서</span>
                <span className="font-semibold text-blue-400">47개</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>AI 대화</span>
                <span className="font-semibold text-blue-400">132회</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
