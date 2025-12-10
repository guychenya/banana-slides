import React, { createContext, useContext, useState, useCallback } from 'react';
import { t } from '../../i18n';

type Props = {
  messageKey: string; // i18n key for the message
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
};

export const Toast: React.FC<Props> = ({ messageKey, type = 'info', onClose }) => {
  // Safely resolve translation, fallback to key if missing
  const message = t?.(messageKey) ?? messageKey;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        padding: '12px 16px',
        borderRadius: 8,
        margin: 8,
        color: '#111',
        background:
          type === 'success'
            ? '#D1FAE5'
            : type === 'warning'
            ? '#FEF3C7'
            : type === 'error'
            ? '#FEE2E2'
            : '#E5E7EB',
        border:
          type === 'success'
            ? '1px solid #10B981'
            : type === 'warning'
            ? '1px solid #D97706'
            : type === 'error'
            ? '1px solid #EF4444'
            : '1px solid #9CA3AF',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#374151',
            fontSize: 16,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Toast;

// Toast Context for managing toasts globally
type ToastConfig = {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
};

type ToastContextType = {
  show: (config: ToastConfig) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastConfig & { id: number }>>([]);
  const [nextId, setNextId] = useState(0);

  const show = useCallback((config: ToastConfig) => {
    const id = nextId;
    setNextId(id + 1);
    setToasts((prev) => [...prev, { ...config, id }]);

    const duration = config.duration || 3000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, [nextId]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            messageKey={toast.message}
            type={toast.type}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
