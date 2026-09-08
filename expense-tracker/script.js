/* ---------------- Categories ---------------- */
const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other Income"],
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Utilities",
    "Entertainment",
    "Health",
    "Shopping",
    "Other Expense",
  ],
};
const ICONS = {
  Salary: "💼",
  Freelance: "🧾",
  Investment: "📈",
  Gift: "🎁",
  "Other Income": "➕",
  Food: "🍽️",
  Transport: "🚗",
  Housing: "🏠",
  Utilities: "💡",
  Entertainment: "🎬",
  Health: "🩺",
  Shopping: "🛍️",
  "Other Expense": "➖",
};

let transactions = [];
let currentType = "income";
let editingId = null;
const STORAGE_KEY = "ledger:transactions";

/* ---------------- Storage helpers (persisted via window.storage) ---------------- */
async function loadTransactions() {
  try {
    const result = await window.storage.get(STORAGE_KEY, false);
    transactions = result ? JSON.parse(result.value) : [];
  } catch (e) {
    transactions = [];
  }
}
async function saveTransactions() {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(transactions), false);
  } catch (e) {
    console.error("Could not save transactions", e);
  }
}

/* ---------------- Form setup ---------------- */
function populateCategorySelect() {
  const sel = document.getElementById("category");
  sel.innerHTML = CATEGORIES[currentType]
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");
}

function setType(type) {
  currentType = type;
  document
    .getElementById("btnIncome")
    .classList.toggle("active", type === "income");
  document
    .getElementById("btnExpense")
    .classList.toggle("active", type === "expense");
  const btn = document.getElementById("submitBtn");
  btn.classList.toggle("income-mode", type === "income");
  btn.classList.toggle("expense-mode", type === "expense");
  btn.textContent = editingId
    ? "Save changes"
    : type === "income"
      ? "Add income"
      : "Add expense";
  populateCategorySelect();
}

function cancelEditMode() {
  editingId = null;
  document.getElementById("formTitle").textContent = "Add a transaction";
  document.getElementById("formSub").textContent =
    "Log money coming in or going out.";
  document.getElementById("cancelEdit").style.display = "none";
  resetFormFields();
  setType(currentType);
}

/* ---------------- Filters ---------------- */
function refreshCategoryFilterOptions() {
  const sel = document.getElementById("categoryFilter");
  const prev = sel.value;
  const allCats = [...new Set(transactions.map((t) => t.category))].sort();
  sel.innerHTML =
    `<option value="all">All categories</option>` +
    allCats.map((c) => `<option value="${c}">${c}</option>`).join("");
  if (allCats.includes(prev)) sel.value = prev;
}

