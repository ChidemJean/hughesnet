import ApplicationLogo from '@/admin/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ThemeSwitcher from '../Components/ThemeSwitcher';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href={route('dashboard')} className="flex justify-center">
                    <ApplicationLogo className="w-2/4 h-auto  fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>

            <div className='mt-5 flex justify-between flex-row items-center w-full sm:max-w-md'>
                <a
                    href="/"
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Acessar o site
                </a>
                <ThemeSwitcher />
            </div>
        </div>
    );
}
