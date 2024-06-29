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

export default function List(props) {

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: 'id',
            keepMobile: true,
            openMobileOnClick: true,
            identification: true
        },
        {
            Header: "Img",
            imgAccessor: 'background_img',
            keepMobile: true,
            openMobileOnClick: true,
            Cell: ImageCell
        },
        {
            Header: "Título",
            accessor: 'title',
            isTitle: true,
            keepMobile: true,
            openMobileOnClick: true
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
            keepMobile: true
        },
    ], [])

    return (
        <GenericList
            columns={columns}
            auth={props.auth}
            errors={props.errors}
            search={props.search}
            title='Banners'
            queryUrl={'banners.query'}
            createUrl={'banners.create'}
            editUrl={'banners.edit'}
            queryKey='bannersKey'
            dndSortable={false}
        />
    );
}
