import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Table, { Actions, AvatarCell, DateCell, SelectColumnFilter, StatusPill } from '@/admin/Components/Table';
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
            Header: "Nome",
            accessor: 'name',
            isTitle: true,
            keepMobile: true,
            openMobileOnClick: true
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
            title='Planos'
            queryUrl={'plans.query'}
            createUrl={'plans.create'}
            editUrl={'plans.edit'}
            queryKey='plansKey'
            dndSortable={true}
        />
    );
}
