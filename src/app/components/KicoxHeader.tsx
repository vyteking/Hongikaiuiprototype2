import { Search, User, Bell, Menu, ChevronDown, Home, FileText, Database, BarChart3, Settings, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface KicoxHeaderProps {
  onNavigate: (view: string, category?: string) => void;
  onOpenDataManager: () => void;
  onOpenBookmarks: () => void;
  currentView: string;
}

const mainMenuItems = [
  {
    id: 'home',
    label: 'AI 비서',
    icon: Home,
    view: 'chatbot',
    badge: '추천'
  },
  {
    id: 'accounting',
    label: '회계·재무',
    icon: FileText,
    submenu: [
      { label: '매입매출 현황', category: '회계 > 매입매출 현황', badge: '인기' },
      { label: '결산 보고서', category: '회계 > 결산 보고서', badge: '' },
      { label: '자금흐름 분석', category: '재무 > 자금흐름 분석', badge: '' },
      { label: 'ROI 보고서', category: '재무 > ROI 보고서', badge: '필수' },
    ]
  },
  {
    id: 'hr',
    label: '인사·노무',
    icon: User,
    submenu: [
      { label: '채용 현황', category: '인사 > 채용 현황', badge: '' },
      { label: '인력 운용', category: '인사 > 인력 운용', badge: '필수' },
      { label: '근태 관리', category: '노무 > 근태 관리', badge: '인기' },
      { label: '4대 보험', category: '노무 > 4대 보험', badge: '' },
    ]
  },
  {
    id: 'business',
    label: '영업·마케팅',
    icon: BarChart3,
    submenu: [
      { label: '매출 분석', category: '영업·마케팅 > 매출 분석', badge: '인기' },
      { label: '고객 분석', category: '영업·마케팅 > 고객 분석', badge: '' },
      { label: '캠페인 성과', category: '영업·마케팅 > 캠페인 성과', badge: '' },
      { label: '시장 조사', category: '영업·마케팅 > 시장 조사', badge: '' },
    ]
  },
  {
    id: 'production',
    label: '생산·품질',
    icon: Settings,
    submenu: [
      { label: '생산 실적', category: '생산·품질 > 생산 실적', badge: '필수' },
      { label: '품질 지표', category: '생산·품질 > 품질 지표', badge: '' },
      { label: '불량률 분석', category: '생산·품질 > 불량률 분석', badge: '인기' },
      { label: '공정 관리', category: '생산·품질 > 공정 관리', badge: '' },
    ]
  },
  {
    id: 'it',
    label: 'IT·보안',
    icon: Database,
    submenu: [
      { label: '보안 감사', category: 'IT·보안 > 보안 감사', badge: '필수' },
      { label: '시스템 장애', category: 'IT·보안 > 시스템 장애', badge: '' },
      { label: '데이터 백업', category: 'IT·보안 > 데이터 백업', badge: '' },
      { label: '접근 권한', category: 'IT·보안 > 접근 권한', badge: '' },
    ]
  },
];

export function KicoxHeader({ onNavigate, onOpenDataManager, onOpenBookmarks, currentView }: KicoxHeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuClick = (menuId: string, view?: string) => {
    if (view) {
      onNavigate(view);
      setActiveMenu(null);
    } else {
      setActiveMenu(activeMenu === menuId ? null : menuId);
    }
  };

  const handleSubmenuClick = (category: string) => {
    onNavigate('report', category);
    setActiveMenu(null);
  };

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case '인기': return 'bg-red-600 text-white';
      case '필수': return 'bg-orange-600 text-white';
      case '추천': return 'bg-green-600 text-white';
      default: return '';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-blue-800">
      {/* Top Bar - 상단바 */}
      <div className="bg-[#0F4C81] text-white border-b-2 border-[#083357]">
        <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm font-semibold">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>김홍익 이사님</span>
            </span>
            <div className="w-px h-4 bg-blue-400" />
            <button 
              onClick={onOpenBookmarks}
              className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors font-bold"
            >
              <BookOpen className="w-4 h-4" />
              <span>저장된 보고서</span>
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <button className="hover:text-yellow-300 transition-colors">로그인</button>
            <div className="w-px h-4 bg-blue-400" />
            <button className="hover:text-yellow-300 transition-colors">회원가입</button>
            <div className="w-px h-4 bg-blue-400" />
            <button className="relative p-1.5 hover:bg-blue-700 rounded transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - 메인 헤더 */}
      <div className="bg-white border-b-3 border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#0F4C81] rounded-xl flex items-center justify-center border-4 border-[#1E5A8E]">
                <span className="text-white font-black text-3xl">홍</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#0F4C81] tracking-tight">홍익AI 보고서생성기</h1>
                <p className="text-xs text-gray-600 font-bold">AI-Powered Business Intelligence Platform</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="보고서 검색 (예: 매출분석, 인사현황)"
                  className="w-full px-5 py-3.5 pr-12 border-3 border-gray-400 rounded-lg focus:border-[#0F4C81] focus:outline-none font-semibold text-gray-800 placeholder-gray-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0F4C81] hover:bg-[#1E5A8E] rounded-md transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Data Upload Button */}
            <button
              onClick={onOpenDataManager}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#E85D04] hover:bg-[#DC2F02] text-white rounded-lg font-black shadow-lg border-2 border-[#DC2F02] transition-all hover:scale-105"
            >
              <Database className="w-6 h-6" />
              <span className="text-base">데이터 관리</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - 네비게이션 메뉴 */}
      <nav className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-4 border-gray-400">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2">
            {mainMenuItems.map((item) => (
              <div key={item.id} className="relative group flex-1">
                <button
                  onClick={() => handleMenuClick(item.id, item.view)}
                  className={`relative flex items-center justify-center gap-2.5 px-5 py-4 text-gray-800 font-bold text-base w-full transition-all hover:bg-white hover:shadow-md ${
                    currentView === item.view ? 'bg-white shadow-md' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded ${getBadgeColor(item.badge)}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
                </button>

                {/* Dropdown Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subitem, index) => (
                      <button
                        key={index}
                        onClick={() => handleSubmenuClick(subitem.category)}
                        className="relative w-full text-left px-5 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition-all border-b border-gray-200 last:border-0"
                      >
                        <span className="flex items-center justify-between">
                          <span>{subitem.label}</span>
                          {subitem.badge && (
                            <span className={`px-2 py-0.5 text-xs font-bold rounded ${getBadgeColor(subitem.badge)}`}>
                              {subitem.badge}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}