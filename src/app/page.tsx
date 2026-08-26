import Link from "next/link";
import { catalog } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featuredProducts = catalog.products.filter((product) => product.featured);
  const categories = catalog.categories;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">V&M Plastic</span>
            <h1>Materiais plásticos para organizar, decorar e viver melhor.</h1>
            <p>
              Produtos práticos para cozinha, organização, prateleiras, suportes e itens
              promocionais com qualidade e atendimento personalizado.
            </p>
            <div className="hero-actions">
              <Link href="#categorias" className="primary-button">
                Ver categorias
              </Link>
              <Link href="/carrinho" className="secondary-button">
                Fazer pedido
              </Link>
            </div>
          </div>

          <div className="hero-highlight">
            <div className="mini-card">
              <strong>+1.200</strong>
              <span>itens vendidos</span>
            </div>
            <div className="mini-card">
              <strong>24h</strong>
              <span>atendimento</span>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" className="container section-spacing">
        <div className="section-heading">
          <span className="eyebrow">Categorias</span>
          <h2>Explore por necessidade</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link href={`/categoria/${category.slug}`} key={category.slug} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-spacing">
        <div className="section-heading">
          <span className="eyebrow">Destaques</span>
          <h2>Produtos em destaque</h2>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}