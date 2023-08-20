import { toast } from 'react-toastify';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

const progressColors: Record<NotificationType, string> = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export function notification(message: string, type: NotificationType = 'info') {
  (toast as any)[type](`${message}`, {
    position: 'top-right',
    theme: 'dark',
    autoClose: 2000,
    progressStyle: {
      background: progressColors[type],
    },
  });
}
