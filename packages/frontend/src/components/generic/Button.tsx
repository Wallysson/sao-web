import React, { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  fontColor?: string;
  color?: 'gray' | 'yellow' | 'orange' | 'blue' | 'brown';
  loading?: boolean;
  variant?: 'solid' | 'outline';
  onClick?: () => void;
}

export function Button({
  children,
  type = 'button',
  size = 'medium',
  startIcon,
  fontColor,
  color = 'gray',
  loading = false,
  variant = 'solid',
  onClick,
  ...rest
}: ButtonProps) {
  const getColorClass = () => {
    switch (color) {
      case 'gray':
        return `bg-gray-500 text-${fontColor || 'white'} hover:bg-gray-600`;
      case 'yellow':
        return `bg-yellow-500 text-${fontColor || 'black'} hover:bg-yellow-600`;
      case 'orange':
        return `bg-orange-500 text-${fontColor || 'black'} hover:bg-orange-600`;
      case 'blue':
        return `bg-blue-500 text-${fontColor || 'white'} hover:bg-blue-600`;
      case 'brown':
        return `bg-brown-500 text-${fontColor || 'white'} hover:bg-brown-600`;
      default:
        return `bg-gray-500 text-${fontColor || 'white'} hover:bg-gray-600`;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'large':
        return 'py-3 px-6 text-lg';
      case 'medium':
      default:
        return 'py-2 px-4';
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'outline':
        return `border ${getColorClass()} hover:bg-opacity-10`;
      case 'solid':
      default:
        return getColorClass();
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded ${getSizeClass()} ${getVariantClass()} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${
        loading ? 'pointer-events-none opacity-70' : ''
      }`}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center justify-center ">
          <span className="animate-spin rounded-full border-t-2 border-b-2 border-white h-4 w-4 " />
        </span>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
