import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Table, { Actions, AvatarCell, DateCell, ImageCell, LinkCell, RelationCell, SelectColumnFilter, StatusPill } from '@/admin/Components/Table';
import AuthenticatedLayout from '@/admin/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PrimaryButton from '@/admin/Components/PrimaryButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import TableSearchInput from '@/admin/Components/TableSearchInput';
import GenericList from '@/admin/Components/GenericList';

function TitleExtraContentCell({ value, column, row }) {
    return (
        <div className={`text-sm text-gray-500 dark:text-gray-200`}>
            {row.original.is_internal ? (
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    Uso interno
                </span>
            ) : (<></>)}
            {value}
        </div>
    );
}

export default function List(props) {

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: 'id',
            keepMobile: true,
            openMobileOnClick: true,
        },
        {
            Header: "Img",
            imgAccessor: 'img',
            keepMobile: true,
            openMobileOnClick: true,
            Cell: ImageCell
        },
        {
            Header: "Slug",
            accessor: 'slug',
            identification: true,
            Cell: TitleExtraContentCell
        },
        {
            Header: "Título",
            accessor: 'title',
            isTitle: true,
            keepMobile: true,
            openMobileOnClick: true,
        },
        {
            Header: "Link",
            accessor: 'link',
            Cell: LinkCell
        },
        {
            Header: "",
            accessor: 'actions',
            Cell: Actions,
            actions: (row) => {
                return row.original.is_internal === 0 ? ['edit', 'delete'] : ['edit'];
            },
            keepMobile: true
        },
    ], [])

    return (
        <GenericList
            columns={columns}
            auth={props.auth}
            errors={props.errors}
            search={props.search}
            title='Textos'
            queryUrl={'texts.query'}
            createUrl={'texts.create'}
            editUrl={'texts.edit'}
            queryKey='textsKey'
            dndSortable={true}
        />
    );
}
