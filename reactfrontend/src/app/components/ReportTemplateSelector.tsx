import { X, Building2, Landmark, Laptop, ShoppingBag, Factory, Hospital, GraduationCap, Truck } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ReportTemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'manufacturing',
    name: '제조업 종합 보고서',
    industry: '제조업',
    description: '생산 실적, 품질 지표, 재고 관리 중심',
    icon: <Factory className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'finance',
    name: '금융업 리스크 분석',
    industry: '금융업',
    description: '신용 리스크, 유동성, 자산 포트폴리오 분석',
    icon: <Landmark className="w-8 h-8" />,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'it-service',
    name: 'IT·서비스 경영 대시보드',
    industry: 'IT·서비스',
    description: '프로젝트 현황, 인력 운용, 고객 만족도',
    icon: <Laptop className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'retail',
    name: '유통·리테일 매출 분석',
    industry: '유통업',
    description: '매장별 매출, 재고 회전율, 고객 분석',
    icon: <ShoppingBag className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'healthcare',
    name: '의료·헬스케어 운영 보고서',
    industry: '의료업',
    description: '환자 현황, 의료 품질, 수익성 분석',
    icon: <Hospital className="w-8 h-8" />,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'education',
    name: '교육 기관 성과 보고서',
    industry: '교육업',
    description: '학생 현황, 교육 성과, 재무 건전성',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'logistics',
    name: '물류·운송 효율 분석',
    industry: '물류업',
    description: '배송 성과, 차량 운용, 비용 최적화',
    icon: <Truck className="w-8 h-8" />,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'general',
    name: '일반 기업 종합 보고서',
    industry: '전 업종',
    description: '재무, 인사, 영업 등 범용 보고서',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-gray-600 to-gray-700'
  }
];

export function ReportTemplateSelector({ isOpen, onClose, onSelectTemplate }: ReportTemplateSelectorProps) {
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
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">보고서 템플릿 선택</h2>
              <p className="text-sm text-gray-600 mt-1">업종에 최적화된 보고서 포맷을 선택하세요</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          {/* Templates Grid */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template.id);
                    onClose();
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${template.color} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-xs text-blue-600 font-semibold mb-2">{template.industry}</p>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
