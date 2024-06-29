import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Table, { Actions, AvatarCell, DateCell, ImageCell, LinkCell, RelationCell, SelectColumnFilter, StatusPill } from '@/admin/Components/Table';
import AuthenticatedLayout from '@/admin/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PrimaryButton from '@/admin/Components/PrimaryButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import TableSearchInput from '@/admin/Components/TableSearchInput';
import SaveOrderButtons from '@/admin/Components/SaveOrderButtons';

export default function GenericList(props) {

    const fetchIdRef = useRef(0);
    const [ search, setSearch ] = useState(props.search ?? '');
    const [ items, setItems ] = useState({ data: [], orderChange: false });
    const [ pageCount, setPageCount ] = useState(0);
    const [ pagination, setPagination ] = useState({ offset: 0, pageSize: null });
    const queryClient = useQueryClient();
    const [queryKey] = useState(props.queryKey);
    const searchRef = useRef();

    const { isLoading, isFetching, error, data, refetch } = useQuery(queryKey, async ({ signal }) =>
        fetch(route(props.queryUrl, { search: search, offset: pagination.offset, limit: pagination.pageSize }), { signal }).then(res =>
            res.json()
        )
    );

    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        if (fetchId === fetchIdRef.current) {
            const startRow = pageSize * pageIndex
            const endRow = startRow + pageSize
            setPagination({ offset: startRow, pageSize });
        }
    }, []);

    if (error) return 'An error has occurred: ' + error.message;

    useEffect(() => {
        setPageCount(pagination.pageSize ? Math.ceil(data?.count / pagination.pageSize) : 1);
        if (data) setItems((_data) => ({ data: data.items, orderChange: false }));
    }, [data]);

    useEffect(() => {
        reloadTable();
    }, [pagination, search]);

    const reloadTable = () => {
        queryClient.cancelQueries(queryKey);
        refetch({ cancelRefetch: true });
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className='w-full flex items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{props.title}</h2>
                    <a href={route(props.createUrl)}>
                        <PrimaryButton>
                            <PlusCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                            <span className="font-bold text-sm">Adicionar</span>
                        </PrimaryButton>
                    </a>
                </div>
            }
        >
            <Head title={props.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className='p-4 flex w-full flex-row items-center justify-between'>
                            <TableSearchInput
                                ref={searchRef}
                                defaultValue={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {items?.orderChange && (
                                <SaveOrderButtons
                                    items={items?.data ?? []}
                                    model={data?.model}
                                    onCancel={() => {
                                        setItems((_data) => ({ data: data.items, orderChange: false }));
                                    }}
                                    onFinish={() => {
                                        setItems((_data) => ({ data: _data.data, orderChange: false }));
                                    }}
                                />
                            )}
                        </div>
                        <Table
                            editPath={props.editUrl}
                            columns={props.columns}
                            data={items?.data ?? []}
                            fetchData={fetchData}
                            loading={isFetching}
                            pageCount={pageCount}
                            totalCount={data?.count}
                            pagination={pagination}
                            setPagination={setPagination}
                            setData={setItems}
                            dndSortable={props.dndSortable}
                            model={data?.model}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
