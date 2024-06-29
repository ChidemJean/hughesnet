import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';

export default forwardRef(function Select({ value, items, className = '', isFocused = false, ...props }, ref) {
    const [selected, setSelected] = useState(items[0]);

    const input = ref ? ref : useRef();

    const onChange = (item) => {
        setSelected(item);
        props.onChange(item.id);
    }

    useEffect(() => {
        setSelected(selected => {
            return items.reduce((prev, cur, idx, list) => (cur.id == value ? cur : prev))
        });
    }, [value]);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Listbox value={selected} onChange={onChange} ref={input}>
            <div className="relative mt-1">
                <Listbox.Button
                    className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md
                        focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300
                        border-[1px] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                >
                    <span className="block truncate">{selected?.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {items.map((item, itemIdx) => (
                            <Listbox.Option
                                key={itemIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-500 dark:text-white' : 'text-gray-900'
                                    }`
                                }
                                value={item}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate dark:text-white ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-300">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
});
