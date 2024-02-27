<script setup lang="ts">
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
    interface HTMLInputEvent extends Event {
        target: HTMLInputElement
    }

    interface HTMLInputFocusEvent extends FocusEvent {
        target: HTMLInputElement
    }

    const {
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
    } = defineProps<InputProps>();
    const errors = ref<ErrorTypes[]>([]);
    const validate = (event: FocusEvent) => {
        const val = (event as HTMLInputFocusEvent).target.value;
        const newErrors: ErrorTypes[] = [];
        if (required && val.trim() === '') {
            newErrors.push("required");
        }
        if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            newErrors.push("email");
        }
        if (type === 'number' && isNaN(parseFloat(val))) {
            newErrors.push("number");
        }
        if (minLength && val.length < minLength) {
            newErrors.push("minLength");
        }
        if (maxLength && val.length > maxLength) {
            newErrors.push("maxLength");
        }
        errors.value = newErrors;
        onChange && onChange(val);
    }
    
    const handleChange = (event: Event) => {
        onChange((event as HTMLInputEvent).target.value)
        errors.value = [];
    };
</script>
<template>
    <div :class="'app-input ' + className">
        <label v-if="label" :v-bind:htmlFor="'inputField-'+id">
            {{label}}
        </label>
        <input
        :id="'inputField-'+id"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :minLength="minLength"
        :maxLength="maxLength"
        @change="handleChange"
        @blur="validate"
        :value="value"
        />
        <div v-for="(error, index) in errors" :key="index">
            {{error}}
        </div>
    </div>
</template>