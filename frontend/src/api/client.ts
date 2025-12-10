import axios from 'axios';

// Default backend URL points to local dev. Modify if deploying behind a proxy.
const BASE_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    // Standardize network error for UI
    return Promise.reject(err);
  }
);

// Helper function to construct image URLs
export const getImageUrl = (path: string, timestamp?: string): string => {
  if (!path) return '';
  
  // If the path is already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Construct the URL using the base URL
  const baseUrl = BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  let url = `${baseUrl}/${path.replace(/^\//, '')}`; // Remove leading slash from path
  
  // Add timestamp as cache buster if provided
  if (timestamp) {
    url += `?t=${encodeURIComponent(timestamp)}`;
  }
  
  return url;
};

export const apiClient = client;
export default client;
