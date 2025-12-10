import React from 'react';
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
