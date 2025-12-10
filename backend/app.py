from flask import Flask
+from flask_cors import CORS
+
+app = Flask(__name__)
+CORS(app)
+
+ @app.get("/health")
+def health():
+    return {"status": "healthy"}
+
+if __name__ == "__main__":
+    print("Starting Banana Slides backend (English locale default)...")
+    app.run(host="0.0.0.0", port=5000)