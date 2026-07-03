import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, HeartPulse, RefreshCw, PlusCircle, Sparkles } from 'lucide-react';
import { queryHealthChatbot } from '../services/aiService';

export default function ChatBot({ activePatient, clinicSettings }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: clinicSettings.assistantGreeting || "Hello, I am Dr. Afreen Fathima's Assistant. Please share the patient's goal, health condition, food preference, and region so I can prepare a draft diet chart.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Quick suggestions for rapid user testing
  const suggestions = [
    "Suggest low-carb South Indian options",
    "Replace white rice with millet",
    "Explain High TSH levels in easy words",
    "Recipe for Protein Besan Chilla",
    "Foods to lower high cholesterol levels"
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const rawText = textToSend || inputVal;
    if (!rawText.trim()) return;

    // User message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: rawText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    // Dynamic Artificial consultation timing
    setTimeout(async () => {
      try {
        const fullHistory = [...messages, userMessage];
        const resText = await queryHealthChatbot(fullHistory, activePatient, clinicSettings);
        
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'assistant',
          text: resText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch (err) {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I experienced a network disruption connecting with the AI engine. Please verify your keys in Settings folder, or proceed with offline templates.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (sug) => {
    handleSendMessage(sug);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'assistant',
        text: clinicSettings.assistantGreeting || "Hello, I am Dr. Afreen Fathima's Assistant. Please share the patient's goal, health condition, food preference, and region so I can prepare a draft diet chart.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[650px] overflow-hidden no-print">
      {/* Bot Header Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 p-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center relative">
            <HeartPulse className="w-5 h-5 animate-pulse-subtle" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-bold tracking-wide">Dr. Afreen's Assistant</span>
              <span className="text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> AI Engine
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Active patient: {activePatient ? activePatient.name : "None (General Advice)"}
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear Logs
        </button>
      </div>

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm border ${
                isUser 
                  ? 'bg-slate-900 text-white rounded-br-none border-slate-800' 
                  : 'bg-white text-slate-850 rounded-bl-none border-slate-100'
              }`}>
                {/* Formatted markdown text parser */}
                <div className="text-xs leading-relaxed whitespace-pre-line space-y-2 select-text">
                  {msg.text.split("\n\n").map((para, pIdx) => {
                    // Check for lists or bold tags
                    return (
                      <p key={pIdx}>
                        {para.split("**").map((chunk, cIdx) => {
                          if (cIdx % 2 === 1) {
                            return <strong key={cIdx} className="font-extrabold text-teal-650">{chunk}</strong>;
                          }
                          return chunk;
                        })}
                      </p>
                    );
                  })}
                </div>
                <div className="text-[9px] mt-2 text-right opacity-60">
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {/* Dynamic Typing Wave */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-sm border border-slate-100 flex items-center gap-1.5 py-3">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 select-none">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(sug)}
              type="button"
              className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-205/70 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 px-3.5 py-1.5 rounded-full shrink-0 transition-colors cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Console */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex items-center gap-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={activePatient ? `Ask about swapping items in ${activePatient.name}'s food list...` : "Ask a general diet question..."}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-slate-50 font-medium"
        />
        <button
          onClick={() => handleSendMessage()}
          type="button"
          disabled={!inputVal.trim()}
          className={`p-3.5 rounded-xl text-white shadow-md transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer ${
            inputVal.trim()
              ? 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-600/10'
              : 'bg-slate-105 text-slate-400 cursor-not-allowed border border-slate-200 bg-slate-50'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
