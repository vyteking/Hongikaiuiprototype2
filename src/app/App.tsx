import { useState } from 'react';
import { Toaster } from 'sonner';
import { KicoxHeader } from './components/KicoxHeader';
import { KicoxFooter } from './components/KicoxFooter';
import { RightSidebar } from './components/RightSidebar';
import { ChatbotView } from './components/ChatbotView';
import { ReportDetailView } from './components/ReportDetailView';
import { ReportTemplateSelector } from './components/ReportTemplateSelector';
import { BookmarkManager, type Bookmark } from './components/BookmarkManager';
import { CategoryDetailView } from './components/CategoryDetailView';
import { DataUploadManager } from './components/DataUploadManager';

type ViewType = 'chatbot' | 'report' | 'category';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('chatbot');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isBookmarkManagerOpen, setIsBookmarkManagerOpen] = useState(false);
  const [isDataManagerOpen, setIsDataManagerOpen] = useState(false);
  const [customData, setCustomData] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('general');
  const [dateRange, setDateRange] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('전체');
  const [isCurrentReportBookmarked, setIsCurrentReportBookmarked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('회계');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  
  const handleNavigate = (view: string, category?: string) => {
    if (view === 'chatbot') {
      setCurrentView('chatbot');
      setIsRightSidebarOpen(false);
    } else if (view === 'report') {
      if (category) {
        // Category detail view
        const parts = category.split(' > ');
        if (parts.length === 2) {
          setSelectedCategory(parts[0]);
          setSelectedSubcategory(parts[1]);
          setCurrentView('category');
          setIsRightSidebarOpen(false);
        } else {
          setIsTemplateSelectorOpen(true);
          setIsRightSidebarOpen(false);
        }
      } else {
        setIsTemplateSelectorOpen(true);
        setIsRightSidebarOpen(false);
      }
    }
  };
  
  const handleGenerateReport = () => {
    setIsTemplateSelectorOpen(true);
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentView('report');
    setIsCurrentReportBookmarked(false);
  };
  
  const handleSaveBookmark = () => {
    setIsCurrentReportBookmarked(!isCurrentReportBookmarked);
    // TODO: 실제로는 여기서 북마크 데이터를 저장
  };
  
  const handleLoadBookmark = (bookmark: Bookmark) => {
    setSelectedTemplate(bookmark.template);
    setDateRange(bookmark.dateRange);
    setSelectedDepartment(bookmark.department);
    setCurrentView('report');
    setIsBookmarkManagerOpen(false);
    setIsCurrentReportBookmarked(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <KicoxHeader 
        onNavigate={handleNavigate}
        onOpenDataManager={() => setIsDataManagerOpen(true)}
        onOpenBookmarks={() => setIsBookmarkManagerOpen(true)}
        currentView={currentView}
      />
      
      {/* Right Sidebar */}
      <RightSidebar 
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
      />
      
      {/* Template Selector Modal */}
      <ReportTemplateSelector 
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      
      {/* Bookmark Manager Modal */}
      <BookmarkManager 
        isOpen={isBookmarkManagerOpen}
        onClose={() => setIsBookmarkManagerOpen(false)}
        onLoadBookmark={handleLoadBookmark}
      />
      
      {/* Data Upload Manager Modal */}
      <DataUploadManager 
        isOpen={isDataManagerOpen}
        onClose={() => setIsDataManagerOpen(false)}
        onUploadData={setCustomData}
      />
      
      {/* Main Content - 헤더 높이 조정 (3단 헤더) */}
      <main className="pt-[176px] pb-80 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {currentView === 'chatbot' ? (
            <ChatbotView onGenerateReport={handleGenerateReport} />
          ) : currentView === 'category' ? (
            <CategoryDetailView 
              category={selectedCategory}
              subcategory={selectedSubcategory}
            />
          ) : (
            <ReportDetailView 
              selectedTemplate={selectedTemplate}
              onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
              dateRange={dateRange}
              selectedDepartment={selectedDepartment}
              onDateRangeChange={setDateRange}
              onDepartmentChange={setSelectedDepartment}
              onSaveBookmark={handleSaveBookmark}
              isBookmarked={isCurrentReportBookmarked}
              customData={customData}
              onOpenDataManager={() => setIsDataManagerOpen(true)}
            />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <KicoxFooter />
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
    </div>
  );
}