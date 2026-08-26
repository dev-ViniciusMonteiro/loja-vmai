import Link from "next/link";

export default function SobrePage() {
  return (
    <section className="container section-spacing">
      <div className="story-hero">
        <span className="eyebrow">Nossa história</span>
        <h1>V&M Plastic nasceu do amor por modelagem, inovação e solução.</h1>
        <p>
          A empresa foi fundada por Vinicius Monteiro Orlandi, especialista em ecommerce,
          desenvolvedor de software e gestor de negócios digitais que já atuou em grandes
          players como Natura, Fugini e Yamaha.
        </p>
      </div>

      <div className="story-grid">
        <div className="story-card">
          <h2>Uma ideia com propósito</h2>
          <p>
            Nossa jornada começou com a paixão por criar soluções práticas e bem pensadas.
            A modelagem, a criatividade e a busca por produtos úteis estiveram no centro da
            nossa formação e, hoje, transformam a V&M Plastic em uma marca focada em
            qualidade, funcionalidade e atendimento real.
          </p>
        </div>

        <div className="story-card highlight-card">
          <h2>O que nos move</h2>
          <p>
            Entendemos que cada peça plástica precisa resolver um problema, organizar um
            espaço e facilitar a rotina da pessoa ou do negócio. Por isso, trabalhamos com
            uma abordagem prática, moderna e orientada ao cliente.
          </p>
        </div>
      </div>

      <div className="story-quote">
        <p>
          “Nasci de um amor por modelagem, por criar soluções que deixam a vida mais
          organizada e mais bonita.”
        </p>
        <strong>Vinicius Monteiro Orlandi</strong>
      </div>

      <div className="cta-row">
        <Link href="/" className="primary-button">
          Ver catálogo
        </Link>
        <Link href="/carrinho" className="secondary-button">
          Fazer pedido
        </Link>
      </div>
    </section>
  );
}
