import { useEffect, useRef, useState } from 'react';
import ApplicationLogo from '@/admin/Components/ApplicationLogo';
import Dropdown from '@/admin/Components/Dropdown';
import NavLink from '@/admin/Components/NavLink';
import ResponsiveNavLink from '@/admin/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircleIcon, ChevronDownIcon, PowerIcon, UserIcon, UserPlusIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ThemeSwitcher from '../Components/ThemeSwitcher';
import moment from 'moment';
import { LuExternalLink } from "react-icons/lu";

export const notify = (props) => {
    toast.custom((t) => (
        <Notification {...t} {...props} />
    ), { position: "bottom-right", duration: 3000 });
}

export function NotificationProgressbar({ duration }) {
    const barRef = useRef();

    useEffect(() => {
        barRef.current.classList.add('w-0');
    }, []);

    return (
        <span ref={barRef} className={`w-full h-1 dark:bg-indigo-400 bg-indigo-600 ease-linear duration-[3100ms] transition-[width] absolute bottom-0 left-0`}/>
    );
}

function IconNotification ({ type }) {
    if (type == 'success') return <CheckCircleIcon className="h-6 w-6 mr-2 text-green-500" aria-hidden="true"/>;
    if (type == 'danger') return <XCircleIcon className="h-6 w-6 mr-2 text-red-500" aria-hidden="true"/>;
    return "";
}

export function Notification({ id, visible, title, description, duration, type = 'success' }) {
    return (
        <div
            className={`bg-white dark:bg-gray-600 shadow-sm overflow-hidden sm:rounded-lg px-6 py-4 relative ${
                visible ? 'animate-enter' : 'animate-leave'
            }`}
        >
            <div className="flex items-start w-full max-w-[300px]">
                <IconNotification type={type}/>
                <div className='flex-1'>
                    <h2 className='text-black dark:text-white font-bold text-base'>{title}</h2>
                    {description && <p className='text-sm w-full text-gray-800 dark:text-gray-200'>{description}</p>}
                </div>
                <XMarkIcon className="h-5 w-5 ml-3 rounded-sm cursor-pointer hover:bg-black/25 text-gray-700 dark:text-gray-50" aria-hidden="true" onClick={(e) => toast.remove(id) }/>
            </div>

            <NotificationProgressbar duration={duration}/>
        </div>
    );
}

export default function Authenticated({ auth, header, children, classNameHeader }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className='w-0'/>
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')}>
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('geral_inf.edit')} active={route().current().includes('geral_inf')}>
                                    Geral
                                </NavLink>
                                <NavLink href={route('texts.index')} active={route().current().includes('text')}>
                                    Textos
                                </NavLink>
                                <NavLink href={route('banners.index')} active={route().current().includes('banner')}>
                                    Banners
                                </NavLink>
                                <NavLink href={route('benefits.index')} active={route().current().includes('benefit')}>
                                    Vantagens
                                </NavLink>
                                <NavLink href={route('plans.index')} active={route().current().includes('plan')}>
                                    Planos
                                </NavLink>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}
                                                    <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4"/>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')} className="flex">
                                                <UserIcon className='w-5 h-5 mr-2'/>
                                                Perfil
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('register')} className="flex">
                                                <UserPlusIcon className='w-5 h-5 mr-2'/>
                                                Criar novo perfil
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button" className="flex">
                                                <PowerIcon className='w-5 h-5 mr-2'/>
                                                Sair
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <ThemeSwitcher />

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current().includes('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('geral_inf.edit')} active={route().current().includes('geral_inf')}>
                            Geral
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('banners.index')} active={route().current().includes('banner')}>
                            Banners
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('texts.index')} active={route().current().includes('text')}>
                            Texts
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('benefits.index')} active={route().current().includes('benefit')}>
                            Vantagens
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('plans.index')} active={route().current().includes('plan')}>
                            Planos
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Sair
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className={`max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ${classNameHeader}`}>{header}</div>
                </header>
            )}

            <main>{children}</main>
            <footer className='border-t border-gray-200 dark:border-gray-800 py-3'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
                    <p className='text-gray-400 dark:text-gray-600 text-sm'>Painel de controle<b className='inline-block mx-2'>•</b>{moment().format('YYYY')}</p>
                    <a href={route('home')} target='_blank' className='text-gray-400 dark:text-gray-600 text-sm flex items-center hover:!text-indigo-500 duration-200'>
                        <LuExternalLink className='inline-block mr-2'/>
                        Acessar site
                    </a>
                </div>
            </footer>
            <Toaster />
        </div>
    );
}
