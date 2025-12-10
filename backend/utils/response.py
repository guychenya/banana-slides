from typing import Any, Optional, Dict
+
+def success(data: Any = None, message: str = "OK") -> Dict[str, Any]:
+    return {
+        "success": True,
+        "message": message,
+        "data": data
+    }
+
+def error(message: str = "Error", code: Optional[int] = None, details: Any = None) -> Dict[str, Any]:
+    return {
+        "success": False,
+        "message": message,
+        "code": code,
+        "details": details
+    }