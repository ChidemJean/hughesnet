import CustomSwitch from "@/admin/Components/CustomSwitch";
import DangerButton from "@/admin/Components/DangerButton";
import InputError from "@/admin/Components/InputError";
import InputLabel from "@/admin/Components/InputLabel";
import PrimaryButton from "@/admin/Components/PrimaryButton";
import SecondaryButton from "@/admin/Components/SecondaryButton";
import Select from "@/admin/Components/Select";
import TextInput from "@/admin/Components/TextInput";
import TinyEditor from "@/admin/Components/TinyEditor";
import { useForm } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/admin/Components/shared/Button";
import { TrashIcon } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";

import { EventEmitter } from "@/events";
import PlanItemDialog from "./PlanItemDialog";
import { money_mask } from "@/masks";
import { moneyToDecimal } from "@/formatter";

const UPDATE_URL = `plans.update`;
const STORE_URL = `plans.store`;
const INDEX_URL = `plans.index`;

export default function Form({
    fields,
    plan_items
}) {
    const nameInput = useRef();
    const priceInput = useRef();
    const obs1Input = useRef();
    const obs2Input = useRef();
    const linkInput = useRef();

    let restFields = (typeof _restFields !== 'undefined') ? _restFields : fields;

    const {
        data,
        setData,
        put,
        post,
        processing,
        reset,
        errors,
    } = useForm(
        {
            name: '',
            items: plan_items ? plan_items.map(item => ({
                id: Number(item.id),
                title: item.title,
                text: item.text
            })) : [],
            ...restFields
        }
    );

    const save = (e = null) => {
        if (e) e.preventDefault();
        let options = { 
            preserveScroll: true, 
            onSuccess: () => {
                window.history.go(-2);
            } 
        };

        if (fields) {
            post(route(UPDATE_URL), options);
        } else {
            post(route(STORE_URL), options);
        }
    };

    const saveItem = (item) => {
        if (item.id !== null) {
            let items = data.items.map(_item => _item.id == item.id ? { id: _item.id, title: item.title, text: item.text } : _item); 
            setData('items', items);
            return;
        }
        if (item.idx !== null) {
            let items = data.items.map((_item, k) => k == item.idx ? { id: _item.id, title: item.title, text: item.text } : _item); 
            setData('items', items);
            return;
        }
        setData('items', [...data.items, { title: item.title, text: item.text }]);
    }

    const removeItem = (idx) => {
        setData('items', data.items.filter((item, k) => k !== idx));
    }

    const editItem = (idx) => {
        let _itemToEdit = data.items[idx];
        _itemToEdit.idx = idx;
        EventEmitter.dispatch('edit_item_plan', { item: _itemToEdit });
    }

    return (
        <>
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-3/5 pr-0 md:pr-2">
                    <div className="w-full bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <form onSubmit={save} className="p-6" name={`${fields ? 'update' : 'store'}_plan`}>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 mb-4 px-2">
                                    <InputLabel htmlFor="name" value="Nome" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        ref={nameInput}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        isFocused
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                               
                                <div className="w-full md:w-1/2 mb-4 px-2">
                                    <InputLabel htmlFor="price" value="Preço" />

                                    <TextInput 
                                        id="price" 
                                        value={data.price ? data.price + "" : ""} 
                                        onChange={(e) => setData('price', moneyToDecimal(e.target.value) + "")} 
                                        mask={money_mask}
                                        className="mt-1 block w-full"
                                        ref={priceInput} 
                                    />

                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="w-full mb-4 px-2">
                                    <InputLabel htmlFor="obs1" value="1° Observação" onClick={(e) => obs1Input.current.focus()} />

                                    <TinyEditor
                                        id="obs1"
                                        ref={obs1Input}
                                        onChange={(e) => setData('obs1', obs1Input.current.getContent())}
                                        value={data.obs1} />

                                    <InputError message={errors.obs1} className="mt-2" />
                                </div>

                                <div className="w-full mb-4 px-2">
                                    <InputLabel htmlFor="obs2" value="2° Observação" onClick={(e) => obs2Input.current.focus()} />

                                    <TinyEditor
                                        id="obs2"
                                        ref={obs2Input}
                                        onChange={(e) => setData('obs2', obs2Input.current.getContent())}
                                        value={data.obs2} />

                                    <InputError message={errors.obs2} className="mt-2" />
                                </div>

                                <div className="w-full mb-4 px-2">
                                    <InputLabel htmlFor="link" value="Link" />

                                    <TextInput
                                        id="link"
                                        type="text"
                                        name="link"
                                        ref={linkInput}
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        className="mt-1 block w-full"
                                        isFocused
                                    />

                                    <InputError message={errors.link} className="mt-2" />
                                </div>

                            </div>

                            <div className="mt-6 flex justify-end">
                                <a href={route(INDEX_URL)}>
                                    <SecondaryButton>Cancelar</SecondaryButton>
                                </a>

                                <PrimaryButton className="ml-3" disabled={processing}>
                                    Salvar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full md:w-2/5 mt-4 md:mt-0 pl-0 md:pl-2">
                    <div className="sticky top-20 w-full bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg h-fit">
                        <div value="specifications" className="w-full p-3 pb-3">
                            <PlanItemDialog onSubmit={data => saveItem(data)}/>
                            {data.items.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="">Título</TableHead>
                                            <TableHead className="">Texto</TableHead>
                                            <TableHead className="w-[70px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.items.map((item, k) => (
                                            <TableRow key={k}>
                                                <TableCell className="dark:text-white">{item.title}</TableCell>
                                                <TableCell className="dark:text-white">{item.text}</TableCell>
                                                <TableCell className="font-medium text-right">
                                                    <div className="flex flex-row gap-2">
                                                        <Button className="px-2 border-none bg-white dark:bg-gray-700" onClick={e => editItem(k)}>
                                                            <FiEdit3 className="h-4 w-4 text-primary" aria-hidden="true" />
                                                        </Button>
                                                        <Button className="px-2 border-none dark:bg-red-900" onClick={e => removeItem(k)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="dark:text-white opacity-40">Nenhum item configurado</p>
                            )}
                            <InputError message={errors.items} className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
