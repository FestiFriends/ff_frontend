import { createContext, useContext } from 'react';

interface RadioGroupContextType {
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      'RadioGroupItem은 RadioGroup 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
};

export const RadioGroupProvider: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  children: React.ReactNode;
}> = ({ value, onChange, name, children }) => (
  <RadioGroupContext.Provider value={{ value, onChange, name }}>
    {children}
  </RadioGroupContext.Provider>
);
