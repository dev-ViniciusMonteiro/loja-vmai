"use client";

import Link from "next/link";
import { formatPrice, type Product } from "@/data/catalog";
import { useCart } from "@/components/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link href={`/produto/${product.slug}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-info">
        <span className="product-badge">{product.badge ?? "Produto"}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <button
            type="button"
            className="small-button primary-button buy-button"
            onClick={() => addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
            })}
          >
            Comprar agora
          </button>
        </div>
      </div>
    </article>
  );
}
