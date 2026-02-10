import { Send, Sparkles, Bot, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatbotViewProps {
  onGenerateReport: () => void;
}

export function ChatbotView({ onGenerateReport }: ChatbotViewProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요, 김홍익 이사님! 저는 홍익AI 보고서 생성 비서입니다. 어떤 보고서가 필요하신가요?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestedQuestions = [
    '전월 매출 요약',
    '채용 현황 브리핑',
    '재무 리스크 분석',
    '생산 실적 대시보드'
  ];
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        `"${userMessage}" 요청을 확인했습니다. 최근 6개월 데이터를 분석하여 보고서를 생성하고 있습니다.`,
        '데이터 수집이 완료되었습니다. 주요 인사이트를 추출 중입니다...',
        '보고서가 준비되었습니다! 상세 내용을 확인하시겠습니까?'
      ];
      
      let responseIndex = 0;
      
      const addResponse = () => {
        if (responseIndex < responses.length) {
          setMessages(prev => [...prev, {
            id: Date.now().toString() + responseIndex,
            type: 'ai',
            content: responses[responseIndex],
            timestamp: new Date()
          }]);
          responseIndex++;
          
          if (responseIndex < responses.length) {
            setTimeout(addResponse, 1500);
          } else {
            setIsTyping(false);
            setTimeout(() => onGenerateReport(), 1000);
          }
        }
      };
      
      addResponse();
    }, 1000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: input,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      simulateAIResponse(input);
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(question);
  };
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Chat Header */}
      <div className="bg-white border-b-4 border-[#0F4C81] p-6 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#0F4C81] rounded-xl flex items-center justify-center border-4 border-[#1E5A8E]">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0F4C81]">AI 비서</h2>
            <p className="text-sm text-gray-700 font-bold">24/7 지능형 보고서 생성 지원</p>
          </div>
          <div className="ml-auto">
            <span className="px-4 py-2 bg-green-600 text-white font-black text-sm rounded-full border-2 border-green-700">
              ● 상담 가능
            </span>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome Message - Only show when no user messages */}
          {messages.filter(m => m.type === 'user').length === 0 && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#0F4C81] rounded-2xl mb-6 shadow-2xl border-4 border-[#1E5A8E]">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-4xl font-black text-[#0F4C81] mb-3">
                김홍익 이사님, 환영합니다!
              </h2>
              <p className="text-xl text-gray-700 font-bold">
                무엇을 도와드릴까요?
              </p>
            </div>
          )}
          
          {/* Message History */}
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-1 px-2 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-blue-400">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-6 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {/* Suggested Questions - Only show when no user messages */}
          {messages.filter(m => m.type === 'user').length === 0 && (
            <div className="mb-6">
              <div className="bg-[#F8F9FA] border-3 border-[#0F4C81] rounded-lg p-5">
                <p className="text-base text-[#0F4C81] mb-4 font-black flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#0F4C81] text-white rounded-full flex items-center justify-center text-xs">💡</span>
                  자주 찾는 보고서
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-5 py-4 bg-white hover:bg-[#0F4C81] text-gray-800 hover:text-white rounded-lg border-3 border-gray-300 hover:border-[#0F4C81] transition-all font-bold text-left shadow-md hover:shadow-xl hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-[#0F4C81] text-white rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm">{question}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Input Form */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요 (예: 이번 달 매출 보고서)"
                disabled={isTyping}
                className="w-full px-6 py-5 pr-16 bg-white rounded-lg border-3 border-gray-400 focus:border-[#0F4C81] text-gray-900 placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base shadow-lg"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2.5 bg-[#0F4C81] hover:bg-[#1E5A8E] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-bold border-2 border-[#1E5A8E]"
                aria-label="전송"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}