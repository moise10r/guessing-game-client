'use client';

import { Input } from '@nextui-org/react';

interface CustomInputProps {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'  ;
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  isDisabled?: boolean;
  mainWrapper?: string;
  inputWrapper?: string;
  inputStyles?: string;
  labelStyles?: string;
  errorMessage?: React.ReactNode;
  isInvalid?: boolean;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <Input
      variant={props.variant}
      color={props.color || 'default'}
      type={props.type}
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onValueChange={props.onValueChange}
      labelPlacement={props.labelPlacement}
      radius={props.radius}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
      errorMessage={props.errorMessage}
      isInvalid={props.isInvalid}

      classNames={{
        mainWrapper: props.mainWrapper,
        inputWrapper: `${props.inputWrapper}`,
        input: `w-full ${props.inputStyles}`,
        label: props.labelStyles,
        errorMessage: 'pb-6',
        helperWrapper: '',
      }}
    />
  )
}
