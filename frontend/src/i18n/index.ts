+import en from './en.json';
+import zh from './zh.json';
+
+export type Locale = 'en' | 'zh';
+
+type Dict = Record<string, string>;
+const dictionaries: Record<Locale, Dict> = { en, zh };
+
+const STORAGE_KEY = 'bananaSlides.locale';
+
+let currentLocale: Locale = (localStorage.getItem(STORAGE_KEY) as Locale) || 'en';
+
+export function setLocale(locale: Locale) {
+  currentLocale = locale;
+  localStorage.setItem(STORAGE_KEY, locale);
+}
+
+export function getLocale(): Locale {
+  return currentLocale;
+}
+
+export function t(key: string, fallback?: string): string {
+  const dict = dictionaries[currentLocale] || dictionaries.en;
+  return dict[key] || fallback || key;
+}