// frontend/src/features/teacher/Dashboard/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { generateLessonPlan } from '../../../../services/openai/teacherAI';
import { InputText } from './InputText';
import './ChatInterface.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: uuidv4(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateLessonPlan(userMessage.text);
      let aiResponseText = '';

      if (typeof response === 'string') {
        aiResponseText = response;
      } else if (response && typeof response === 'object' && 'result' in response) {
        aiResponseText = response.result;
      } else {
        throw new Error('Invalid AI response format');
      }

      const aiMessage: Message = {
        id: uuidv4(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: uuidv4(),
        text: 'Sorry, an error occurred. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send on Enter (unless shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="chat-interface">
      {/* Scrollable messages area */}
      <Box className="messages-container">
        {messages.map((msg) => (
          <Box
            key={msg.id}
            className="message-bubble"
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor:
                msg.sender === 'user' ? 'var(--hcisd-accent)' : '#ffffff',
              color: msg.sender === 'user' ? 'var(--hcisd-primary)' : 'var(--text-dark)',
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 0.5,
                opacity: 0.7,
                textAlign: msg.sender === 'user' ? 'right' : 'left',
              }}
            >
              {msg.timestamp.toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area pinned to bottom of ChatInterface */}
      <Box className="chat-input-container">
        <InputText
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          disabled={loading}
          loading={loading}
        />
      </Box>
    </Box>
  );
};
