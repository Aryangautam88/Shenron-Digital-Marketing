const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export async function blogApi(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new Error("Could not connect to the blog service. Check that the backend is running, then try again.");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallbackMessage = response.status >= 500
      ? `The API server is unavailable or returned an invalid response (HTTP ${response.status}). Start the backend and check its database configuration.`
      : `Request failed (${response.status}).`;
    const error = new Error(payload.message || fallbackMessage);
    error.status = response.status;
    throw error;
  }
  return payload;
}

export const jsonBody = (value) => JSON.stringify(value);
