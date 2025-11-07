// Premium Bag Store - Enhanced JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Payment method cards interaction
  const paymentCards = document.querySelectorAll(".payment-card");
  paymentCards.forEach((card) => {
    card.addEventListener("click", function () {
      const paymentMethod = this.querySelector("p").textContent;
      // Add a visual feedback
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1.05)";
      }, 150);

      // Show payment method selected feedback
      console.log("Selected payment method:", paymentMethod);

      // You could redirect to checkout or show payment form
      // window.location.href = "pages/products.html?payment=" + encodeURIComponent(paymentMethod);
    });
  });

  // Add animation to feature boxes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature boxes and product cards
  document
    .querySelectorAll(
      ".feature-box, .product-category-card, .support-card, .support-cta"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Shopping cart functionality
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartDisplay();

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const item = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: parseFloat(this.dataset.price),
      };

      addToCart(item);

      // Visual feedback
      this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
      this.classList.add("btn-success");
      this.classList.remove("btn-primary", "btn-warning");

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Add to Cart';
        this.classList.remove("btn-success");
        if (this.classList.contains("text-warning")) {
          this.classList.add("btn-warning");
        } else {
          this.classList.add("btn-primary");
        }
      }, 2000);
    });
  });

  function addToCart(item) {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      item.quantity = 1;
      cartItems.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartDisplay();

    // Show notification
    showNotification(`${item.name} added to cart!`, "success");
  }

  function updateCartDisplay() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      const totalItems = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      cartCount.textContent = totalItems;
    }
  }

  function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Cart toggle functionality
  const cartToggle = document.getElementById("cart-toggle");
  if (cartToggle) {
    cartToggle.addEventListener("click", function (e) {
      e.preventDefault();
      // You can implement a cart sidebar or modal here
      showCartModal();
    });
  }

  function showCartModal() {
    // Simple cart display for now
    if (cartItems.length === 0) {
      showNotification("Your cart is empty!", "warning");
      return;
    }

    let cartContent = "Cart Items:\n";
    let total = 0;

    cartItems.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1);
      cartContent += `${item.name} x${
        item.quantity || 1
      } - €${itemTotal.toFixed(2)}\n`;
      total += itemTotal;
    });

    cartContent += `\nTotal: €${total.toFixed(2)}`;
    alert(cartContent);
  }

  // Newsletter signup functionality
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      showNotification(`Thank you for subscribing with ${email}!`, "success");
      this.reset();
    });
  }

  // Search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        const title = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const description = card
          .querySelector(".card-text")
          .textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Add loading states to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("btn-loading")) return;

      const originalText = this.innerHTML;
      this.classList.add("btn-loading");
      this.innerHTML = '<span class="loading"></span> Loading...';

      // Simulate loading for demo purposes
      setTimeout(() => {
        this.classList.remove("btn-loading");
        this.innerHTML = originalText;
      }, 1000);
    });
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Initialize tooltips if Bootstrap is available
  if (window.bootstrap) {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  console.log("EU Bag Store - Website loaded successfully! 🇪🇺");
});
