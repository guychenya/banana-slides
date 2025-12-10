def require(value, field_name: str):
+    if value is None or (isinstance(value, str) and not value.strip()):
+        raise ValueError(f"{field_name} is required")
+
+def positive_int(value, field_name: str):
+    if not isinstance(value, int) or value <= 0:
+        raise ValueError(f"{field_name} must be a positive integer")