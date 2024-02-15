"use client";
import React, { FC, useState } from "react";

type InputTypes = "text" | "password" | "date" | "number" | "datetime-local" | "email";

type ErrorTypes = "required" | "number" | "email" | "minLength" | "maxLength";

type InputProps = {
    id: string;
    label?: string;
    placeholder?: string;
    type: InputTypes;
    disabled?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    value: string;
    onChange?: (value: string) => void;
    className?: string;
}

const Input: FC<InputProps> = ({
    id,
    label,
    placeholder,
    value,
    disabled,
    required,
    type,
    minLength,
    maxLength,
    onChange,
    className,
}) => {
    
  const [_value, setValue] = useState<string>(value);
  const [errors, setErrors] = useState<ErrorTypes[]>([]);
    const validate = () => {
        const newErrors: ErrorTypes[] = [];
        if (required && _value.trim() === '') {
            newErrors.push("required");
        }
        if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_value)) {
            newErrors.push("email");
        }
        if (type === 'number' && isNaN(parseFloat(_value))) {
            newErrors.push("number");
        }
        if (minLength && _value.length < minLength) {
            newErrors.push("minLength");
        }
        if (maxLength && _value.length > maxLength) {
            newErrors.push("maxLength");
        }
        setErrors(newErrors);
        onChange && onChange(_value);
    }
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setErrors([]);
  };

  return (
    <div className={`app-input ${className}`}>
        {label && <label htmlFor={`inputField-${id}`}>{label}</label>}
        <input
          id={`inputField-${id}`}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={validate}
          value={value}
        />
        {errors.map((error, index) => (
            <div key={index}>
                {error}
            </div>
        ))}
    </div>
  )
}

export default Input;