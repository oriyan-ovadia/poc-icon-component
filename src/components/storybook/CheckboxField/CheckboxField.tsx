import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Icon } from '../Icon/Icon';
import './CheckboxField.css';

interface CheckboxProps {
  children?: React.ReactNode;
  onChange?: (isChecked: boolean) => void;
}

export const CheckboxField = ({ children, onChange }: CheckboxProps) => {
  return (
    <div className="Checkbox_root">
      <label className="Checkbox_label">
        <RadixCheckbox.Root className="Checkbox_wrapper" onCheckedChange={onChange}>
          <RadixCheckbox.Indicator className="Checkbox_indicator">
            <Icon icon="check" size="sm" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {children}
      </label>
    </div>
  );
};
