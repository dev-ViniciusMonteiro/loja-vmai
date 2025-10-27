"use client";

import Link from "next/link";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-orange-600 hover:text-orange-700 mb-6 inline-block font-semibold">
          ← Voltar para Home
        </Link>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-orange-600">Termos de Uso - VMAI</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar o site VMAI, você concorda com estes Termos de Uso. Se não concordar, não utilize nossos serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Sobre o Serviço</h2>
              <p>A VMAI é uma consultora digital de beleza que oferece:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Chat com inteligência artificial para recomendações de produtos</li>
                <li>Quiz interativo sobre beleza e cosméticos</li>
                <li>Redirecionamento para lojas oficiais Natura e Avon</li>
                <li>Certificados digitais de conquistas no quiz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">3. Uso Permitido</h2>
              <p>Você pode usar nossos serviços para:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Obter informações sobre produtos de beleza</li>
                <li>Participar do quiz educativo</li>
                <li>Gerar e compartilhar certificados</li>
                <li>Acessar cupons de desconto oferecidos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Restrições</h2>
              <p>É proibido:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Usar o serviço para fins ilegais ou não autorizados</li>
                <li>Tentar hackear ou comprometer a segurança do site</li>
                <li>Enviar spam ou conteúdo malicioso através do chat</li>
                <li>Reproduzir ou distribuir nosso conteúdo sem autorização</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Dados e Privacidade</h2>
              <p>Coletamos apenas dados necessários para o funcionamento do serviço:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Mensagens do chat para melhorar as respostas da IA</li>
                <li>Dados de navegação para análise via Google Analytics</li>
                <li>Nicknames fornecidos voluntariamente para certificados</li>
                <li>Não vendemos ou compartilhamos dados pessoais com terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">6. Cupons e Descontos</h2>
              <p>Os cupons oferecidos:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>São válidos conforme condições das lojas parceiras</li>
                <li>Podem ter prazo de validade limitado</li>
                <li>Não garantimos a disponibilidade permanente</li>
                <li>Uso sujeito às políticas das lojas Natura e Avon</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">7. Isenção de Responsabilidade</h2>
              <p>A VMAI:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Não se responsabiliza por compras realizadas em sites terceiros</li>
                <li>Oferece informações educativas, não substituindo consulta profissional</li>
                <li>Pode apresentar indisponibilidade temporária do serviço</li>
                <li>Não garante a precisão absoluta das informações da IA</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">8. Modificações</h2>
              <p>Podemos atualizar estes termos a qualquer momento. Mudanças significativas serão comunicadas no site. O uso continuado após alterações constitui aceitação dos novos termos.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">9. Lei Aplicável</h2>
              <p>Estes termos são regidos pelas leis brasileiras. Disputas serão resolvidas no foro da comarca de residência do usuário, conforme o Código de Defesa do Consumidor.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">10. Contato</h2>
              <p>Para dúvidas sobre estes termos, entre em contato através do chat da VMAI em nosso site.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <div className="mt-4 space-x-4">
              <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                Aceitar e Continuar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}