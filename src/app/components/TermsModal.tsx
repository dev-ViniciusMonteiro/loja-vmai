"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gtag } from "../utils/gtag";

export default function TermsModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('vmai-terms-accepted');
    if (!accepted) {
      setShowModal(true);
    } else {
      // Se já aceitou, ativa tracking
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem('vmai-terms-accepted', 'true');
    setShowModal(false);
    
    // Ativa tracking após aceitar
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted'
    });
    
    gtag('event', 'terms_accepted');
  };

  const rejectTerms = () => {
    gtag('event', 'terms_rejected');
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
        <div className="text-4xl mb-4">💄</div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Bem-vinda à VMAI!</h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Para oferecer a melhor experiência, coletamos dados de navegação e uso. 
          Ao continuar, você aceita nossos Termos de Uso e o uso de cookies para análise.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={acceptTerms}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors"
          >
            Aceitar e Continuar
          </button>
          
          <div className="flex gap-2 text-xs">
            <Link href="/termos" className="flex-1 text-orange-600 hover:text-orange-700 underline">
              Ver Termos Completos
            </Link>
            <button
              onClick={rejectTerms}
              className="flex-1 text-gray-500 hover:text-gray-700"
            >
              Recusar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}