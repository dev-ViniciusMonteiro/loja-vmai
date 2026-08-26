import Link from "next/link";
import { getCategoryBySlug, getProductsByCategory } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <section className="container section-spacing">
        <h1>Categoria não encontrada</h1>
        <Link href="/" className="primary-button">
          Voltar para início
        </Link>
      </section>
    );
  }

  const products = getProductsByCategory(slug);

  return (
    <section className="container section-spacing">
      <div className="category-header">
        <div>
          <span className="eyebrow">Categoria</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <img src={category.image} alt={category.name} />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
