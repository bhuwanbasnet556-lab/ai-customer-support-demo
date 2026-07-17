const chatBox = document.getElementById("chatBox");

let products = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
  })
  .catch(err => {
    console.error("Products load failed:", err);
  });

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getReply(message) {
  message = message.toLowerCase().trim();

  // Greeting
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey") ||
    message.includes("namaste")
  ) {
    return `
👋 <b>Namaste!</b><br><br>
Welcome to our store.<br>
How can I help you today?
`;
  }

  // Product Search
  for (let product of products) {
    if (message.includes(product.name.toLowerCase())) {
      return `
📱 <b>${product.name}</b><br><br>

💰 <b>Price:</b> ${product.price}<br>
📦 <b>Stock:</b> ${product.stock}<br>
🚚 <b>Delivery:</b> ${product.delivery}<br>
💳 <b>Cash on Delivery:</b> ${product.cod}<br><br>

Need anything else? 😊
`;
    }
  }

  // Delivery
  if (message.includes("delivery")) {
    return `
🚚 <b>Delivery Information</b><br><br>

✅ Delivery available all over Nepal.<br>
⏰ Estimated time: 1–3 Days.<br>
💳 Cash on Delivery Available.
`;
  }

  // Location
  if (message.includes("location") || message.includes("address")) {
    return `
📍 <b>Store Location</b><br><br>

Kathmandu, Nepal
`;
  }

  // Contact
  if (
    message.includes("contact") ||
    message.includes("phone") ||
    message.includes("number")
  ) {
    return `
📞 <b>Contact Us</b><br><br>

+977-98XXXXXXXX
`;
  }

  // Price only
  if (message.includes("price")) {
    return `
💰 Please type the product name.

Example:
• iPhone 16
• Samsung Galaxy S25
• Redmi Note 14 Pro
`;
  }

  return `
🤖 Sorry, I couldn't understand your question.

You can ask about:

📱 Products
💰 Price
🚚 Delivery
📍 Location
📞 Contact
`;
}

function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  setTimeout(() => {
    addMessage(getReply(text), "bot");
  }, 600);
}

function quick(text) {
  document.getElementById("message").value = text;
  sendMessage();
}

document
  .getElementById("message")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
