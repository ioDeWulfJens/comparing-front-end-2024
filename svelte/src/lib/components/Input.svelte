<script lang="ts">
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
        onChange: (value: string) => void;
        className?: string;
    }
    
    let {
        id,
        label,
        placeholder,
        type,
        disabled,
        required,
        minLength,
        maxLength,
        value,
        onChange,
        className
    } = $props<InputProps>();
  
    let errors = $state<ErrorTypes[]>([]);
  
    function validate(event: FocusEvent) {
      const target = event.target as HTMLInputElement;
      const val = target.value;
      errors = [];
  
      if (required && val.trim() === '') {
        errors.push("required");
      }
      if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        errors.push("email");
      }
      if (type === 'number' && isNaN(parseFloat(val))) {
        errors.push("number");
      }
      if (minLength && val.length < minLength) {
        errors.push("minLength");
      }
      if (maxLength && val.length > maxLength) {
        errors.push("maxLength");
      }
  
      onChange && onChange(val);
    }
  
    function handleChange(event: Event) {
      onChange((event.target as HTMLInputElement).value);
      errors = [];
    }
</script>
  
<div class="app-input {className}">
    {#if label}
    <label for={`inputField-${id}`}>{{ label }}</label>
    {/if}
    <input
    id={`inputField-${id}`}
    type={type}
    placeholder={placeholder}
    disabled={disabled}
    required={required}
    minLength={minLength}
    maxLength={maxLength}
    on:change={handleChange}
    on:blur={validate}
    bind:value={value}
    />
    {#each errors as error}
    <div>{error}</div>
    {/each}
</div>