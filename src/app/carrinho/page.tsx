"use client";

import { formatPrice } from "@/data/catalog";
import { useCart } from "@/components/CartContext";

const WHATSAPP_NUMBER = "5519974147081";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  const handleSubmit = () => {
    if (items.length === 0) {
      return;
    }

    const orderedItems = items
      .map((item) => `- ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join("\n");

    const message = [
      "Olá! Gostaria de fazer o seguinte pedido:",
      "",
      "Produtos:",
      orderedItems,
      "",
      `Total do pedido: ${formatPrice(subtotal)}`,
      "",
      "Por favor, me responda em até 24 horas para prosseguir com o pedido.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    clearCart();
  };

  if (items.length === 0) {
    return (
      <section className="container section-spacing cart-empty">
        <h1>Seu carrinho está vazio</h1>
        <p>Escolha os itens do catálogo e faça seu pedido no final.</p>
      </section>
    );
  }

  return (
    <section className="container section-spacing">
      <div className="cart-layout">
        <div className="cart-summary">
          <h1>Carrinho</h1>

          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)} cada</p>
                <div className="quantity-row">
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

          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>

        <div className="checkout-panel">
          <h2>Finalizar pedido</h2>
          <p className="checkout-note">
            Ao clicar abaixo, você será enviado para o WhatsApp com o pedido já montado.
          </p>

          <button type="button" className="primary-button full-width" onClick={handleSubmit}>
            Enviar pedido no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
