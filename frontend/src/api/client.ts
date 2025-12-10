import axios from 'axios';
+
+// Default backend URL points to local dev. Modify if deploying behind a proxy.
+const BASE_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:5000';
+
+const client = axios.create({
+  baseURL: BASE_URL,
+  timeout: 30000
+});
+
+client.interceptors.response.use(
+  (res) => res,
+  (err) => {
+    // Standardize network error for UI
+    return Promise.reject(err);
+  }
+);
+
+export default client;