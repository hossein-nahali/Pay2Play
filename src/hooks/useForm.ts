import {useState, useCallback} from 'react';

type FieldType = 'string' | 'number';

type FieldSchema<T> = {
    [K in keyof T]: {
        value: T[K];
        type: FieldType;
    };
};

type FormValues<T> = { [K in keyof T]: T[K] };
type ValidationRules<T> = Partial<Record<keyof T, (value: any) => string | null>>;
type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(schema: FieldSchema<T>) {
    // Initialize form data from schema
    const initializeFormData = (): FormValues<T> => {
        return Object.keys(schema).reduce((acc, key) => {
            acc[key as keyof T] = schema[key as keyof T].value;
            return acc;
        }, {} as FormValues<T>);
    };

    const [data, setData] = useState<FormValues<T>>(initializeFormData);
    const [errors, setErrors] = useState<FormErrors<T>>({});

    // Clear specific field error
    const clearFieldError = useCallback((fieldName: keyof T) => {
        setErrors(prev => ({...prev, [fieldName]: ''}));
    }, []);

    // Update field value with type conversion
    const updateFieldValue = useCallback((fieldName: keyof T, rawValue: string) => {
        const fieldType = schema[fieldName].type;

        let parsedValue: any = rawValue;
        if (fieldType === 'number') {
            // Handle empty string for number fields
            if (rawValue === '') {
                parsedValue = '';
            } else {
                parsedValue = Number(rawValue);
                // Prevent invalid number input
                if (isNaN(parsedValue)) return;
            }
        }

        setData(prev => ({...prev, [fieldName]: parsedValue}));
        clearFieldError(fieldName);
    }, [schema, clearFieldError]);

    // Register field for form binding
    const register = useCallback((fieldName: keyof T) => {
        return {
            value: data[fieldName] ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                updateFieldValue(fieldName, e.target.value);
            },
        };
    }, [data, updateFieldValue]);

    // Validate form with custom rules
    const validate = useCallback((rules: ValidationRules<T>) => {
        const newErrors: FormErrors<T> = {};

        for (const fieldName in rules) {
            const validationRule = rules[fieldName];
            if (validationRule) {
                const errorMessage = validationRule(data[fieldName]);
                if (errorMessage) {
                    newErrors[fieldName] = errorMessage;
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [data]);

    // Reset form to initial values
    const reset = useCallback(() => {
        setData(initializeFormData());
        setErrors({});
    }, []);

    // Set field value programmatically
    const setValue = useCallback((fieldName: keyof T, value: any) => {
        setData(prev => ({...prev, [fieldName]: value}));
    }, []);

    return {
        data,
        errors,
        register,
        validate,
        reset,
        setValue,
        clearFieldError
    };
}