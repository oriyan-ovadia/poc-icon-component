import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface ButtonToggleGroupButtonProps {
  children?: React.ReactNode;
  value: string;
}

export const Button = ({ children, value }: ButtonToggleGroupButtonProps) => {
  return (
    <ToggleGroup.Item className="ButtonToggleGroup_Button" value={value}>
      {children}
    </ToggleGroup.Item>
  );
};
