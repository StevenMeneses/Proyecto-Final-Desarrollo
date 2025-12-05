// ========================== VARIABLES GLOBALES ==========================
let isFormValid = false;
let cartManager;

// ========================== GESTOR DE CARRITO ==========================
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("barbershop_cart") || "{}");
    this.floatingCart = document.getElementById("floating-cart");
    this.cartCount = document.getElementById("cart-count");
    this.cartItemsContainer = document.getElementById("cart-items-container");
    this.subtotalElement = document.getElementById("subtotal");
    this.totalElement = document.getElementById("total");
    this.checkoutBtn = document.getElementById("checkout-btn");

    this.init();
  }

  init() {
    this.renderCart();
    this.updateFloatingCart();
    this.bindEvents();
  }

  bindEvents() {
    this.floatingCart.addEventListener("click", () => {
      window.location.reload();
    });
  }

  renderCart() {
    const cartItems = Object.values(this.cart);

    if (cartItems.length === 0) {
      this.showEmptyCart();
      return;
    }

    this.cartItemsContainer.innerHTML = cartItems
      .map(
        (item) => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price">S/ ${item.price.toFixed(2)}</div>
              <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" onclick="cartManager.updateQuantity('${item.id}', -1)">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn increase-btn" onclick="cartManager.updateQuantity('${item.id}', 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <button class="remove-btn" onclick="cartManager.removeItem('${item.id}')">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        `
      )
      .join("");

    this.updateSummary();
  }

  showEmptyCart() {
    this.cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega algunos productos increíbles para comenzar</p>
        <a href="../PRODUCTOS/productos.html" class="continue-shopping-btn">
          Continuar Comprando
        </a>
      </div>
    `;

    this.subtotalElement.textContent = "S/ 0.00";
    this.totalElement.textContent = "S/ 0.00";
    this.checkoutBtn.disabled = true;
  }

  updateQuantity(itemId, change) {
    if (this.cart[itemId]) {
      this.cart[itemId].quantity += change;

      if (this.cart[itemId].quantity <= 0) {
        delete this.cart[itemId];
      }

      this.saveCart();
      this.renderCart();
      this.updateFloatingCart();
    }
  }

  removeItem(itemId) {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      delete this.cart[itemId];
      this.saveCart();
      this.renderCart();
      this.updateFloatingCart();
    }
  }

  updateSummary() {
    const subtotal = Object.values(this.cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    this.subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
    this.totalElement.textContent = `S/ ${subtotal.toFixed(2)}`;

    updateCheckoutButton();
  }

  updateFloatingCart() {
    const totalItems = Object.values(this.cart).reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (totalItems > 0) {
      this.floatingCart.classList.remove("hidden");
      this.cartCount.textContent = totalItems;
    } else {
      this.floatingCart.classList.add("hidden");
    }
  }

  saveCart() {
    localStorage.setItem("barbershop_cart", JSON.stringify(this.cart));
  }
}

// ========================== VALIDACIONES ==========================
function validateCardNumber(number) {
  const cleaned = number.replace(/\s/g, "");
  return cleaned.length === 16 && /^\d+$/.test(cleaned);
}

function validateExpiry(expiry) {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiry)) return false;

  const [month, year] = expiry.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const cardYear = parseInt(year);
  const cardMonth = parseInt(month);

  if (cardYear < currentYear) return false;
  if (cardYear === currentYear && cardMonth < currentMonth) return false;

  return true;
}

function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

function updateFieldValidation(fieldId, isValid) {
  const field = document.getElementById(fieldId);
  field.classList.remove("error", "valid");
  if (field.value.trim() !== "") {
    field.classList.add(isValid ? "valid" : "error");
  }
}

function validateForm() {
  const cardNumber = document.getElementById("card-number").value;
  const cardExpiry = document.getElementById("card-expiry").value;
  const cardCVV = document.getElementById("card-cvv").value;
  const cardName = document.getElementById("card-name").value;

  const isNumberValid = validateCardNumber(cardNumber);
  const isExpiryValid = validateExpiry(cardExpiry);
  const isCVVValid = validateCVV(cardCVV);
  const isNameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(cardName.trim());

  updateFieldValidation("card-number", isNumberValid);
  updateFieldValidation("card-expiry", isExpiryValid);
  updateFieldValidation("card-cvv", isCVVValid);
  updateFieldValidation("card-name", isNameValid);

  isFormValid = isNumberValid && isExpiryValid && isCVVValid && isNameValid;
  updateCheckoutButton();
}

// ========================== MÉTODOS DE PAGO ==========================
function selectPaymentMethod(element, type) {
  document.querySelectorAll(".payment-method").forEach((m) => m.classList.remove("selected"));
  element.classList.add("selected");
  element.querySelector('input[type="radio"]').checked = true;

  const cardForm = document.getElementById("card-form");
  const qrSection = document.getElementById("qr-section");
  const selectedValue = element.querySelector('input[type="radio"]').value;

  if (type === "card") {
    cardForm.classList.remove("hidden");
    qrSection.classList.add("hidden");
    hideAllQRCodes();
    validateForm();
  } else if (type === "digital") {
    cardForm.classList.add("hidden");
    qrSection.classList.remove("hidden");
    showQRCode(selectedValue);
    isFormValid = true;
    updateCheckoutButton();
  }
}

function showQRCode(method) {
  hideAllQRCodes();
  const qr = document.getElementById(`${method}-qr`);
  if (qr) qr.classList.remove("hidden");
}

function hideAllQRCodes() {
  document.querySelectorAll(".qr-code").forEach((qr) => qr.classList.add("hidden"));
}

// ========================== BOTÓN DE CHECKOUT ==========================
function updateCheckoutButton() {
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartHasItems = cartManager && Object.keys(cartManager.cart).length > 0;

  if (cartHasItems && isFormValid) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
  } else {
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.6";
  }
}

// ========================== PROCESAR PAGO ==========================
function processPayment() {
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("Debes iniciar sesión para completar el pago", "error");
    return;
  }

  const selectedMethod = document.querySelector('input[name="payment"]:checked');

  if (selectedMethod && isFormValid) {
    const loadingBtn = document.getElementById("checkout-btn");
    loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    loadingBtn.disabled = true;

    const detallesPedidoDTOS = Object.values(cartManager.cart).map((item) => ({
      nombreProducto: item.name,
      cantidad: item.quantity,
    }));

    fetch("https://marcus-barber.azurewebsites.net/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ detallesPedidoDTOS }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al procesar el pedido");
        return res.json();
      })
      .then(() => {
        showToast("¡Pago realizado con éxito!");

        // Limpieza total
        localStorage.clear();
        cartManager.cart = {};
        cartManager.renderCart();
        cartManager.updateFloatingCart();

        ["card-number", "card-expiry", "card-cvv", "card-name"].forEach((id) => {
          const el = document.getElementById(id);
          el.value = "";
          el.classList.remove("valid", "error");
        });

        isFormValid = false;
        updateCheckoutButton();
        loadingBtn.innerHTML = '<i class="fas fa-lock"></i> Proceder al Pago';
      })
      .catch(() => {
        showToast("Error al procesar el pago", "error");
        loadingBtn.innerHTML = '<i class="fas fa-lock"></i> Proceder al Pago';
        loadingBtn.disabled = false;
      });
  } else {
    showToast("Completa correctamente los campos o selecciona un método", "error");
  }
}

// ========================== INICIALIZACIÓN ==========================
document.addEventListener("DOMContentLoaded", function () {
  cartManager = new CartManager();
  isFormValid = false;
  updateCheckoutButton();

  const cardNumberInput = document.getElementById("card-number");
  const cardExpiryInput = document.getElementById("card-expiry");
  const cardCVVInput = document.getElementById("card-cvv");
  const cardNameInput = document.getElementById("card-name");

  // ---- Número de tarjeta ----
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value.replace(/(.{4})/g, "$1 ").trim();

    const visa = document.querySelector(".fa-cc-visa");
    const mc = document.querySelector(".fa-cc-mastercard");
    const amex = document.querySelector(".fa-cc-amex");
    [visa, mc, amex].forEach((i) => i.classList.remove("active"));

    if (value.startsWith("4")) visa.classList.add("active");
    else if (value.startsWith("5") || value.startsWith("2")) mc.classList.add("active");
    else if (value.startsWith("3")) amex.classList.add("active");

    validateForm();
  });

  // ---- Fecha ----
  cardExpiryInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 4);
    if (value.length > 2) value = value.substring(0, 2) + "/" + value.substring(2);
    e.target.value = value;
    validateForm();
  });

  // ---- CVV ----
  cardCVVInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    validateForm();
  });

  // ---- Nombre ----
  cardNameInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    validateForm();
  });
});

// ========================== TOAST ==========================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const messageElement = document.getElementById("toast-message");

  toast.className = `toast ${type}`;
  messageElement.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
