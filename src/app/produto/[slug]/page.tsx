import Link from "next/link";
import { getProductBySlug } from "@/data/catalog";
import { ProductDetails } from "@/components/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="container section-spacing">
        <h1>Produto não encontrado</h1>
        <Link href="/" className="primary-button">
          Voltar para início
        </Link>
      </section>
    );
  }

  return (
    <section className="container section-spacing">
      <ProductDetails product={product} />
      <div className="page-back-link">
        <Link href={"/"} className="secondary-button small-button">
          Voltar ao catálogo
        </Link>
      </div>
    </section>
  );
}
