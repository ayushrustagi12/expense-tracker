import axios from "axios";

const API_URL = "http://localhost:8000/api";

let csrfToken: string | null = null;

export const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  try {
    const response = await axios.get(`${API_URL}/csrf-token`, {
      withCredentials: true,
    });
    csrfToken = response.data.csrf_token;
    return csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    throw error;
  }
};

export const clearCsrfToken = () => {
  csrfToken = null;
};

export const getAxiosConfig = async () => {
  const token = await getCsrfToken();
  return {
    withCredentials: true,
    headers: {
      "X-CSRF-TOKEN": token,
      "Content-Type": "application/json",
    },
  };
};
