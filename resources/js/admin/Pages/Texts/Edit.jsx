import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Table, { Actions, AvatarCell, DateCell, SelectColumnFilter, StatusPill } from '@/admin/Components/Table';
import AuthenticatedLayout from '@/admin/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PrimaryButton from '@/admin/Components/PrimaryButton';
import { ArrowLeftIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Form from './Form';
import SecondaryButton from '@/admin/Components/SecondaryButton';

export default function Edit({ auth, errors, text }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <div className='w-full flex items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar {text.title}</h2>
                    <div className="flex items-center">
                        <a href={route('texts.index')}>
                            <SecondaryButton className='mr-2'>
                                <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                                <span className="font-bold text-xs">Voltar</span>
                            </SecondaryButton>
                        </a>
                        <PrimaryButton>
                            <CheckIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                            <span className="font-bold text-xs">Salvar</span>
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Editar texto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <section className={`space-y-6`}>
                            <Form fields={{...text}}/>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
