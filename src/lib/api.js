const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Savoney API request failed.");
  }

  return data;
}

export function createUser(payload) {
  return request("/api/create-user", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getIncome(clerkId) {
  return request(`/api/income/${encodeURIComponent(clerkId)}`);
}

export function addIncome(payload) {
  return request("/api/income", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getExpenses(clerkId) {
  return request(`/api/expense/${encodeURIComponent(clerkId)}`);
}

export function addExpense(payload) {
  return request("/api/expense", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBudgets(clerkId) {
  return request(`/api/budget/${encodeURIComponent(clerkId)}`);
}

export function addBudget(payload) {
  return request("/api/budget", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
