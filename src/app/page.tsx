"use client";

import Link from "next/link";
import "@/styles/home.css";
import { trackBrandClick, trackClick } from "./utils/gtag";

export default function HomePage() {
  return (
    <main className="home-container">
      <div className="home-content">
        <div className="home-hero">
          <h1 className="home-title">💄 Sua consultora digital de beleza</h1>
          <p className="home-subtitle">Fale com a VMAI e receba dicas, promoções e suporte 24h.</p>
          
          <Link href="/jogos" className="home-main-button" onClick={() => trackClick('quiz_button', '/jogos')}>
            🧠 Quiz
          </Link>
        </div>
        
        <div className="home-cards">
          <a href="https://www.minhaloja.natura.com/consultoria/vmai" target="_blank" rel="noopener noreferrer" className="home-card" onClick={() => trackBrandClick('natura')}>
            <img src="/natura.png" alt="Natura" className="home-card-image" />
            <h3>Natura</h3>
            <p>Produtos naturais e sustentáveis para sua beleza</p>
          </a>
          
          <a href="https://www.minhaloja.natura.com/consultoria/vmai?marca=avon" target="_blank" rel="noopener noreferrer" className="home-card" onClick={() => trackBrandClick('avon')}>
            <img src="/avon.png" alt="Avon" className="home-card-image" />
            <h3>Avon</h3>
            <p>Cosméticos e fragrâncias que realçam sua beleza</p>
          </a>
        </div>
      </div>
      
      <Link href="/chat" className="chat-bubble" onClick={() => trackClick('chat_bubble', '/chat')}>
        💬
      </Link>
    </main>
  );
}