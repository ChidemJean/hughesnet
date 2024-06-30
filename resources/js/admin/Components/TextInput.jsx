import { cn } from '@/lib/utils';
import IMask from 'imask';
import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', wrapperClassName='', value, isFocused = false, mask = null, ...props }, ref) {
    const input = ref ? ref : useRef();

    const [ currentValue, setValue ] = useState(value);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const updateCurrentValue = (value = '') => {
        if (mask != null) {
            const masked = IMask.createMask(mask);
            masked.resolve(value);//.replace(/[^\w\s]/gi, '')); // remove todo caractere que não seja um número, letra ou espaço
            setValue(masked.value);
            console.log(masked.value);
            return masked.value;
        } else {
            setValue(value);
        }
        return value;
    }

    const onChangeHandler = (e) => {
        let newValue = updateCurrentValue(e.target.value);
        if (props.onChange) props.onChange(e);
    }

    useEffect(() => {
        updateCurrentValue(value);
    }, [value]);

    return (
        <div className={cn("flex flex-col items-start", wrapperClassName)}>
            <input
                {...props}
                value={currentValue}
                onChange={onChangeHandler}
                type={type}
                className={
                    'border-gray-300 dark:border-gray-700 leading-[1.4] dark:bg-gray-900 dark:text-gray-300 px-2 py-[6px] text-sm focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
        </div>
    );
});
