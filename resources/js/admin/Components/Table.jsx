import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Button, PageButton } from './shared/Button'
import { classNames } from './shared/Utils'
import { SortIcon, SortUpIcon, SortDownIcon } from './shared/Icons'
import ActionsRow from './ActionsRow'
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { EyeIcon } from '@heroicons/react/20/solid'
import { useForm } from '@inertiajs/react'
import Modal from './Modal'
import SecondaryButton from './SecondaryButton'
import DangerButton from './DangerButton'
import InputError from './InputError'
import { notify } from '../Layouts/AuthenticatedLayout'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { DragHandle } from './DragHandle'
import { StaticTableRow } from './StaticTableRow'
import { CSS } from "@dnd-kit/utilities";

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Search: </span>
            <input
                type="text"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </label>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render("Header")}: </span>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";

    return (
        <span
            className={
                classNames(
                    "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                    status.startsWith("active") ? "bg-green-100 text-green-800" : null,
                    status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
                    status.startsWith("offline") ? "bg-red-100 text-red-800" : null,
                )
            }
        >
            {status}
        </span>
    );
};

export function DateCell({ value, column, row }) {
    return (
        <span className='text-gray-500 dark:text-gray-200 text-xs'>
            {value ? format(Date.parse(value), "dd/MM/yyyy 'às' h'h e' m'min'") : '---'}
        </span>
    )
}

export function LinkCell({ value, column, row }) {
    return value ? (
        <a href={`${value.indexOf('http') === 0 ? '' : 'https://'}${value}`} target="_blank" className='text-gray-500 dark:text-gray-200 text-xs'>
            Clique aqui
        </a>
    ) : (<span className='text-gray-500 dark:text-gray-200 text-xs'>---</span>);
}

export function AvatarCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{row.original[column.emailAccessor]}</div>
            </div>
        </div>
    )
}

export function ImageCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-16">
                {row.original[column.imgAccessor] ? (
                    <img className="h-12 w-16 object-contain object-center rounded-md" src={`/${row.original[column.imgAccessor]}`} alt="" />
                ) : (
                    <div className="bg-gray-300 dark:bg-gray-700 h-12 w-16 rounded-md" />
                )}
            </div>
        </div>
    )
}

export function RelationCell({ value, column, row }) {
    return value ? (
        <a className='text-gray-500 dark:text-gray-200 text-xs' href={route(column.pathTo, { id: value[column.pathId] })}>
            <b>{value[column.relationAccessor]}</b>
        </a>
    ) : (
        <span className='text-gray-500 dark:text-gray-200 text-xs'>---</span>
    );
}

