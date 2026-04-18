import { useState } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

export const useGeminiChat = (currentZones) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm the StadiumPulse Oracle. I have real-time access to the venue's crowd data. How can I help you route crowds or identify bottlenecks today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    try {
      // Exclude the welcome message and format history for Gemini
      const historyToPass = messages.filter(m => m.id !== 'welcome');
      const responseText = await sendMessageToGemini(text, historyToPass, currentZones);
      
      const botMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setError(err.message || "Failed to communicate with the Oracle.");
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    error,
    sendMessage
  };
};
