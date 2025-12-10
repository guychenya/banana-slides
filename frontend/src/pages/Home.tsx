import React, { useState } from 'react';
import LocaleToggle from '../components/shared/LocaleToggle';
import { t } from '../i18n';

export function Home() {
  const [theme, setTheme] = useState('');

  const onGenerate = () => {
    if (!theme.trim()) {
      alert(t('errors.required'));
      return;
    }
    // Trigger generate flow (existing logic)
    // ...
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        <LocaleToggle />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">{t('labels.idea')}</label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder={t('placeholders.enterTheme')}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {t('actions.generate')}
        </button>
      </div>
    </div>
  );
}

export default Home;
