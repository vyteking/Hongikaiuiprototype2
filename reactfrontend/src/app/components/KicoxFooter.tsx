import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';

export function KicoxFooter() {
  return (
    <footer className="bg-[#2C3E50] text-gray-300 border-t-4 border-[#0F4C81]">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-black text-xl mb-5 border-b-3 border-[#0F4C81] pb-3">홍익AI</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-semibold">
              기업의 스마트한 의사결정을 지원하는
              AI 기반 빅데이터 보고서 플랫폼
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-[#0F4C81] hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-blue-500">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#E85D04] hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-red-500">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-pink-500">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-base mb-5 border-b-3 border-[#0F4C81] pb-3">주요 서비스</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full"></span>
                AI 보고서 생성
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full"></span>
                빅데이터 분석
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full"></span>
                실시간 대시보드
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full"></span>
                예측 인사이트
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full"></span>
                맞춤형 템플릿
              </a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-black text-base mb-5 border-b-3 border-[#0F4C81] pb-3">고객지원</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full"></span>
                공지사항
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full"></span>
                자주 묻는 질문
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full"></span>
                1:1 문의
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full"></span>
                사용자 가이드
              </a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E85D04] rounded-full"></span>
                API 문서
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-base mb-5 border-b-3 border-[#0F4C81] pb-3">문의하기</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-start gap-3 bg-[#34495E] p-3 rounded-lg border-2 border-[#0F4C81]">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#0F4C81]" />
                <div>
                  <div className="text-gray-400 text-xs">대표전화</div>
                  <div className="text-white font-black text-base">1588-1234</div>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#34495E] p-3 rounded-lg border-2 border-[#0F4C81]">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#0F4C81]" />
                <div>
                  <div className="text-gray-400 text-xs">이��일</div>
                  <div className="text-white font-bold text-sm">contact@hongikai.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#34495E] p-3 rounded-lg border-2 border-[#0F4C81]">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#0F4C81]" />
                <div>
                  <div className="text-gray-400 text-xs">주소</div>
                  <div className="text-white font-bold text-sm">서울시 강남구 테헤란로 123</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1A252F] border-t-3 border-[#0F4C81]">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 font-semibold text-gray-400">
              <span>© 2026 Hongik AI. All rights reserved.</span>
              <div className="w-px h-4 bg-gray-600" />
              <a href="#" className="hover:text-yellow-300 transition-colors">개인정보처리방침</a>
              <div className="w-px h-4 bg-gray-600" />
              <a href="#" className="hover:text-yellow-300 transition-colors">이용약관</a>
              <div className="w-px h-4 bg-gray-600" />
              <a href="#" className="hover:text-yellow-300 transition-colors">위치기반서비스 이용약관</a>
            </div>
            <div className="flex items-center gap-5">
              <span className="px-3 py-1.5 bg-yellow-600 text-white font-black text-xs rounded border-2 border-yellow-700">보안등급: 2급</span>
              <span className="text-gray-400 font-bold">Ver 1.0.2</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}