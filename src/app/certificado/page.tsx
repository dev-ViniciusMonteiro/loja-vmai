"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trackCertificate } from "../utils/gtag";

export default function CertificadoPage() {
  const [nickname, setNickname] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const searchParams = useSearchParams();
  
  const title = searchParams.get("title") || "";
  const score = searchParams.get("score") || "0";
  const total = searchParams.get("total") || "10";

  const generateCertificate = () => {
    if (nickname.trim()) {
      setShowCertificate(true);
      trackCertificate('generate', title);
    }
  };

  const shareResult = () => {
    const text = `🎉 Acabei de conquistar o título "${title}" no Quiz VMAI! 💄\n\nAcertei ${score} de ${total} perguntas sobre beleza e cosméticos!\n\nFaça você também: ${window.location.origin}/jogos`;
    
    trackCertificate('share', title);
    
    if (navigator.share) {
      navigator.share({
        title: "Minha Conquista VMAI",
        text: text,
        url: window.location.origin + "/jogos"
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Texto copiado! Cole nas suas redes sociais 📱");
    }
  };

  if (!showCertificate) {
    return (
      <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-2xl mx-auto text-center">
          <Link href="/jogos" className="text-orange-600 hover:text-orange-700 mb-4 inline-block font-semibold">
            ← Voltar ao Quiz
          </Link>
          
          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold mb-4 text-orange-600">Crie seu Certificado</h1>
            <p className="text-gray-600 mb-8">Digite seu nickname para gerar seu certificado de conquista!</p>
          
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Digite seu nickname..."
              className="w-full p-4 text-center bg-white border-2 border-orange-200 rounded-lg text-gray-800 text-xl mb-6 outline-none focus:border-orange-500"
              maxLength={20}
            />
            
            <button
              onClick={generateCertificate}
              disabled={!nickname.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-semibold text-xl transition-colors shadow-lg"
            >
              Gerar Certificado
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-4xl mx-auto">
        <Link href="/jogos" className="text-orange-600 hover:text-orange-700 mb-4 inline-block font-semibold">
          ← Voltar ao Quiz
        </Link>
        
        <div className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-8 rounded-2xl border-4 border-gold text-center mb-8 shadow-2xl">
          <div className="bg-white/90 p-8 rounded-xl text-gray-800">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold mb-2 text-gold">CERTIFICADO DE CONQUISTA</h1>
            <div className="text-6xl mb-4">💄</div>
            
            <p className="text-xl mb-4">Certificamos que</p>
            <h2 className="text-4xl font-bold mb-6 text-gold">{nickname}</h2>
            
            <p className="text-lg mb-2">conquistou o título de</p>
            <h3 className="text-3xl font-bold mb-6 text-orange-600">{title}</h3>
            
            <p className="text-lg mb-6">
              no Quiz VMAI de Beleza<br/>
              com {score} acertos de {total} perguntas
            </p>
            
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
              <span>VMAI - Consultoria Digital de Beleza</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <button
            onClick={shareResult}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg"
          >
            📱 Compartilhar Conquista
          </button>
          
          <div>
            <button
              onClick={() => setShowCertificate(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Editar Nickname
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}