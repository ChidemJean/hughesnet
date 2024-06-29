import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TableSearchInput({ type = 'text', className = '', isFocused = false, onChange, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const debouncedOnChanged = _.debounce((e) => {
        onChange(e);
    }, 500);

    return (
        <div className="relative flex items-center group">
            <span className="absolute inset-y-0 left-0 flex items-center justify-center w-9 h-full text-gray-400 pointer-events-none group-focus-within:text-indigo-500">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true"/>
            </span>

            <input
                {...props}
                ref={input}
                onChange={debouncedOnChanged}
                placeholder="Pesquisar" type="search" autoComplete="off"
                className="block w-full max-w-xs pl-9 placeholder-gray-400 transition duration-75 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"/>

            <span className="sr-only">
                Search
            </span>
        </div>
    );
});
