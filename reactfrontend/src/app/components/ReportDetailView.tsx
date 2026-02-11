import { Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, Filter, BarChart3, FileType, Star, Bookmark, Upload, RefreshCw } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { KREStyleReport } from './KREStyleReport';

interface ReportDetailViewProps {
  selectedTemplate: string;
  onOpenTemplateSelector: () => void;
  dateRange: string;
  selectedDepartment: string;
  onDateRangeChange: (range: string) => void;
  onDepartmentChange: (dept: string) => void;
  onSaveBookmark: () => void;
  isBookmarked: boolean;
  customData?: any[];
  onOpenDataManager?: () => void;
}

export function ReportDetailView({ 
  selectedTemplate, 
  onOpenTemplateSelector,
  dateRange,
  selectedDepartment,
  onDateRangeChange,
  onDepartmentChange,
  onSaveBookmark,
  isBookmarked,
  customData,
  onOpenDataManager
}: ReportDetailViewProps) {
  
  // KRE 스타일 보고서 사용
  return (
    <KREStyleReport
      selectedTemplate={selectedTemplate}
      dateRange={dateRange}
      selectedDepartment={selectedDepartment}
      onDateRangeChange={onDateRangeChange}
      onDepartmentChange={onDepartmentChange}
      onSaveBookmark={onSaveBookmark}
      isBookmarked={isBookmarked}
      onOpenDataManager={onOpenDataManager}
    />
  );
}