// EU Bag Store - Enhanced Shopping Cart Functionality
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("euBagStoreCart")) || [];
    this.currency = "€";
    this.shippingThreshold = 50; // Free shipping over €50
    this.taxRate = 0.2; // 20% VAT for EU
    this.init();
  }

  init() {
    this.updateCartDisplay();
    this.bindEvents();
  }

  bindEvents() {
    // Add to cart buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("add-to-cart") ||
        e.target.closest(".add-to-cart")
      ) {
        const button = e.target.classList.contains("add-to-cart")
          ? e.target
          : e.target.closest(".add-to-cart");
        this.addItem({
          id: button.dataset.id,
          name: button.dataset.name,
          price: parseFloat(button.dataset.price),
          image: button.dataset.image || null,
        });
      }
    });

    // Cart toggle
    const cartToggle = document.getElementById("cart-toggle");
    if (cartToggle) {
      cartToggle.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleCartModal();
      });
    }
  }

  addItem(item) {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      this.items.push(item);
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${item.name} added to cart!`, "success");
    this.animateCartIcon();
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.saveCart();
    this.updateCartDisplay();
    this.showNotification("Item removed from cart", "info");
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find((item) => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  getSubtotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getShipping() {
    return this.getSubtotal() >= this.shippingThreshold ? 0 : 9.99;
  }

  getTax() {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal() {
    return this.getSubtotal() + this.getShipping() + this.getTax();
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem("euBagStoreCart", JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
    this.showNotification("Cart cleared!", "info");
  }

  updateCartDisplay() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = this.getTotalItems();

      // Add animation class if items > 0
      if (this.getTotalItems() > 0) {
        cartCount.parentElement.classList.add("has-items");
      } else {
        cartCount.parentElement.classList.remove("has-items");
      }
    }
  }

  animateCartIcon() {
    const cartIcon = document.querySelector("#cart-toggle i");
    if (cartIcon) {
      cartIcon.classList.add("fa-bounce");
      setTimeout(() => {
        cartIcon.classList.remove("fa-bounce");
      }, 1000);
    }
  }

  toggleCartModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById("cartModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create cart modal
    const modal = this.createCartModal();
    document.body.appendChild(modal);

    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Remove modal from DOM when hidden
    modal.addEventListener("hidden.bs.modal", () => {
      modal.remove();
    });
  }

  createCartModal() {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "cartModal";
    modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-shopping-cart me-2"></i>Shopping Cart
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${
                          this.items.length === 0
                            ? this.getEmptyCartHTML()
                            : this.getCartItemsHTML()
                        }
                    </div>
                    ${this.items.length > 0 ? this.getCartFooterHTML() : ""}
                </div>
            </div>
        `;

    // Bind events for modal
    this.bindModalEvents(modal);

    return modal;
  }

  getEmptyCartHTML() {
    return `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p class="text-muted">Start shopping to add items to your cart</p>
                <a href="pages/products.html" class="btn btn-primary">
                    <i class="fas fa-shopping-bag me-2"></i>Continue Shopping
                </a>
            </div>
        `;
  }

  getCartItemsHTML() {
    let html = '<div class="cart-items">';

    this.items.forEach((item) => {
      html += `
                <div class="cart-item row align-items-center py-3 border-bottom" data-item-id="${
                  item.id
                }">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center">
                            <div class="cart-item-image me-3">
                                <i class="fas fa-shopping-bag fa-2x text-primary"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">${item.name}</h6>
                                <small class="text-muted">${
                                  this.currency
                                }${item.price.toFixed(2)} each</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="quantity-controls d-flex align-items-center">
                            <button class="btn btn-outline-secondary btn-sm quantity-minus" data-item-id="${
                              item.id
                            }">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity mx-3 fw-bold">${
                              item.quantity
                            }</span>
                            <button class="btn btn-outline-secondary btn-sm quantity-plus" data-item-id="${
                              item.id
                            }">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <span class="item-total fw-bold">${this.currency}${(
        item.price * item.quantity
      ).toFixed(2)}</span>
                    </div>
                    <div class="col-md-1 text-center">
                        <button class="btn btn-outline-danger btn-sm remove-item" data-item-id="${
                          item.id
                        }">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
    });

    html += "</div>";

    // Add cart summary
    html += this.getCartSummaryHTML();

    return html;
  }

  getCartSummaryHTML() {
    const subtotal = this.getSubtotal();
    const shipping = this.getShipping();
    const tax = this.getTax();
    const total = this.getTotal();

    return `
            <div class="cart-summary mt-4 p-3 bg-light rounded">
                <div class="row">
                    <div class="col-md-6">
                        ${
                          shipping === 0
                            ? '<div class="alert alert-success mb-0"><i class="fas fa-check me-2"></i>Free shipping applied!</div>'
                            : `<div class="alert alert-info mb-0"><i class="fas fa-info-circle me-2"></i>Add ${
                                this.currency
                              }${(this.shippingThreshold - subtotal).toFixed(
                                2
                              )} for free shipping</div>`
                        }
                    </div>
                    <div class="col-md-6">
                        <div class="summary-lines">
                            <div class="d-flex justify-content-between">
                                <span>Subtotal:</span>
                                <span>${this.currency}${subtotal.toFixed(
      2
    )}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Shipping:</span>
                                <span>${
                                  shipping === 0
                                    ? "Free"
                                    : this.currency + shipping.toFixed(2)
                                }</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>VAT (20%):</span>
                                <span>${this.currency}${tax.toFixed(2)}</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold fs-5">
                                <span>Total:</span>
                                <span>${this.currency}${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  getCartFooterHTML() {
    return `
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" id="clearCart">
                    <i class="fas fa-trash me-2"></i>Clear Cart
                </button>
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
                    Continue Shopping
                </button>
                <button type="button" class="btn btn-success" id="checkout">
                    <i class="fas fa-credit-card me-2"></i>Checkout
                </button>
            </div>
        `;
  }

  bindModalEvents(modal) {
    // Quantity controls
    modal.addEventListener("click", (e) => {
      const itemId =
        e.target.dataset.itemId ||
        e.target.closest("[data-item-id]")?.dataset.itemId;

      if (
        e.target.classList.contains("quantity-plus") ||
        e.target.closest(".quantity-plus")
      ) {
        const item = this.items.find((item) => item.id === itemId);
        if (item) {
          this.updateQuantity(itemId, item.quantity + 1);
          this.refreshModalContent(modal);
        }
      }

      if (
        e.target.classList.contains("quantity-minus") ||
        e.target.closest(".quantity-minus")
      ) {
        const item = this.items.find((item) => item.id === itemId);
        if (item) {
          this.updateQuantity(itemId, item.quantity - 1);
          this.refreshModalContent(modal);
        }
      }

      if (
        e.target.classList.contains("remove-item") ||
        e.target.closest(".remove-item")
      ) {
        this.removeItem(itemId);
        this.refreshModalContent(modal);
      }

      if (e.target.id === "clearCart") {
        if (confirm("Are you sure you want to clear your cart?")) {
          this.clearCart();
          this.refreshModalContent(modal);
        }
      }

      if (e.target.id === "checkout") {
        this.checkout();
      }
    });
  }

  refreshModalContent(modal) {
    const modalBody = modal.querySelector(".modal-body");
    const modalFooter = modal.querySelector(".modal-footer");

    modalBody.innerHTML =
      this.items.length === 0
        ? this.getEmptyCartHTML()
        : this.getCartItemsHTML();

    if (this.items.length === 0 && modalFooter) {
      modalFooter.remove();
    } else if (this.items.length > 0 && !modalFooter) {
      const footerHTML = this.getCartFooterHTML();
      const modalContent = modal.querySelector(".modal-content");
      modalContent.insertAdjacentHTML("beforeend", footerHTML);
    }
  }

  checkout() {
    // Simulate checkout process
    this.showNotification("Redirecting to secure checkout...", "info");

    setTimeout(() => {
      alert(
        `Checkout Summary:\n\nItems: ${this.getTotalItems()}\nTotal: ${
          this.currency
        }${this.getTotal().toFixed(
          2
        )}\n\nThank you for shopping with EU Bag Store!\n\nNote: This is a demo. No payment will be processed.`
      );

      // Clear cart after checkout
      this.clearCart();

      // Close modal
      const modal = document.getElementById("cartModal");
      if (modal) {
        bootstrap.Modal.getInstance(modal).hide();
      }
    }, 1500);
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "warning"
                ? "exclamation-triangle"
                : "info-circle"
            } me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 4000);
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.cart = new ShoppingCart();
  console.log("EU Bag Store Cart initialized! 🛒");
});
