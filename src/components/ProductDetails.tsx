"use client";

import Link from "next/link";
import { formatPrice, type Product } from "@/data/catalog";
import { useCart } from "@/components/CartContext";

export function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-detail">
      <div className="product-detail-image-wrap">
        <img src={product.image} alt={product.name} className="product-detail-image" />
      </div>

      <div className="product-detail-info">
        <span className="eyebrow">{product.badge ?? "Produto"}</span>
        <h1>{product.name}</h1>
        <div className="product-price-row">
          <strong>{formatPrice(product.price)}</strong>
          <span>Disponível para pedido</span>
        </div>

        <p className="product-description">{product.description}</p>

        <ul className="feature-list">
          {(product.features ?? []).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="detail-actions">
          <button
            className="primary-button buy-button"
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
          <Link href="/carrinho" className="secondary-button">
            Ir para o pedido
          </Link>
        </div>
      </div>
    </div>
  );
}
