import { TrendingUp, TrendingDown, AlertCircle, Download, Star, Bookmark, RefreshCw, Calendar, Filter, BarChart3 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface KREStyleReportProps {
  selectedTemplate: string;
  dateRange: string;
  selectedDepartment: string;
  onDateRangeChange: (range: string) => void;
  onDepartmentChange: (dept: string) => void;
  onSaveBookmark: () => void;
  isBookmarked: boolean;
  onOpenDataManager?: () => void;
}

export function KREStyleReport({
  selectedTemplate,
  dateRange,
  selectedDepartment,
  onDateRangeChange,
  onDepartmentChange,
  onSaveBookmark,
  isBookmarked,
  onOpenDataManager
}: KREStyleReportProps) {
  
  // 실시간 주요 지표 데이터
  const mainIndicators = [
    { 
      label: '총 매출액', 
      value: '5,923', 
      unit: '백만원',
      change: 7.3,
      prev: '5,520'
    },
    { 
      label: '영업이익', 
      value: '2,458', 
      unit: '백만원',
      change: 14.3,
      prev: '2,150'
    },
    { 
      label: '순이익률', 
      value: '41.5', 
      unit: '%',
      change: 2.8,
      prev: '38.7'
    },
    { 
      label: '직원 수', 
      value: '342', 
      unit: '명',
      change: 5.2,
      prev: '325'
    },
  ];

  // 부서별 성과 테이블 데이터
  const departmentData = [
    { 
      dept: '영업부', 
      target: 12000, 
      actual: 13200, 
      achievement: 110,
      trend: 'up',
      variance: 1200
    },
    { 
      dept: '연구개발부', 
      target: 8500, 
      actual: 8947, 
      achievement: 105,
      trend: 'up',
      variance: 447
    },
    { 
      dept: '마케팅부', 
      target: 4500, 
      actual: 5100, 
      achievement: 113,
      trend: 'up',
      variance: 600
    },
    { 
      dept: '생산부', 
      target: 15000, 
      actual: 14200, 
      achievement: 95,
      trend: 'down',
      variance: -800
    },
    { 
      dept: '인사부', 
      target: 2500, 
      actual: 2700, 
      achievement: 108,
      trend: 'up',
      variance: 200
    },
  ];

  // 월별 추이 데이터
  const monthlyData = [
    { month: '9월', revenue: 4200, target: 4000, cost: 2800 },
    { month: '10월', revenue: 4580, target: 4200, cost: 2950 },
    { month: '11월', revenue: 5120, target: 4500, cost: 3200 },
    { month: '12월', revenue: 5450, target: 4800, cost: 3400 },
    { month: '1월', revenue: 5680, target: 5000, cost: 3550 },
    { month: '2월', revenue: 5923, target: 5200, cost: 3680 },
  ];

  const handleRefresh = () => {
    toast.success('데이터가 갱신되었습니다');
  };

  const handleDownload = () => {
    toast.success('보고서를 다운로드합니다');
  };

  return (
    <div className="space-y-6">
      {/* 상단 HOT NOTICE 배너 */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6 rounded-lg border-l-8 border-red-600 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="px-3 py-1 bg-red-600 text-white font-black text-xs rounded">HOT NOTICE</span>
          <div className="flex-1">
            <h2 className="text-2xl font-black mb-2">2026년산 정부 비축미 공매 시작</h2>
            <p className="text-sm text-gray-300 font-semibold">
              연중 1차 비축미가 6차 개찰 | 총 40만 톤 규모 | 시장과 업종 영향
            </p>
          </div>
          <button className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded font-bold transition-colors flex items-center gap-2">
            공고 확인 보기 →
          </button>
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <div className="bg-white border-3 border-gray-300 rounded-lg p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded font-semibold text-gray-800 focus:border-[#0F4C81] focus:outline-none"
              >
                <option value="1month">최근 1개월</option>
                <option value="3months">최근 3개월</option>
                <option value="6months">최근 6개월</option>
                <option value="1year">최근 1년</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-gray-300" />
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded font-semibold text-gray-800 focus:border-[#0F4C81] focus:outline-none"
              >
                <option value="전체">전체 부서</option>
                <option value="영업부">영업부</option>
                <option value="연구개발부">연구개발부</option>
                <option value="마케팅부">마케팅부</option>
                <option value="생산부">생산부</option>
                <option value="인사부">인사부</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-bold transition-colors flex items-center gap-2 border-2 border-gray-300"
            >
              <RefreshCw className="w-4 h-4" />
              갱신
            </button>
            <button
              onClick={onSaveBookmark}
              className={`px-4 py-2 rounded font-bold transition-colors flex items-center gap-2 border-2 ${
                isBookmarked 
                  ? 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600' 
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {isBookmarked ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
              {isBookmarked ? '저장됨' : '저장'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#0F4C81] hover:bg-[#1E5A8E] text-white rounded font-bold transition-colors flex items-center gap-2 border-2 border-[#1E5A8E]"
            >
              <Download className="w-4 h-4" />
              다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {mainIndicators.map((indicator, index) => (
          <div key={index} className="bg-white border-3 border-gray-300 rounded-lg p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-600 font-bold">{indicator.label}</span>
              {indicator.change > 0 ? (
                <TrendingUp className="w-5 h-5 text-red-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="mb-2">
              <span className="text-3xl font-black text-gray-900">{indicator.value}</span>
              <span className="text-sm text-gray-600 font-semibold ml-1">{indicator.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold flex items-center gap-1 ${
                indicator.change > 0 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {indicator.change > 0 ? '▲' : '▼'}
                {Math.abs(indicator.change)}%
              </span>
              <span className="text-xs text-gray-500">전월 대비</span>
            </div>
          </div>
        ))}
      </div>

      {/* KRE 스타일 데이터 테이블 */}
      <div className="bg-white border-3 border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b-3 border-gray-300">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0F4C81]" />
            부서별 KPI 달성 현황
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-6 py-4 text-left text-sm font-black text-gray-900">부서</th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-900">목표(백만원)</th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-900">실적(백만원)</th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-900">달성률</th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-900">등락</th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-900">차이</th>
              </tr>
            </thead>
            <tbody>
              {departmentData
                .filter(d => selectedDepartment === '전체' || d.dept === selectedDepartment)
                .map((row, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.dept}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">
                    {row.target.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">
                    {row.actual.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    <span className={`${
                      row.achievement >= 100 ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {row.achievement}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    {row.trend === 'up' ? (
                      <span className="text-red-600 flex items-center justify-end gap-1">
                        <span>▲</span>
                        <span>{((row.achievement - 100) / 100 * row.target / 100).toFixed(0)}</span>
                      </span>
                    ) : (
                      <span className="text-blue-600 flex items-center justify-end gap-1">
                        <span>▼</span>
                        <span>{((100 - row.achievement) / 100 * row.target / 100).toFixed(0)}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    <span className={row.variance > 0 ? 'text-red-600' : 'text-blue-600'}>
                      {row.variance > 0 ? '+' : ''}{row.variance.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 월별 추이 차트 */}
        <div className="bg-white border-3 border-gray-300 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0F4C81]" />
            월별 매출 추이
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  border: '2px solid #0F4C81', 
                  borderRadius: '8px',
                  fontWeight: 600 
                }} 
              />
              <Legend wrapperStyle={{ fontWeight: 700 }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke="#DC2626" 
                fill="#FCA5A5" 
                name="매출액"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stackId="2"
                stroke="#0F4C81" 
                fill="#93C5FD" 
                name="목표"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 매출 vs 비용 비교 차트 */}
        <div className="bg-white border-3 border-gray-300 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0F4C81]" />
            매출 vs 비용 비교
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  border: '2px solid #0F4C81', 
                  borderRadius: '8px',
                  fontWeight: 600 
                }} 
              />
              <Legend wrapperStyle={{ fontWeight: 700 }} />
              <Bar dataKey="revenue" fill="#DC2626" name="매출" />
              <Bar dataKey="cost" fill="#2563EB" name="비용" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
