import React from 'react';
+import { t } from '../../i18n';
+
+type Props = {
+  type: 'success' | 'error';
+  messageKey?: string;
+  message?: string;
+};
+
+export default function Toast({ type, messageKey, message }: Props) {
+  const defaultMsg = type === 'success' ? t('toasts.saved') : t('toasts.error');
+  return (
+    <div
+      role="alert"
+      className={`fixed bottom-4 right-4 px-4 py-2 rounded text-white ${
+        type === 'success' ? 'bg-green-600' : 'bg-red-600'
+      }`}
+    >
+      {message ?? (messageKey ? t(messageKey) : defaultMsg)}
+    </div>
+  );
+}