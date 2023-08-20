import { ReactNode } from 'react';

interface LabelProps {
  htmlFor: string;
  text: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'normal' | 'bold' | 'italic';
  color?: string;
}

export function Label({
  htmlFor,
  text,
  size = 'medium',
  variant = 'normal',
  color = 'gray',
}: LabelProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      case 'medium':
      default:
        return '';
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'normal':
        return '';
      case 'bold':
        return 'font-bold';
      case 'italic':
        return 'italic';
      default:
        return '';
    }
  };

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-${color}-700 ${getSizeClass()} ${getVariantClass()}`}
    >
      {text}
    </label>
  );
}
