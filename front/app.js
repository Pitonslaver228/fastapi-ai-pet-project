const API_BASE_URL = "http://127.0.0.1:8000";

const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const refreshBtn = document.getElementById("refreshBtn");
const clearBtn = document.getElementById("clearBtn");
const answerBox = document.getElementById("answerBox");
const errorBox = document.getElementById("errorBox");
const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");
const apiStatus = document.getElementById("apiStatus");
const statusText = document.getElementById("statusText");

function setStatus(online) {
  apiStatus.classList.toggle("online", online);
  statusText.textContent = online ? "API активен" : "API неактивен";
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderHistory(items) {
  historyCount.textContent = Array.isArray(items) ? items.length : 0;

  if (!Array.isArray(items) || items.length === 0) {
    historyList.innerHTML = '<div class="empty-state">История пока пуста.</div>';
    return;
  }

  const normalizedItems = [...items].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

  historyList.innerHTML = normalizedItems.map((item) => {
    const id = escapeHtml(item.id ?? "—");
    const prompt = escapeHtml(item.prompt ?? "—").replace(/\n/g, "<br>");
    const response = escapeHtml(item.response ?? "—").replace(/\n/g, "<br>");

    return `
      <article class="history-item">
        <div class="history-label">Запрос #${id}</div>
        <h3 class="history-title">Prompt</h3>
        <p class="history-text">${prompt}</p>
        <h3 class="history-title">Response</h3>
        <p class="history-text">${response}</p>
      </article>
    `;
  }).join("");
}

async function loadHistory() {
  hideError();
  refreshBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить историю. HTTP ${response.status}`);
    }

    const data = await response.json();
    renderHistory(data);
    setStatus(true);
  } catch (error) {
    setStatus(false);
    historyList.innerHTML = '<div class="empty-state">Не удалось загрузить историю.</div>';
    showError(error.message);
  } finally {
    refreshBtn.disabled = false;
  }
}

async function sendPrompt() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    showError("Введите запрос.");
    return;
  }

  hideError();
  sendBtn.disabled = true;
  refreshBtn.disabled = true;
  answerBox.textContent = "Ждём ответ от Gemini...";

  try {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ошибка HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    answerBox.textContent = data.answer ?? "Ответ получен, но поле answer пустое.";
    promptInput.value = "";
    setStatus(true);
    await loadHistory();
  } catch (error) {
    setStatus(false);
    answerBox.textContent = "Не удалось получить ответ.";
    showError(error.message);
  } finally {
    sendBtn.disabled = false;
    refreshBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", sendPrompt);
refreshBtn.addEventListener("click", loadHistory);
clearBtn.addEventListener("click", () => {
  promptInput.value = "";
  hideError();
});

promptInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    sendPrompt();
  }
});

loadHistory();