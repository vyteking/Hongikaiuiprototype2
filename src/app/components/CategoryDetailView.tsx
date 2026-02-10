import { TrendingUp, AlertTriangle, CheckCircle, Brain, LineChart as LineChartIcon, Shield, DollarSign, Users, Gavel, Server, Target, Package, Lightbulb, Factory, Download, Calendar, RefreshCw } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface CategoryDetailViewProps {
  category: string;
  subcategory: string;
}

interface CategoryConfig {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  aiFeatures: string[];
  predictionTitle: string;
}

const categoryConfigs: { [key: string]: CategoryConfig } = {
  '회계': {
    icon: <DollarSign className="w-8 h-8" />,
    color: 'from-blue-600 to-blue-700',
    title: '회계 관리 시스템',
    description: '매입/매출 통합 자동 관리, 세무 리스크 탐지, 결산 시뮬레이션',
    aiFeatures: ['AI 세무 리스크 자동 탐지', '업계 평균 대비 비용 효율 분석', '결산 시나리오 시뮬레이션'],
    predictionTitle: '수지 시세 예측 & 업계 비교'
  },
  '재무': {
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-emerald-600 to-emerald-700',
    title: '재무 분석 플랫폼',
    description: '실시간 자금 흐름(Cash Flow), 투자 ROI 분석, 자금 조달 최적화',
    aiFeatures: ['실시간 유동성 모니터링', '투자 ROI 자동 분석', '미래 유동성 위기 예측'],
    predictionTitle: '재무 건전성 시각화 & 위기 예측'
  },
  '인사': {
    icon: <Users className="w-8 h-8" />,
    color: 'from-purple-600 to-purple-700',
    title: '인적자원 관리',
    description: '채용 AI 매칭, 인적 자원 역량 진단, 퇴사 확률 예측',
    aiFeatures: ['AI 기반 채용 매칭', '직원 역량 진단 대시보드', '퇴사 위험 조기 경보'],
    predictionTitle: '인건비 최적화 & 성과 분석'
  },
  '노무': {
    icon: <Shield className="w-8 h-8" />,
    color: 'from-orange-600 to-orange-700',
    title: '노무 컴플라이언스',
    description: '근태 자동 관리, 급여/4대보험 자동화, 중대재해법 준수 모니터링',
    aiFeatures: ['근태 자동 집계 & 이상 탐지', '급여 자동 계산', '법령 개정 알림 시스템'],
    predictionTitle: '노무 리스크 예측 & 대응 시나리오'
  },
  '법무': {
    icon: <Gavel className="w-8 h-8" />,
    color: 'from-red-600 to-red-700',
    title: '법무 리스크 관리',
    description: '계약서 AI 검토, 법령 위반 탐지, 지식재산권(IP) 관리',
    aiFeatures: ['계약서 AI 자동 검토', '법령 위반 실시간 탐지', 'IP 포트폴리오 관리'],
    predictionTitle: '판결 데이터 분석 & 승소 확률'
  },
  'IT·보안': {
    icon: <Server className="w-8 h-8" />,
    color: 'from-cyan-600 to-cyan-700',
    title: 'IT 인프라 & 보안',
    description: '클라우드 자원 최적화, 보안 위협 실시간 탐지, 시스템 로그 분석',
    aiFeatures: ['클라우드 비용 최적화', '보안 위협 AI 탐지', '로그 이상 패턴 분석'],
    predictionTitle: '서버 부하 예측 & 인프라 제안'
  },
  '영업·마케팅': {
    icon: <Target className="w-8 h-8" />,
    color: 'from-pink-600 to-pink-700',
    title: '영업 & 마케팅 인텔리전스',
    description: '잠재 고객 타겟팅, 마케팅 성과(ROAS) 분석, CRM 연동',
    aiFeatures: ['고객 세그먼트 AI 분석', 'ROAS 실시간 추적', '이탈 고객 예측'],
    predictionTitle: '시장 수요 예측 & 지역별 분석'
  },
  '총무·자산': {
    icon: <Package className="w-8 h-8" />,
    color: 'from-indigo-600 to-indigo-700',
    title: '자산 & 총무 관리',
    description: '소모품 재고 최적화, 고정 자산 감가상각, 오피스 환경 분석',
    aiFeatures: ['재고 자동 발주 추천', '감가상각 자동 계산', '에너지 사용량 최적화'],
    predictionTitle: '자산 교체 주기 예측 & 비용 분석'
  },
  '기획·전략': {
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'from-yellow-600 to-yellow-700',
    title: '전략 기획 & 분석',
    description: '경쟁사 동향 분석, OKR 성과 관리, 신사업 타당성 시뮬레이션',
    aiFeatures: ['경쟁사 데이터 자동 수집', 'OKR 진행률 실시간 추적', '신사업 시뮬레이션'],
    predictionTitle: '업계 트렌드 & 시장 점유율 예측'
  },
  '생산·품질': {
    icon: <Factory className="w-8 h-8" />,
    color: 'from-gray-600 to-gray-700',
    title: '생산 & 품질 관리',
    description: '공정 효율 분석, 불량 원인 추적, 공급망(SCM) 지능화',
    aiFeatures: ['불량 원인 AI 분석', '공정 병목 자동 탐지', 'SCM 수요 예측'],
    predictionTitle: '생산량 시세 예측 & 원자재 분석'
  }
};

