const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Savoney API request failed.");
  }

  return data;
}

async function readList(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return [];
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Savoney API request failed.");
  }

  return Array.isArray(data) ? data : [];
}

export function createUser(payload) {
  return request("/api/create-user", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getIncome(clerkId) {
  return readList(`/api/income/${encodeURIComponent(clerkId)}`);
}

export function addIncome(payload) {
  return request("/api/income", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getExpenses(clerkId) {
  return readList(`/api/expense/${encodeURIComponent(clerkId)}`);
}

export function addExpense(payload) {
  return request("/api/expense", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBudgets(clerkId) {
  return readList(`/api/budget/${encodeURIComponent(clerkId)}`);
}

export function addBudget(payload) {
  return request("/api/budget", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
