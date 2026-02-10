import { Bot, ChevronDown, ChevronRight, FileText, Bookmark, Database } from 'lucide-react';
import { useState } from 'react';

interface LeftSidebarProps {
  isOpen: boolean;
  onNavigate: (view: string, category?: string) => void;
  onOpenBookmarks: () => void;
  onOpenDataManager?: () => void;
}

const categories = [
  {
    name: '회계',
    subcategories: ['매입매출 현황', '결산 보고서', '세무 신고', '전표 관리']
  },
  {
    name: '재무',
    subcategories: ['자금흐름 분석', 'ROI 보고서', '투자 현황', '손익 분석']
  },
  {
    name: '인사',
    subcategories: ['채용 현황', '인력 운용', '급여 명세', '평가 관리']
  },
  {
    name: '노무',
    subcategories: ['근태 관리', '4대 보험', '퇴직금 산정', '노무 리스크']
  },
  {
    name: '법무',
    subcategories: ['계약 관리', '소송 현황', '준법 모니터링', '법률 자문']
  },
  {
    name: 'IT·보안',
    subcategories: ['보안 감사', '시스템 장애', '데이터 백업', '접근 권한']
  },
  {
    name: '영업·마케팅',
    subcategories: ['매출 분석', '고객 분석', '캠페인 성과', '시장 조사']
  },
  {
    name: '총무·자산',
    subcategories: ['자산 관리', '설비 유지', '구매 현황', '재고 관리']
  },
  {
    name: '기획·전략',
    subcategories: ['경영 지표', '전략 과제', 'KPI 대시보드', '경쟁사 분석']
  },
  {
    name: '생산·품질',
    subcategories: ['생산 실적', '품질 지표', '불량률 분석', '공정 관리']
  }
];

export function LeftSidebar({ isOpen, onNavigate, onOpenBookmarks, onOpenDataManager }: LeftSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => onNavigate('chatbot')}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 bottom-12 w-80 bg-gray-900 border-r border-gray-700 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* AI Chatbot Button */}
          <button 
            onClick={() => onNavigate('chatbot')}
            className="m-4 p-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg flex items-center gap-3 transition-all shadow-lg"
          >
            <Bot className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">AI 비서와 대화하기</span>
          </button>
          
          {/* Bookmarks Button */}
          <button 
            onClick={onOpenBookmarks}
            className="mx-4 mb-4 p-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 rounded-lg flex items-center gap-3 transition-all shadow-lg"
          >
            <Bookmark className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">저장된 보고서</span>
          </button>
          
          {/* Data Manager Button */}
          {onOpenDataManager && (
            <button 
              onClick={onOpenDataManager}
              className="mx-4 mb-4 p-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg flex items-center gap-3 transition-all shadow-lg"
            >
              <Database className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">데이터 관리</span>
            </button>
          )}
          
          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              보고서 라이브러리
            </h2>
            
            <nav className="space-y-1">
              {categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.name);
                
                return (
                  <div key={category.name}>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{category.name}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => onNavigate('report', `${category.name} > ${sub}`)}
                            className="w-full flex items-center gap-2 p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{sub}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}