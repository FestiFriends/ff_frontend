import { cn } from '@/lib/utils';

export interface ModalStyles {
  trigger?: string;
  modal?: string;
  header?: string;
  content?: string;
  confirmButton?: string;
  cancelButton?: string;
}

export interface ModalVariant {
  name: string;
  styles: ModalStyles;
}

export const defaultModalStyles: ModalStyles = {
  trigger:
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  modal:
    'bg-white rounded-lg shadow-xl p-0 max-w-md w-full mx-4 overflow-hidden',
  header: 'text-lg font-semibold text-gray-900 leading-6',
  content: 'text-sm text-gray-500 leading-5',
  confirmButton:
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  cancelButton:
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
};

export const modalVariants: Record<string, ModalStyles> = {
  default: defaultModalStyles,
  danger: {
    trigger:
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    modal:
      'bg-white rounded-lg shadow-xl p-0 max-w-md w-full mx-4 overflow-hidden border-2 border-red-200',
    header: 'text-lg font-semibold text-red-900 leading-6',
    content: 'text-sm text-red-700 leading-5',
    confirmButton:
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    cancelButton:
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  },
};

export const mergeModalStyles = (
  baseStyles: ModalStyles,
  customStyles: Partial<ModalStyles> = {}
): ModalStyles => ({
  trigger: cn(baseStyles.trigger, customStyles.trigger),
  modal: cn(baseStyles.modal, customStyles.modal),
  header: cn(baseStyles.header, customStyles.header),
  content: cn(baseStyles.content, customStyles.content),
  confirmButton: cn(baseStyles.confirmButton, customStyles.confirmButton),
  cancelButton: cn(baseStyles.cancelButton, customStyles.cancelButton),
});

export const createModalTheme = (
  baseName: keyof typeof modalVariants,
  customStyles: Partial<ModalStyles> = {}
): ModalStyles => {
  const baseStyles = modalVariants[baseName] || modalVariants.default;
  return mergeModalStyles(baseStyles, customStyles);
};