export function PaginationControls({ nextPage, previousPage, canNextPage, canPreviousPage, gotoPage, setPagination, pagination, pageSize, setPageSize, pageIndex, pageOptions, pageCount, loading, onlyPagination = false }) {
    return (
        <nav role="navigation" aria-label="Pagination Navigation" className="w-full flex items-center justify-between">
            <div className={`flex ${onlyPagination ? 'justify-center' : 'justify-between'} items-center flex-1 lg:hidden`}>
                <div className={`${onlyPagination ? 'hidden' : 'flex'} items-center space-x-2 rtl:space-x-reverse`}>
                    <label>
                        <select
                            value={pagination?.pageSize ?? 'Todos'}
                            onChange={e => {
                                let val = e.target.value;
                                setPagination(({ offset, pageSize }) => ({ offset, pageSize: (val == 'Todos' ? null : Number(val))}));
                            }}
                            className="h-8 text-sm pr-8 mr-2 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-inset focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500"
                        >
                            {[5, 10, 20, 'Todos'].map((_pageSize, i) => (
                                <option key={i} value={_pageSize}>
                                    {_pageSize}
                                </option>
                            ))}
                        </select>

                        <span className="text-sm font-medium dark:text-white">
                            por página
                        </span>
                    </label>
                </div>

                <div className="w-auto flex flex-row items-center">
                    {canPreviousPage && (
                        <button
                            type="button"
                            className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-400/5 transition text-indigo-600"
                            aria-label="Previous" rel="prev"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className='text-gray-400'>Anterior</span>
                        </button>
                    )}
                    {canNextPage && (
                        <button
                            type="button"
                            className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-400/5 transition text-indigo-600"
                            aria-label="Next" rel="next"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            <span className='text-gray-400'>Próxima</span>
                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
            <div className={`hidden lg:grid ${onlyPagination ? 'grid-cols-1' : 'grid-cols-3'} flex-1 items-center`}>
                <div className={`${onlyPagination ? 'hidden' : 'flex'} items-center`}>
                    <div className="pl-2 text-sm font-medium dark:text-white">
                        {pageOptions?.length > 1 ? (
                            <>
                                Página <span className="font-medium"><b>{pageIndex + 1}</b></span> de <span className="font-medium">{pageOptions.length}</span>
                            </>
                        ) : (
                            <>Todos</>
                        )}
                    </div>
                </div>
                <div className={`${onlyPagination ? 'hidden' : 'flex'} items-center justify-center`}>
                    <div className="flex items-center space-x-2 filament-tables-pagination-records-per-page-selector rtl:space-x-reverse">
                        <label>
                            <select
                                value={pagination?.pageSize ?? 'Todos'}
                                onChange={e => {
                                    let val = e.target.value;
                                    setPagination(({ offset, pageSize }) => ({ offset, pageSize: (val == 'Todos' ? null : Number(val))}));
                                }}
                                className="h-8 text-sm pr-8 mr-2 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-inset focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500"
                            >
                                {[5, 10, 20, 'Todos'].map((_pageSize, i) => (
                                    <option key={i} value={_pageSize}>
                                        {_pageSize}
                                    </option>
                                ))}
                            </select>

                            <span className="text-sm font-medium dark:text-white">
                                por página
                            </span>
                        </label>
                    </div>
                </div>
                <div className={`flex items-center ${onlyPagination ? 'justify-center' : 'justify-end'}`}>
                    <div className="py-3 border rounded-lg dark:border-gray-600">
                        <ol className="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600">
                            {canPreviousPage && (<li>
                                <button
                                    type="button"
                                    className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-400/5 transition text-indigo-600"
                                    aria-label="Previous" rel="prev"
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                >
                                    <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span></span>
                                </button>
                            </li>)}

                            {(pageCount && pageCount > 1) && [...Array(pageCount).keys()].map(_pageNumber => (
                                <li key={_pageNumber}>
                                    <button
                                        type="button"
                                        className={`relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none transition ${pageIndex == _pageNumber ? 'text-indigo-600 focus:underline bg-indigo-500/10 ring-2 ring-indigo-500' : 'hover:bg-gray-500/5 focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-400/5 focus:text-indigo-600'}`}
                                        aria-label={`Go to page ${_pageNumber}`}
                                        onClick={() => gotoPage(_pageNumber)}
                                    >
                                        <span>{_pageNumber + 1}</span>
                                    </button>
                                </li>
                            ))}

                            {canNextPage && (<li>
                                <button
                                    type="button"
                                    className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-indigo-500/10 focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-400/5 transition text-indigo-600"
                                    aria-label="Next" rel="next"
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                >
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span></span>
                                </button>
                            </li>)}
                        </ol>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function CustomRow({ row, i, model, dndSortable = false, editPath, isStatic = false }) {
    const [isOpen, setOpen] = useState(false);

    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging
    } = useSortable({
        id: row.original.id
    });

    const onClickCell = (cell) => {
        if (cell.column.openMobileOnClick) {
            setOpen(isOpen => !isOpen);
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition
    };

    return (
        <>
            <tr ref={setNodeRef} {...row.getRowProps()} className='group' style={style}>
                {isDragging ? (
                    <td colSpan={row.cells.length} className={`px-6 py-7 bg-indigo-100 dark:bg-indigo-700/30`}>&nbsp;</td>
                ) : row.cells.map((cell, i) => {
                    return (
                        <td
                            {...cell.getCellProps()}
                            className={`px-6 py-4 max-w-[300px] group-hover:bg-indigo-600/5 ${isStatic ? '!bg-gray-50/75 dark:!bg-gray-800/75' : 'transition'} ${cell.column.keepMobile ? '' : 'hidden md:table-cell'} ${cell.column.openMobileOnClick ? 'cursor-pointer font-bold' : ''}`}
                            role="cell"
                            onClick={(e) => onClickCell(cell)}
                        >
                            <div className="flex flex-row items-center">
                                {(dndSortable && i === 0) && (
                                    <DragHandle {...attributes} {...listeners} />
                                )}
                                {cell.column.Cell.name.indexOf("defaultRenderer") !== -1
                                    ? <div className={`text-sm text-gray-500 dark:text-gray-200 ${cell.column.openMobileOnClick ? 'hover:text-indigo-400' : ''}`}>{cell.render('Cell', { model, editPath })}</div>
                                    : (
                                        <div className='text-gray-500 dark:text-gray-200 text-xs w-full'>
                                            {cell.render('Cell', { model, editPath })}
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                    )
                })}
            </tr>
            <tr className={`${isOpen ? 'table-row' : 'hidden'} md:hidden`}>
                <td
                    colSpan="10000"
                    className='px-6 py-2 text-gray-500'
                    role="cell"
                >
                    {row.cells.map((cell, i) => {
                        return !cell.column.keepMobile && (
                            <div key={i}>
                                <b className='font-medium text-gray-500 uppercase text-xs tracking-wider'>{cell.column.Header}: </b>
                                <span className='text-gray-500 dark:text-gray-200'>
                                    {cell.render('Cell')}
                                </span>
                            </div>
                        )
                    })}
                </td>
            </tr>
        </>
    );
}

export function Actions({ row, column, model, editPath, ...props }) {
    const actions = (typeof column.actions === 'function') ? column.actions(row) : ['edit', 'delete'];

    const getRowTitle = () => {
        let col = props.columns.filter(col => (col.isTitle))[0];
        return `${row.original[col.id]}`;
    }

    const getRowIdentification = () => {
        let col = props.columns.filter(col => (col.identification))[0];
        return `${row.original[col.id]}`;
    }

    return (
        <div className='w-full flex justify-end'>
            {/* <a className="flex items-center p-1 mx-0.5 rounded-sm text-gray-400 hover:text-indigo-500 transition cursor-pointer">
                <span className="sr-only">Next</span>
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                <span className='text-xs ml-1 font-bold'>Visualizar</span>
            </a> */}
            <a href={actions.includes('edit') ? route(editPath, { id: getRowIdentification() }) : ''}
                className={`flex items-center p-1 mx-0.5 rounded-sm text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 hover:text-indigo-300 transition cursor-pointer ${actions.includes('edit') ? '' : 'cursor-not-allowed'}`}
            >
                <span className="sr-only">Next</span>
                <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                <span className='text-xs ml-1 font-bold'>Editar</span>
            </a>
            <DeleteAction model={model} id={row.values.id} itemTitle={getRowTitle()} disabled={!actions.includes('delete')} />
            <ActionsRow className='hidden' />
        </div>
    );
}

export function DeleteAction({ model, id, itemTitle, className, disabled = false }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const {
        data,
        setData,
        post: destroy,
        processing,
        errors,
    } = useForm({
        model: model,
        id: null,
    });

    useEffect(() => {
        if (id) setData('id', id);
    }, [id]);

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const deleteAction = (e) => {
        e.preventDefault();

        destroy(route('generic.destroy'), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                closeModal()
                notify({
                    type: 'success',
                    title: 'Deletado com sucesso!',
                    description: ''
                });
            },
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
    };

    return (
        <>
            <button disabled={disabled} onClick={confirmDeletion} className={`flex items-center p-1 mx-0.5 rounded-sm text-red-500 hover:text-red-300 transition cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
                <span className="sr-only">Delete</span>
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                <span className='text-xs ml-1 font-bold'>Deletar</span>
            </button>
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteAction} className="p-6">
                    <h2 className="text-xl font-black text-red-500">
                        Deletar {itemTitle}
                    </h2>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Você tem certeza que deseja deletar este item?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Depois que este item for excluído, todos os recursos e dados vinculados a ele que estão configurados como efeito cascata serão excluídos permanentemente.
                    </p>

                    <InputError message={errors.id} className="mt-2" />
                    <InputError message={errors.model} className="mt-2" />

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Deletar
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

function Table({ columns, data, fetchData, setData, dndSortable, pagination, setPagination, loading, model, editPath, totalCount, pageCount: controlledPageCount, initialPageSize = 5 }) {
    // Use the state and functions returned from useTable to build your UI
    const [activeId, setActiveId] = useState();
    const items = useMemo(() => data?.map(({ id }) => id), [data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state: { pageIndex, pageSize, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: initialPageSize }, // Pass our hoisted table state
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
        autoResetPage: false,
    },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination,  // new
    )

    useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize, model]);

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setData((data) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return { data: arrayMove(data.data, oldIndex, newIndex), orderChange: true };
            });
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    const selectedRow = useMemo(() => {
        if (!activeId) {
            return null;
        }
        const row = page.find(({ original }) => original.id === activeId);
        prepareRow(row);
        return row;
    }, [activeId, page, prepareRow]);

    // Render the UI for your table
    return (
        <>
            {/* table */}
            <div className="mt-0 flex flex-col">
                <div className="">
                    <div className="py-2 align-middle inline-block min-w-full px-0">
                        <div className="shadow overflow-visible border-y border-gray-300 dark:border-gray-700">
                            <DndContext
                                sensors={sensors}
                                onDragEnd={handleDragEnd}
                                onDragStart={handleDragStart}
                                onDragCancel={handleDragCancel}
                                collisionDetection={closestCenter}
                                modifiers={[restrictToVerticalAxis]}
                            >
                                <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    // Add the sorting props to control sorting. For this example
                                                    // we can add them into the header props
                                                    <th
                                                        scope="col"
                                                        className={`group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.keepMobile ? '' : 'hidden md:table-cell'}`}
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {column.render('Header')}
                                                            {/* Add a sort direction indicator */}
                                                            <span>
                                                                {column.isSorted
                                                                    ? column.isSortedDesc
                                                                        ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                        : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                    : (
                                                                        <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                    )}
                                                            </span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody
                                        {...getTableBodyProps()}
                                        className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700"
                                    >
                                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                            {page.map((row, i) => {  // new
                                                prepareRow(row)
                                                return (
                                                    <CustomRow dndSortable={dndSortable} key={i} row={row} i={i} model={model} editPath={editPath} />
                                                )
                                            })}
                                        </SortableContext>
                                        <tr>
                                            {loading ? (
                                                <td colSpan="10000" className='px-6 py-2 text-gray-500'>
                                                    <div className='flex items-center'>
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin w-5 h-5 mr-1">
                                                            <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" className='fill-indigo-400'></path>
                                                            <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" className='fill-indigo-400'></path>
                                                        </svg>
                                                        Carregando...
                                                    </div>
                                                </td>
                                            ) : (
                                                <td colSpan="10000" className='px-6 py-2 text-gray-500'>
                                                    <b>{page.length}</b> de <b>{totalCount}{' '}</b>
                                                    resultados
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                                <DragOverlay>
                                    {activeId && (
                                        <table style={{ width: "100%" }}>
                                            <tbody>
                                                <CustomRow isStatic={true} row={selectedRow} model={model} editPath={editPath} />
                                            </tbody>
                                        </table>
                                    )}
                                </DragOverlay>
                            </DndContext>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="py-3 px-4 flex items-center justify-between">
                <PaginationControls {...{ canNextPage, canPreviousPage, loading, nextPage, pagination, setPagination, previousPage, gotoPage, pageSize, setPageSize, pageIndex, pageOptions, pageCount }} />
            </div>
        </>
    )
}

export default Table;
