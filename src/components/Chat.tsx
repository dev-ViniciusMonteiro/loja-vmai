"use client";
import { useState, useEffect } from "react";
import "../styles/home.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Função para obter saudação baseada na hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  // Gerar ID único da sessão
  const getSessionId = () => {
    let sessionId = localStorage.getItem('vmai-session-id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('vmai-session-id', sessionId);
    }
    return sessionId;
  };

  // Carregar mensagens do cache e inicializar chat
  useEffect(() => {
    const sessionId = getSessionId();
    const cachedMessages = localStorage.getItem(`vmai-chat-${sessionId}`);
    if (cachedMessages) {
      const parsed = JSON.parse(cachedMessages);
      setMessages(parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Mensagens iniciais do VMAI
      const initialMessages: Message[] = [
        {
          role: "assistant",
          content: `${getGreeting()}! 👋`,
          timestamp: new Date()
        },
        {
          role: "assistant",
          content: "Sou sua IA pessoal VMAI e irei ajudar a escolher o melhor produto Natura ou Avon.",
          timestamp: new Date(Date.now() + 1000)
        },
        {
          role: "assistant",
          content: "Pode me falar o que deseja comprar ou sua dúvida?",
          timestamp: new Date(Date.now() + 2000)
        }
      ];
      setMessages(initialMessages);
      localStorage.setItem(`vmai-chat-${sessionId}`, JSON.stringify(initialMessages));
    }
  }, []);

  // Salvar mensagens no cache e fazer scroll sempre que mudarem
  useEffect(() => {
    if (messages.length > 0) {
      const sessionId = getSessionId();
      localStorage.setItem(`vmai-chat-${sessionId}`, JSON.stringify(messages));
      
      // Scroll para a última mensagem
      setTimeout(() => {
        const messagesContainer = document.querySelector('.vmai-chat-messages');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message || loading) return;

    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      // Enviar últimas 10 mensagens para manter contexto
      const messageHistory = updatedMessages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageHistory }),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.result || "⚠️ Sem resposta da IA.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorMessage: Message = {
        role: "assistant",
        content: err instanceof Error ? `Erro: ${err.message}` : "Erro: Ocorreu um erro desconhecido.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="vmai-chat-container">
      <div className="vmai-chat-header">
        <h1>Fale com seu consultor online</h1>
      </div>
      
      <div className="vmai-chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`vmai-message ${message.role}`}>
            <div className="vmai-message-bubble">
              <div dangerouslySetInnerHTML={{ __html: message.content.replace(/https?:\/\/[^\s)]+/g, '<a href="$&" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$&</a>') }} />
            </div>
          </div>
        ))}
        {loading && (
          <div className="vmai-message assistant">
            <div className="vmai-message-bubble vmai-typing">
              <div className="vmai-typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="vmai-chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          disabled={false}
        />
        <button onClick={sendMessage} disabled={!userInput.trim()}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;