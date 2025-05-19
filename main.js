document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const formData = { name, email, subject, message };
      try {
        const res = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          const errorText = await res.text();
          alert("Error: " + errorText);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("Failed to send message. Please try again.");
      }
    });
  }

  const signupForm = document.querySelector("#signup form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        if (res.ok) {
          alert("Account created successfully!");
          signupForm.reset();
          window.location.href = "login.html";
        } else {
          const errorText = await res.text();
          alert("Signup failed: " + errorText);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("An error occurred. Please try again.");
      }
    });
  }

  const loginForm = document.querySelector("#login form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        if (res.ok) {
          alert("Login successful!");
          loginForm.reset();
          window.location.href = "index.html"; 
        } else {
          const errorText = await res.text();
          alert("Login failed: " + errorText);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("An error occurred. Please try again.");
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".btn-primary");
  const cartItemsKey = "evoplay-cart-items";

  buyButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();

      const card = button.closest(".game-card");
      const title = card.querySelector("h2").textContent;

      let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || [];

      const existingItemIndex = cartItems.findIndex(item => item.title === title);
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity++;
      } else {
        cartItems.push({ title, quantity: 1 });
      }

      localStorage.setItem(cartItemsKey, JSON.stringify(cartItems));
      updateCartCount();
    });
  });

  function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || [];
    let totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    let countDisplay = document.querySelector("#cart-count");
    if (!countDisplay) {
      countDisplay = document.createElement("div");
      countDisplay.id = "cart-count";
      countDisplay.style.cssText = "position: fixed; top: 10px; right: 10px; background: red; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;";
      document.body.appendChild(countDisplay);
    }
    countDisplay.textContent = `Cart Items: ${totalCount}`;
  }

  updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsKey = "evoplay-cart-items";
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-msg");

  let cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || [];

  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    cartItemsContainer.style.display = "none";
  } else {
    emptyMsg.style.display = "none";
    cartItemsContainer.style.display = "block";

    cartItemsContainer.innerHTML = ""; // clear existing

    cartItems.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.style.marginBottom = "15px";
      itemDiv.textContent = `${item.title} — Quantity: ${item.quantity}`;
      cartItemsContainer.appendChild(itemDiv);
    });
  }
});
