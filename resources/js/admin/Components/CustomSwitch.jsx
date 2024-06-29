import { forwardRef, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

export default forwardRef(function CustomSwitch({ isEnabled, label, isFocused, ...props }, ref) {
    const [enabled, setEnabled] = useState(isEnabled);

    const input = ref ? ref : useRef();

    const onChange = (enabled) => {
        setEnabled(enabled);
        props.onChange(enabled);
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Switch
            id={props.id}
            checked={enabled}
            onChange={onChange} ref={input}
            className={`${enabled ? 'bg-indigo-500 border-indigo-300 dark:border-indigo-700' : 'bg-gray-900 border-gray-300 dark:border-gray-700'}
                relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-[1px] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">{label}</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-7' : 'translate-x-[0.15rem]'}
                    pointer-events-none inline-block h-[22px] w-[22px] translate-y-[0.13rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
});