export function CategoryDetailView({ category, subcategory }: CategoryDetailViewProps) {
  const config = categoryConfigs[category] || categoryConfigs['회계'];
  
  // 카테고리별 맞춤 데이터 생성
  const generateCategoryData = () => {
    const months = ['9월', '10월', '11월', '12월', '1월', '2월'];
    
    switch (category) {
      case '회계':
        return months.map((month, i) => ({
          month,
          actual: 4200 + i * 300 + Math.random() * 200,
          predicted: 4500 + i * 320,
          industry: 4000 + i * 250,
          risk: Math.max(10, 35 - i * 5)
        }));
      case '재무':
        return months.map((month, i) => ({
          month,
          cashflow: 2000 + i * 150 + Math.random() * 100,
          roi: 8 + i * 0.5 + Math.random() * 2,
          liquidity: 85 + Math.random() * 10,
          alert: i > 3 ? 'warning' : 'safe'
        }));
      case '인사':
        return months.map((month, i) => ({
          month,
          headcount: 150 + i * 5,
          turnover: 3 + Math.random() * 2,
          satisfaction: 75 + Math.random() * 15,
          costPerHead: 5000 + i * 100
        }));
      case '노무':
        return months.map((month, i) => ({
          month,
          attendance: 96 + Math.random() * 3,
          overtime: 20 + Math.random() * 10,
          compliance: 92 + Math.random() * 5,
          incidents: Math.floor(Math.random() * 3)
        }));
      case '법무':
        return months.map((month, i) => ({
          month,
          contracts: 25 + Math.floor(Math.random() * 10),
          risks: Math.floor(Math.random() * 5),
          winRate: 75 + Math.random() * 15,
          ipCount: 30 + i * 2
        }));
      case 'IT·보안':
        return months.map((month, i) => ({
          month,
          cpuUsage: 60 + Math.random() * 25,
          threats: Math.floor(Math.random() * 15),
          uptime: 99.5 + Math.random() * 0.4,
          cost: 1200 + i * 50
        }));
      case '영업·마케팅':
        return months.map((month, i) => ({
          month,
          leads: 500 + i * 50 + Math.random() * 100,
          conversion: 12 + Math.random() * 5,
          roas: 250 + i * 20 + Math.random() * 30,
          cac: 80 - i * 2
        }));
      case '총무·자산':
        return months.map((month, i) => ({
          month,
          assets: 5000 + i * 100,
          depreciation: 200 + i * 10,
          maintenance: 150 + Math.random() * 50,
          inventory: 85 + Math.random() * 10
        }));
      case '기획·전략':
        return months.map((month, i) => ({
          month,
          marketShare: 15 + i * 0.5 + Math.random() * 1,
          okrProgress: 60 + i * 6,
          competitors: 8 + Math.floor(Math.random() * 3),
          innovation: 70 + Math.random() * 20
        }));
      case '생산·품질':
        return months.map((month, i) => ({
          month,
          production: 8000 + i * 400 + Math.random() * 300,
          quality: 96 + Math.random() * 3,
          defectRate: Math.max(0.5, 2.5 - i * 0.3),
          efficiency: 85 + Math.random() * 10
        }));
      default:
        return months.map((month, i) => ({
          month,
          value1: 100 + i * 10,
          value2: 80 + i * 8
        }));
    }
  };
  
  const chartData = generateCategoryData();
  
  // KPI 데이터
  const getKPIs = () => {
    switch (category) {
      case '회계':
        return [
          { label: '세무 리스크', value: '저위험', change: '↓2건', color: 'green', icon: <CheckCircle /> },
          { label: '비용 효율', value: '108%', change: '+8%p', color: 'blue', icon: <TrendingUp /> },
          { label: '결산 정확도', value: '99.2%', change: '+0.5%', color: 'purple', icon: <CheckCircle /> },
          { label: 'AI 자동화율', value: '87%', change: '+12%', color: 'orange', icon: <Brain /> }
        ];
      case '재무':
        return [
          { label: '유동비율', value: '245%', change: '+15%', color: 'green', icon: <TrendingUp /> },
          { label: 'ROI', value: '18.5%', change: '+3.2%', color: 'blue', icon: <DollarSign /> },
          { label: '위기 확률', value: '2.3%', change: '↓1.2%', color: 'orange', icon: <AlertTriangle /> },
          { label: '자금 효율', value: '92점', change: '+5점', color: 'purple', icon: <CheckCircle /> }
        ];
      case '인사':
        return [
          { label: '채용 매칭률', value: '89%', change: '+12%', color: 'blue', icon: <Users /> },
          { label: '퇴사 예측', value: '3명', change: '↓2명', color: 'orange', icon: <AlertTriangle /> },
          { label: '만족도', value: '4.6/5', change: '+0.3', color: 'green', icon: <CheckCircle /> },
          { label: '인건비 효율', value: '95점', change: '+7점', color: 'purple', icon: <TrendingUp /> }
        ];
      case '노무':
        return [
          { label: '근태 정확도', value: '99.8%', change: '+0.3%', color: 'green', icon: <CheckCircle /> },
          { label: '법령 준수율', value: '100%', change: '유지', color: 'blue', icon: <Shield /> },
          { label: '리스크 건수', value: '0건', change: '↓3건', color: 'green', icon: <CheckCircle /> },
          { label: '자동화율', value: '94%', change: '+8%', color: 'purple', icon: <Brain /> }
        ];
      case '법무':
        return [
          { label: '계약 검토', value: '156건', change: '+24건', color: 'blue', icon: <Gavel /> },
          { label: '승소 확률', value: '82%', change: '+7%', color: 'green', icon: <TrendingUp /> },
          { label: 'IP 등록', value: '38건', change: '+5건', color: 'purple', icon: <CheckCircle /> },
          { label: '위반 탐지', value: '2건', change: '↓4건', color: 'orange', icon: <AlertTriangle /> }
        ];
      case 'IT·보안':
        return [
          { label: '가동률', value: '99.7%', change: '+0.2%', color: 'green', icon: <CheckCircle /> },
          { label: '위협 차단', value: '247건', change: '+32건', color: 'orange', icon: <Shield /> },
          { label: '비용 절감', value: '23%', change: '+8%', color: 'blue', icon: <DollarSign /> },
          { label: 'AI 탐지율', value: '96%', change: '+4%', color: 'purple', icon: <Brain /> }
        ];
      case '영업·마케팅':
        return [
          { label: 'ROAS', value: '387%', change: '+42%', color: 'green', icon: <TrendingUp /> },
          { label: '전환율', value: '15.2%', change: '+2.3%', color: 'blue', icon: <Target /> },
          { label: '신규 리드', value: '724명', change: '+156명', color: 'purple', icon: <Users /> },
          { label: 'CAC', value: '₩72K', change: '↓8K', color: 'orange', icon: <DollarSign /> }
        ];
      case '총무·자산':
        return [
          { label: '자산가치', value: '₩5.2B', change: '+8%', color: 'blue', icon: <Package /> },
          { label: '재고 효율', value: '92%', change: '+5%', color: 'green', icon: <CheckCircle /> },
          { label: '교체 예정', value: '7건', change: '3개월내', color: 'orange', icon: <AlertTriangle /> },
          { label: '비용 절감', value: '₩24M', change: '+12M', color: 'purple', icon: <DollarSign /> }
        ];
      case '기획·전략':
        return [
          { label: '시장점유율', value: '17.8%', change: '+2.3%', color: 'blue', icon: <TrendingUp /> },
          { label: 'OKR 진행률', value: '78%', change: '+12%', color: 'green', icon: <CheckCircle /> },
          { label: '신규 기회', value: '12건', change: '+5건', color: 'purple', icon: <Lightbulb /> },
          { label: '경쟁 우위', value: '85점', change: '+8점', color: 'orange', icon: <Target /> }
        ];
      case '생산·품질':
        return [
          { label: '생산량', value: '9,840개', change: '+8.2%', color: 'blue', icon: <Factory /> },
          { label: '품질지수', value: '97.8%', change: '+1.2%', color: 'green', icon: <CheckCircle /> },
          { label: '불량률', value: '0.8%', change: '↓0.4%', color: 'orange', icon: <AlertTriangle /> },
          { label: '공정효율', value: '91%', change: '+6%', color: 'purple', icon: <TrendingUp /> }
        ];
      default:
        return [];
    }
  };
  
  const kpis = getKPIs();
  
  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colors[color] || 'bg-gray-50 border-gray-200 text-gray-700';
  };
  
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${config.color} text-white p-8 shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                {config.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
                <p className="text-lg text-white/90 mb-3">{subcategory}</p>
                <p className="text-sm text-white/80">{config.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">새로고침</span>
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="text-sm">다운로드</span>
              </button>
            </div>
          </div>
          
          {/* AI Features Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {config.aiFeatures.map((feature, index) => (
              <span key={index} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div key={index} className={`p-5 rounded-xl border-2 shadow-lg ${getColorClass(kpi.color)}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="opacity-70">
                  {kpi.icon}
                </div>
                <span className="text-sm font-semibold opacity-80">{kpi.label}</span>
              </div>
              <p className="text-3xl font-bold mb-2">{kpi.value}</p>
              <p className="text-sm font-semibold">{kpi.change}</p>
            </div>
          ))}
        </div>
        
        {/* Main Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Primary Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-blue-600" />
                {config.predictionTitle}
              </h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI 예측
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {category === '회계' ? (
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="industry" fill="#e5e7eb" stroke="#9ca3af" name="업계평균" />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="실제" />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="AI 예측" />
                </ComposedChart>
              ) : category === '재무' ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cashflow" stroke="#10b981" fillOpacity={1} fill="url(#colorCashflow)" name="자금흐름" />
                  <Line type="monotone" dataKey="liquidity" stroke="#f59e0b" strokeWidth={2} name="유동성지수" />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={Object.keys(chartData[0])[1]} fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey={Object.keys(chartData[0])[2]} fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Secondary Chart - Risk/Performance Radar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">종합 성과 지표</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[
                { subject: '효율성', value: 85 + Math.random() * 10 },
                { subject: '정확도', value: 90 + Math.random() * 8 },
                { subject: '신속성', value: 78 + Math.random() * 12 },
                { subject: '비용절감', value: 82 + Math.random() * 10 },
                { subject: '위험관리', value: 88 + Math.random() * 8 }
              ]}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar name="현재" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">AI 인사이트 & 추천</h3>
              <p className="text-sm text-gray-600">빅데이터 분석 기반 실시간 통찰</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">긍정 요인</span>
              </div>
              <p className="text-sm text-gray-600">전월 대비 효율성 12% 향상, 예측 정확도 95% 달성</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">주의 필요</span>
              </div>
              <p className="text-sm text-gray-600">3개월 후 리스크 증가 예상, 선제적 대응 권장</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">AI 추천</span>
              </div>
              <p className="text-sm text-gray-600">자동화율 향상으로 연간 ₩240M 절감 가능</p>
            </div>
          </div>
        </div>
        
        {/* Detailed Data Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">상세 데이터 분석</h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>최근 6개월</option>
                <option>최근 1년</option>
                <option>전체 기간</option>
              </select>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                필터 적용
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">기간</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">실적</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">목표</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">달성률</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">등급</th>
                </tr>
              </thead>
              <tbody>
                {chartData.slice(0, 6).map((row, index) => {
                  const achievement = 95 + Math.random() * 15;
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{row.month}</td>
                      <td className="py-3 px-4 text-right text-gray-900 font-semibold">
                        {Object.values(row)[1].toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        {(Object.values(row)[1] as number * 0.95).toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-semibold ${
                          achievement >= 100 ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {achievement.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          achievement >= 100 
                            ? 'bg-green-100 text-green-700' 
                            : achievement >= 90
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {achievement >= 100 ? 'S' : achievement >= 90 ? 'A' : 'B'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
