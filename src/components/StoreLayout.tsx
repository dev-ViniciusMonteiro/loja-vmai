"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/data/catalog";
import { useCart } from "@/components/CartContext";

export function StoreLayout({ children }: { children: React.ReactNode }) {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="store-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand-block" aria-label="V&M Plastic home">
            <span className="brand-mark">V&amp;M</span>
            <div>
              <strong>VM Plastic</strong>
              <small>Materiais plásticos</small>
            </div>
          </Link>

          <nav className="main-nav" aria-label="Navegação principal">
            <Link href="/">Início</Link>
            <Link href="/sobre">Nossa História</Link>
            <Link href="/carrinho">Pedido</Link>
          </nav>

          <button
            type="button"
            className="cart-pill"
            aria-label="Abrir carrinho de compras"
            onClick={() => setIsCartOpen(true)}
          >
            Carrinho <span>{itemCount}</span>
          </button>
        </div>
      </header>

      <main className="page-main">{children}</main>

      <div className={`cart-overlay ${isCartOpen ? "active" : ""}`} onClick={() => setIsCartOpen(false)} />

      <aside className={`mini-cart ${isCartOpen ? "active" : ""}`} aria-label="Carrinho de compras">
        <div className="mini-cart-header">
          <h3>Carrinho</h3>
          <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="mini-cart-empty">
            <p>Seu carrinho está vazio.</p>
            <Link href="/" onClick={() => setIsCartOpen(false)} className="primary-button mini-cart-link">
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="mini-cart-items">
              {items.map((item) => (
                <div key={item.id} className="mini-cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{formatPrice(item.price)}</p>
                    <div className="quantity-row compact">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button type="button" className="remove-button" onClick={() => removeFromCart(item.id)}>
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="mini-cart-footer">
              <div className="mini-cart-total">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <Link href="/carrinho" className="primary-button full-width" onClick={() => setIsCartOpen(false)}>
                Finalizar pedido
              </Link>
            </div>
          </>
        )}
      </aside>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <strong>V&amp;M Plastic</strong>
            <p>Materiais plásticos com qualidade, praticidade e atendimento humano.</p>
          </div>
          <div className="footer-links">
            <Link href="/sobre">Sobre</Link>
            <Link href="/carrinho">Pedido</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
