const chatBox = document.getElementById("chatBox");
let products = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
  });

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function getReply(message) {
  message = message.toLowerCase();

  // Product Search
  for (let product of products) {
    if (message.includes(product.name.toLowerCase())) {
      return `
📱 <b>${product.name}</b><br>
💰 ${product.price}<br>
📦 ${product.stock}
      `;
    }
  }

  if (message.includes("price")) {
    return "💰 Please type the product name (Example: iPhone 16)";
  }

  if (message.includes("delivery")) {
    return "🚚 Delivery available all over Nepal (1–3 days).";
  }

  if (message.includes("location")) {
    return "📍 Kathmandu, Nepal";
  }

  if (message.includes("contact")) {
    return "📞 +977-98XXXXXXXX";
  }

  if (message.includes("hello") || message.includes("hi")) {
    return "👋 Namaste! Welcome to our store.";
  }

function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    addMessage(getReply(text), "bot");
  }, 500);
}

function quick(text) {
  document.getElementById("message").value = text;
  sendMessage();
}

document.getElementById("message").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