/* ---------------- Rendering ---------------- */
function fmt(n) {
  const v = Number(n) || 0;
  return (
    (v < 0 ? "-" : "") +
    "$" +
    Math.abs(v).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function computeTotals() {
  let income = 0,
    expense = 0;
  transactions.forEach((t) =>
    t.type === "income" ? (income += t.amount) : (expense += t.amount),
  );
  return { income, expense, balance: income - expense };
}

let lastBalance = null;

function renderSummary() {
  const { income, expense, balance } = computeTotals();
  document.getElementById("cardIncome").textContent = fmt(income);
  document.getElementById("cardExpense").textContent = fmt(expense);
  document.getElementById("cardBalance").textContent = fmt(balance);
  document.getElementById("heroIn").textContent = fmt(income);
  document.getElementById("heroOut").textContent = fmt(expense);
  document.getElementById("heroCount").textContent = transactions.length;
  const heroEl = document.getElementById("heroBalance");
  heroEl.textContent = fmt(balance);
  heroEl.classList.toggle("negative", balance < 0);
  heroEl.classList.toggle("positive", balance >= 0);

  if (lastBalance !== null && lastBalance !== balance) {
    heroEl.classList.remove("pulse");
    void heroEl.offsetWidth; // restart animation
    heroEl.classList.add("pulse");
  }
  lastBalance = balance;
}

function renderList() {
  refreshCategoryFilterOptions();
  const typeFilter = document.getElementById("typeFilter").value;
  const catFilter = document.getElementById("categoryFilter").value;

  let list = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt,
  );
  if (typeFilter !== "all") list = list.filter((t) => t.type === typeFilter);
  if (catFilter !== "all") list = list.filter((t) => t.category === catFilter);

  const container = document.getElementById("txList");
  if (list.length === 0) {
    container.innerHTML = `<div class="empty">
      <div class="empty-mark">🗒️</div>
      <p><strong>No transactions to show</strong></p>
      <p>Add one on the left, or adjust your filters.</p>
    </div>`;
    return;
  }

  container.innerHTML = list
    .map(
      (t) => `
    <div class="tx-row ${t.type}" data-id="${t.id}">
      <div class="tx-icon">${ICONS[t.category] || "•"}</div>
      <div class="tx-info">
        <div class="tx-cat">${t.category}</div>
        <div class="tx-meta">${fmtDate(t.date)}${t.description ? " · " + escapeHtml(t.description) : ""}</div>
      </div>
      <div class="tx-amount">${t.type === "income" ? "+" : "−"}${fmt(t.amount)}</div>
      <div class="tx-actions">
        <button class="edit" onclick="startEdit('${t.id}')" title="Edit" aria-label="Edit transaction">✎</button>
        <button class="del" onclick="deleteTransaction('${t.id}')" title="Delete" aria-label="Delete transaction">🗑</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function renderAll() {
  renderSummary();
  renderList();
}

/* ---------------- CRUD ---------------- */
function resetFormFields() {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").valueAsDate = new Date();
  populateCategorySelect();
}

function spawnRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.2;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = e.clientX - rect.left - size / 2 + "px";
  ripple.style.top = e.clientY - rect.top - size / 2 + "px";
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

async function handleSubmit() {
  const amountEl = document.getElementById("amount");
  const dateEl = document.getElementById("date");
  const amount = parseFloat(amountEl.value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const date = dateEl.value;

  if (!amount || amount <= 0) {
    amountEl.focus();
    return;
  }
  if (!date) {
    dateEl.focus();
    return;
  }

  if (editingId) {
    const tx = transactions.find((t) => t.id === editingId);
    if (tx) {
      tx.type = currentType;
      tx.amount = amount;
      tx.category = category;
      tx.description = description;
      tx.date = date;
    }
    cancelEditMode();
  } else {
    transactions.push({
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + Math.random(),
      type: currentType,
      amount,
      category,
      description,
      date,
      createdAt: Date.now(),
    });
    resetFormFields();
    amountEl.focus();
  }
  await saveTransactions();
  renderAll();
}

function startEdit(id) {
  const tx = transactions.find((t) => t.id === id);
  if (!tx) return;
  editingId = id;
  setType(tx.type);
  document.getElementById("amount").value = tx.amount;
  document.getElementById("category").value = tx.category;
  document.getElementById("description").value = tx.description || "";
  document.getElementById("date").value = tx.date;
  document.getElementById("formTitle").textContent = "Edit transaction";
  document.getElementById("formSub").textContent = "Update the details below.";
  document.getElementById("cancelEdit").style.display = "block";
  document.getElementById("submitBtn").textContent = "Save changes";
  document
    .querySelector(".form-panel")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

async function deleteTransaction(id) {
  const row = document.querySelector(`.tx-row[data-id="${id}"]`);
  if (row) {
    row.classList.add("removing");
    await new Promise((r) => setTimeout(r, 220));
  }
  transactions = transactions.filter((t) => t.id !== id);
  if (editingId === id) cancelEditMode();
  await saveTransactions();
  renderAll();
}

["amount", "description", "date"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  });
});

/* ---------------- Init ---------------- */
async function init() {
  document.getElementById("date").valueAsDate = new Date();
  populateCategorySelect();
  await loadTransactions();
  document.getElementById("storageNote").textContent =
    "Your transactions are saved automatically and will be here next time you open this tracker.";
  renderAll();
}
init();
