+import React from 'react';
+import { getLocale, setLocale, t } from '../../i18n';
+
+export default function LocaleToggle() {
+  const [locale, setLoc] = React.useState(getLocale());
+
+  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
+    const value = e.target.value as 'en' | 'zh';
+    setLocale(value);
+    setLoc(value);
+    // Reload to ensure all strings re-render consistently across pages
+    window.location.reload();
+  };
+
+  return (
+    <label className="flex items-center gap-2 text-sm">
+      <span>{t('locale.toggle')}</span>
+      <select
+        value={locale}
+        onChange={onChange}
+        className="border rounded px-2 py-1"
+        aria-label={t('locale.toggle')}
+      >
+        <option value="en">{t('locale.en')}</option>
+        <option value="zh">{t('locale.zh')}</option>
+      </select>
+    </label>
+  );
+}