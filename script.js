const chatBox = document.getElementById("chatBox");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getReply(message) {
  message = message.toLowerCase();

  if (message.includes("price")) {
    return "💰 Please tell me the product name to check the price.";
  }

  if (message.includes("delivery")) {
    return "🚚 We deliver all over Nepal. Delivery usually takes 1–3 days.";
  }

  if (message.includes("location")) {
    return "📍 Our store is located in Kathmandu.";
  }

  if (message.includes("contact")) {
    return "📞 Contact: +977-98XXXXXXXX";
  }

  if (message.includes("hello") || message.includes("hi")) {
    return "👋 Namaste! How can I help you today?";
  }

  return "🤖 Sorry, I couldn't understand that. Please ask about price, delivery, location or contact.";
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
