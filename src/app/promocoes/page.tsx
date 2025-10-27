"use client";

import Link from "next/link";

export default function PromocoesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-400 mb-4 inline-block">
            ← Voltar para Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">🎁 Promoções</h1>
          <p className="text-gray-300">Ofertas especiais e descontos exclusivos para você!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Oferta do Dia</h3>
            <p className="text-gray-300 mb-4">Desconto especial em produtos selecionados</p>
            <div className="text-orange-500 font-bold text-2xl">30% OFF</div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Kit Beleza</h3>
            <p className="text-gray-300 mb-4">Combo completo para seus cuidados</p>
            <div className="text-orange-500 font-bold text-2xl">R$ 89,90</div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Frete Grátis</h3>
            <p className="text-gray-300 mb-4">Em compras acima de R$ 150</p>
            <div className="text-green-500 font-bold text-2xl">GRÁTIS</div>
          </div>
        </div>

      </div>
    </main>
  );
}