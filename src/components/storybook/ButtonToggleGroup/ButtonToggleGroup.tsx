import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Button } from './Button';
import './ButtonToggleGroup.css';

interface ButtonToggleGroupProps {
  children?: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const ButtonToggleGroup = ({ children, defaultValue, onChange }: ButtonToggleGroupProps) => {
  return (
    <ToggleGroup.Root
      className="ButtonToggleGroup_root"
      defaultValue={defaultValue}
      onValueChange={onChange}
      type="single">
      {children}
    </ToggleGroup.Root>
  );
};

ButtonToggleGroup.Button = Button;
