import { useState, useRef, useEffect } from 'react';
import { FilterState } from '../types';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface DataAgentProps {
  onFilterUpdate: (updates: Partial<FilterState>) => void;
}

export default function DataAgent({ onFilterUpdate }: DataAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '我是您的材料数据助手。您可以直接告诉我想要查找的材料，我会自动为您设置筛选条件。' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock Agent Logic: Parse natural language to filters
    setTimeout(() => {
      let responseText = '';
      const updates: Partial<FilterState> = {};

      if (userMsg.includes('桃') && userMsg.includes('抗旱')) {
        responseText = '已为您筛选“2024年度桃抗旱试验”相关的材料。';
        updates.experiments = ['2024年度桃抗旱试验'];
        updates.year = '2024';
        updates.globalSearch = '抗旱';
      } else if (userMsg.includes('产量') && userMsg.includes('高')) {
         responseText = '已为您筛选产量较高（>800kg）的材料，并按产量排序。';
         updates.traits = ['产量'];
         updates.phenotypeMin = '800';
      } else if (userMsg.includes('基因型') && userMsg.includes('完整')) {
        responseText = '已为您筛选具有完整VCF基因型数据的材料。';
        updates.hasGenotype = 'yes';
        updates.isVCFComplete = 'yes';
      } else {
        responseText = `明白，正在为您搜索"${userMsg}"相关的材料...`;
        updates.globalSearch = userMsg;
      }

      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);
      onFilterUpdate(updates);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2 text-teal-700 font-semibold">
          <i className="ri-robot-2-line text-lg"></i>
          <span>材料数据智能助手</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-2 border border-gray-200 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all">
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm max-h-24"
            rows={2}
            placeholder="试着说：筛选2024年产量大于800的桃材料..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">Enter 发送</span>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-lg transition-colors ${
                input.trim() && !isTyping
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
