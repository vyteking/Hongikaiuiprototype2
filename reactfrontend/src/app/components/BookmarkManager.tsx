import { Star, Trash2, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  template: string;
  dateRange: string;
  department: string;
  createdAt: Date;
  isFavorite: boolean;
}

interface BookmarkManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadBookmark: (bookmark: Bookmark) => void;
}

export function BookmarkManager({ isOpen, onClose, onLoadBookmark }: BookmarkManagerProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      title: '2월 재무 종합 보고서',
      template: 'finance',
      dateRange: '6months',
      department: '전체',
      createdAt: new Date('2026-02-05T14:32:00'),
      isFavorite: true
    },
    {
      id: '2',
      title: '1월 영업부 실적 분석',
      template: 'general',
      dateRange: '1month',
      department: '영업부',
      createdAt: new Date('2026-02-03T10:15:00'),
      isFavorite: true
    },
    {
      id: '3',
      title: '4분기 제조 품질 보고서',
      template: 'manufacturing',
      dateRange: '3months',
      department: '생산팀',
      createdAt: new Date('2026-01-28T16:20:00'),
      isFavorite: false
    },
    {
      id: '4',
      title: 'IT 프로젝트 진행 현황',
      template: 'it-service',
      dateRange: '6months',
      department: 'IT팀',
      createdAt: new Date('2026-01-25T09:45:00'),
      isFavorite: false
    },
    {
      id: '5',
      title: '연간 인사 리포트',
      template: 'general',
      dateRange: '1year',
      department: '인사',
      createdAt: new Date('2026-01-20T13:10:00'),
      isFavorite: true
    }
  ]);
  
  const toggleFavorite = (id: string) => {
    setBookmarks(prev => 
      prev.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b)
    );
  };
  
  const deleteBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };
  
  const getTemplateLabel = (template: string) => {
    const labels: { [key: string]: string } = {
      'manufacturing': '제조업',
      'finance': '금융업',
      'it-service': 'IT·서비스',
      'retail': '유통업',
      'healthcare': '의료업',
      'education': '교육업',
      'logistics': '물류업',
      'general': '범용'
    };
    return labels[template] || '범용';
  };
  
  const getDateRangeLabel = (range: string) => {
    const labels: { [key: string]: string } = {
      '1month': '1개월',
      '3months': '3개월',
      '6months': '6개월',
      '1year': '1년'
    };
    return labels[range] || range;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const favorites = bookmarks.filter(b => b.isFavorite);
  const recent = bookmarks.filter(b => !b.isFavorite);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div>
              <h2 className="text-2xl font-bold text-white">저장된 보고서</h2>
              <p className="text-sm text-blue-100 mt-1">총 {bookmarks.length}개의 보고서</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors text-white"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  즐겨찾기
                </h3>
                <div className="space-y-3">
                  {favorites.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <button
                              onClick={() => onLoadBookmark(bookmark)}
                              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors text-left"
                            >
                              {bookmark.title}
                            </button>
                            <button
                              onClick={() => toggleFavorite(bookmark.id)}
                              className="p-1 hover:bg-yellow-200 rounded transition-colors"
                            >
                              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                              {getTemplateLabel(bookmark.template)}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {getDateRangeLabel(bookmark.dateRange)}
                            </span>
                            <span>{bookmark.department}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(bookmark.createdAt)}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteBookmark(bookmark.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recent Section */}
            {recent.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  최근 보고서
                </h3>
                <div className="space-y-3">
                  {recent.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="p-4 border-2 border-gray-200 bg-white rounded-xl hover:border-blue-300 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <button
                              onClick={() => onLoadBookmark(bookmark)}
                              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors text-left"
                            >
                              {bookmark.title}
                            </button>
                            <button
                              onClick={() => toggleFavorite(bookmark.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Star className="w-5 h-5 text-gray-400" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                              {getTemplateLabel(bookmark.template)}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {getDateRangeLabel(bookmark.dateRange)}
                            </span>
                            <span>{bookmark.department}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(bookmark.createdAt)}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteBookmark(bookmark.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {bookmarks.length === 0 && (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">저장된 보고서가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
