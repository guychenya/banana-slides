import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocaleToggle from '../components/shared/LocaleToggle';
import { t } from '../i18n';
import { useProjectStore } from '../store/useProjectStore';
import { useToast } from '../components/shared';

export function Home() {
  const [theme, setTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { initializeProject } = useProjectStore();
  const { show } = useToast();

  const onGenerate = async () => {
    if (!theme.trim()) {
      show({ message: t('errors.required'), type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      // Initialize project with the idea
      await initializeProject('idea', theme);
      
      // Navigate to outline editor
      const projectId = useProjectStore.getState().currentProject?.id;
      if (projectId) {
        navigate(`/project/${projectId}/outline`);
      }
    } catch (error: any) {
      console.error('Failed to create project:', error);
      show({ 
        message: error?.message || t('errors.network'), 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : t('actions.generate')}
        </button>
      </div>
    </div>
  );
}

export default Home;
